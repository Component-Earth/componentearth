<?php
// Allow templates selected in the Template Dropdown
add_filter('template_include', function ($template) {
    if (is_page_template()) {
        return $template;
    }

    // Dynamically load templates based on slug
    if (is_page()) {
        $slug = get_post_field('post_name', get_post());
        $custom_template = get_stylesheet_directory() . '/templates/page-' . $slug . '.php';

        if (file_exists($custom_template)) {
            return $custom_template;
        }
    }

    // Fallback to the default template
    return $template;
});

// Hide category
add_filter('rest_prepare_taxonomy', function ($response, $taxonomy) {
    if ('category' === $taxonomy->name) {
        $response->data['visibility']['show_ui'] = false;
    }

    return $response;
}, 10, 2);

// Hide taxonomy sidebar in block editor
add_filter('rest_prepare_taxonomy', function ($response, $taxonomy, $request) {
    $context = !empty($request['context']) ? $request['context'] : 'view';

    $target_taxonomies = ['solution-type'];

    if ($context === 'edit' && in_array($taxonomy->name, $target_taxonomies, true)) {
        $data_response = $response->get_data();
        $data_response['visibility']['show_ui'] = false;
        $response->set_data($data_response);
    }

    return $response;
}, 10, 3);

// Reorder post object results based of the recent>oldest
add_filter('acf/fields/post_object/query', function ($args, $field, $post_id) {
    if ($field['name'] === 'item_picker' or $field['name'] == 'featured_post') {
        $args['orderby'] = 'date';
        $args['order'] = 'DESC';
    }

    return $args;
}, 10, 3);

// Added support of searching post title on post object acf field type
add_filter('posts_where', function ($where, $wp_query) {
    global $pagenow, $wpdb;

    $is_acf = isset($wp_query->query['is_acf_query']) ? $wp_query->query['is_acf_query'] : false;
    if (is_search() || $is_acf) {
        $where = preg_replace(
            "/\(\s*" . $wpdb->posts . ".post_title\s+LIKE\s*(\'[^\']+\')\s*\)/",
            "(" . $wpdb->posts . ".post_title LIKE $1) OR (" . $wpdb->posts . ".ID LIKE $1)",
            $where
        );
    }
    return $where;
}, 10, 2);