<?php
// Customize favicon login logo
function custom_admin_favicon()
{
    echo '<link id="favicon" rel="icon" type="image/png" href="' . esc_url(favicon()) . '">';
}

add_action('admin_head', 'custom_admin_favicon', 10, 2);
add_action('wp_head', 'custom_admin_favicon', 10, 2);
add_action('login_head', 'custom_admin_favicon', 10, 2);

// Customize custom post type icon
add_action('registered_post_type', function ($post_type, $args) {
    if (!in_array($post_type, array(
        'blog',
        'resources',
        'media-kit',
        'news-article',
        'press-release',
        'research'
    ))) return;

    // Set menu icon
    $args->menu_icon = menu_icon();

    global $wp_post_types;
    $wp_post_types[$post_type] = $args;
}, 10, 2);

// Customize wp-admin login logo
add_action('login_enqueue_scripts', function () {
    $login_logo = get_field("login_logo", "option");
    if (!$login_logo)
        return;

?>
    <style type="text/css">
        body.login #login h1 a {
            display: none;
        }

        body.login #login {
            padding-top: 0;
        }

        body.login #login .notice {
            margin-top: 16px;
        }
    </style>

    <div class="client-branding" style="text-align: center; padding-top: 5%;">
        <img style="width: 100%; max-width: 320px; height: auto;" src="<?= $login_logo ?>" alt="Custom Logo">
    </div>
<?php
});

// Reposition the acf fields to the top of editor
add_action('enqueue_block_editor_assets', function () {
    $block_icon = esc_url(block_icon());

    wp_add_inline_script('wp-edit-post', "
        jQuery(document).ready(function($) {
            setTimeout(() => {
                if ($('.block-editor').length) {
                    const mb = $('.edit-post-layout__metaboxes');
                    const pse = $('.edit-post-visual-editor');

                    if (mb.length && pse.length) {
                        mb.insertBefore(pse);
                        $('.postbox').addClass('closed');
                    }

                    mb.find('.acf-postbox .postbox-header h2').prepend(`<img src='{$block_icon}'/>`);
                }
            }, 1000);
        });
    ");
});