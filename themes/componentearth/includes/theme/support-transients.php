<?php
define('TRANSIENT_PREFIX', 'seekr');
define('TRANSIENT_DURATION', 7 * DAY_IN_SECONDS);

function clear_transients(array $transient_names = []) {
    global $wpdb;

    if (empty($transient_names)) {
        if (wp_using_ext_object_cache()) {
            wp_cache_flush();
        }
        
        $like = $wpdb->esc_like('_transient_' . TRANSIENT_PREFIX . '_') . '%';
        $sql = "
            DELETE FROM {$wpdb->options}
            WHERE option_name LIKE %s
            OR option_name LIKE %s
        ";

        return $wpdb->query(
            $wpdb->prepare(
                $sql,
                $like,
                str_replace('_transient_', '_transient_timeout_', $like)
            )
        );
    }

    foreach ($transient_names as $name) {
        delete_transient($name);
    }
}

function clear_transients_by_content_type_slug(array $content_type_slugs) {
    global $wpdb;

    if (empty($content_type_slugs)) {
        return;
    }

    $prefix = TRANSIENT_PREFIX;
    
    $like = $wpdb->esc_like('_transient_' . $prefix . '_') . '%';
    $transients = $wpdb->get_col(
        $wpdb->prepare("
            SELECT option_name 
            FROM {$wpdb->options}
            WHERE option_name LIKE %s
        ", $like)
    );

    $likely_keys = [];
    foreach ($content_type_slugs as $slug) {
        $likely_keys[] = $prefix . '_' . $slug . '_posts';
    }

    $transients_to_clear = [];

    foreach ($transients as $transient_name) {
        $key = str_replace('_transient_', '', $transient_name);
        
        foreach ($content_type_slugs as $slug) {
            if (strpos($key, $slug) !== false) {
                $transients_to_clear[] = $key;
                break;
            }
        }
    }

    foreach ($likely_keys as $key) {
        if (!in_array($key, $transients_to_clear)) {
            $transients_to_clear[] = $key;
        }
    }

    if (!empty($transients_to_clear)) {
        foreach ($transients_to_clear as $key) {
            delete_transient($key);
        }
    }
}

function get_all_prefix_transients() {
    global $wpdb;
    $prefix = TRANSIENT_PREFIX;
    $transients = [];
    
    $like = $wpdb->esc_like('_transient_' . $prefix . '_') . '%';
    $db_transients = $wpdb->get_results(
        $wpdb->prepare("
            SELECT option_name, option_value 
            FROM {$wpdb->options}
            WHERE option_name LIKE %s
        ", $like)
    );
    
    foreach ($db_transients as $transient) {
        $key = str_replace('_transient_', '', $transient->option_name);
        $transients[$key] = [
            'key' => $key,
            'value' => maybe_unserialize($transient->option_value),
            'source' => 'database'
        ];
    }
    
    if (wp_using_ext_object_cache()) {
        $content_types = get_terms(['taxonomy' => 'content-type', 'hide_empty' => false]);
        
        foreach ($content_types as $content_type) {
            $key = $prefix . '_' . $content_type->slug . '_posts';
            $value = get_transient($key);
            
            if ($value !== false && !isset($transients[$key])) {
                $transients[$key] = [
                    'key' => $key,
                    'value' => $value,
                    'source' => 'object_cache'
                ];
            }
        }
    }
    
    return $transients;
}

add_action('admin_menu', function () {
    add_menu_page(
        'Transients',
        'Transients',
        'manage_options',
        'clear-' . TRANSIENT_PREFIX . '-transients',
        'clear_transients_callback',
        menu_icon(),
        90
    );
});

function clear_transients_callback() {
    global $wpdb;
    $prefix = TRANSIENT_PREFIX;

    if (isset($_POST['clear_transients']) && check_admin_referer('clear_transients_action')) {
        $deleted = clear_transients();
        echo '<div class="notice notice-success is-dismissible"><p>' . ucfirst($prefix) . ' transients cleared!</p></div>';
    }

    $using_object_cache = wp_using_ext_object_cache();
    
    echo '<div class="wrap">';
    echo '<h1>' . ucfirst($prefix) . ' Transients</h1>';
    
    if ($using_object_cache) {
        echo '<div class="notice notice-info"><p>';
        echo '<strong>Object Cache Active:</strong> This server is using Redis/Memcached. Transients are primarily stored in memory cache, not the database.';
        echo '</p></div>';
    }

    echo '<form method="post">';
    wp_nonce_field('clear_transients_action');
    echo '<p><input type="submit" name="clear_transients" class="button button-primary" value="Clear All Transients"></p>';
    echo '</form>';

    $all_transients = get_all_prefix_transients();

    if (!empty($all_transients)) {
        echo '<h2>Found Transients</h2>';
        echo '<table class="widefat striped">';
        echo '<thead><tr><th>Transient Name</th><th>Source</th><th>Value (Truncated)</th></tr></thead>';
        echo '<tbody>';
        
        foreach ($all_transients as $transient) {
            $value = $transient['value'];
            
            if (is_scalar($value)) {
                $truncated = wp_trim_words((string)$value, 20);
            } elseif (is_array($value) || is_object($value)) {
                $count = is_array($value) ? count($value) : count((array)$value);
                $truncated = 'Array/Object (' . $count . ' items)';
            } else {
                $truncated = '<pre style="max-height: 40px;overflow: hidden;">' . esc_html(print_r($value, true)) . '</pre>';
            }
            
            $source_badge = $transient['source'] === 'object_cache' 
                ? '<span style="background: #00a0d2; color: white; padding: 2px 6px; border-radius: 3px; font-size: 11px;">REDIS</span>' 
                : '<span style="background: #82878c; color: white; padding: 2px 6px; border-radius: 3px; font-size: 11px;">DB</span>';
            
            echo '<tr>';
            echo '<td><code>' . esc_html($transient['key']) . '</code></td>';
            echo '<td>' . $source_badge . '</td>';
            echo '<td>' . $truncated . '</td>';
            echo '</tr>';
        }
        echo '</tbody></table>';
    } else {
        echo '<div class="notice notice-warning"><p>No transients found.</p></div>';
    }

    echo '</div>';
}

add_action('save_post', function ($post_id, $post, $update) {
    if (wp_is_post_autosave($post_id) || wp_is_post_revision($post_id)) {
        return;
    }

    if ($post->post_type !== 'resource') {
        return;
    }

    $content_types = get_the_terms($post_id, 'content-type');
    
    if (empty($content_types) || is_wp_error($content_types)) {
        return;
    }

    $content_type_slugs = array_map(function($term) {
        return $term->slug;
    }, $content_types);

    if (!in_array('news', $content_type_slugs)) {
        delete_transient(TRANSIENT_PREFIX . '_all_posts');
    }

    clear_transients_by_content_type_slug($content_type_slugs);
}, 10, 3);