<?php

/**
 * baunfire functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package baunfire
 */

// Ensure this file is being accessed within WordPress
if (!defined('ABSPATH')) {
    exit;
}
define('PRIVATE_DIR',$_SERVER['DOCUMENT_ROOT'].'/wp-content/private');

require_once PRIVATE_DIR.'/vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(PRIVATE_DIR);
$dotenv->load();

Timber\Timber::init();

define('_ENV', $_ENV["ENV"]);

if (!defined('_S_VERSION')) {
    if (_ENV == 'development')
        define('_S_VERSION', uniqid());
    else
        define('_S_VERSION', '1.0.0');
}

if (!function_exists('bf_setup')):
    function bf_setup()
    {
        add_theme_support('align-wide');
        add_theme_support('title-tag');
        add_theme_support('post-thumbnails');
    }
endif;

add_action('after_setup_theme', 'bf_setup');

require_once 'includes/theme/allow-file-types.php';
require_once 'includes/theme/disable-comments.php';

// require_once 'includes/theme/setup-timber.php';
require_once 'includes/theme/setup-shortcodes.php';
require_once 'includes/theme/setup-admin-branding.php';
require_once 'includes/theme/setup-wysiwyg.php';

require_once 'includes/theme/support-helpers.php';
require_once 'includes/theme/support-visual-overrides.php';
















/******************** LOAD CSS/JS ************************/
add_action('wp_enqueue_scripts', 'front_css_styles');
add_action('wp_enqueue_scripts', 'front_js_scripts');

add_action('admin_enqueue_scripts', 'back_css_styles');
add_action('admin_enqueue_scripts', 'back_js_scripts');

add_action('enqueue_block_editor_assets', 'enqueue_block_editor_scripts');


function front_css_styles() 
{
    wp_register_style('jquery-ui-style', get_template_directory_uri() . '/assets/css/external/jquery-ui.css', array(), _S_VERSION);
    wp_enqueue_style('normalize-style', get_template_directory_uri() . '/assets/css/theme/normalize.css', array(), _S_VERSION);
    wp_enqueue_style('admin-bar-style', get_template_directory_uri() . '/assets/css/admin/bar.css', array(), _S_VERSION);
    wp_enqueue_style('theme-style', get_template_directory_uri() . '/assets/css/theme/styles.css', array(), uniqid());
    wp_enqueue_style('animate-style', 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.2.3/animate.min.css', array(), _S_VERSION);    
    wp_register_style('owl-style', 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css', array(), _S_VERSION);    
    wp_register_style('flowbite-style', 'https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css', array(), _S_VERSION);
    wp_register_style('swiper-style', 'https://unpkg.com/swiper/swiper-bundle.min.css', array(), _S_VERSION);
    wp_register_style('splide-style', 'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css', array(), _S_VERSION);
    wp_register_style('jarallax-style', 'https://cdn.jsdelivr.net/npm/jarallax@2/dist/jarallax.min.css', array(), _S_VERSION);
    wp_register_style('glightbox-style', get_template_directory_uri() . '/assets/js/external/glightbox-3.3.0/dist/css/glightbox.min.css', array(), _S_VERSION);
    //wp_register_style('owl-style2', 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/assets/owl.theme.default.min.css', array(), _S_VERSION);
    // wp_register_style('splitting-style', 'https://unpkg.com/splitting/dist/splitting.css', array(), _S_VERSION);
    // wp_register_style('splitting-cells', 'https://unpkg.com/splitting/dist/splitting-cells.css', array(), _S_VERSION);
    //wp_register_style('select2-style', 'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css', array(), _S_VERSION);
}

function front_js_scripts()
{
    wp_enqueue_script("jquery-script", get_template_directory_uri() . '/assets/js/external/jquery.min.js', _S_VERSION, true);
    wp_enqueue_script("vimeo", "https://player.vimeo.com/api/player.js", array('jquery'), _S_VERSION, true);
    wp_enqueue_script("gsap", get_template_directory_uri() . '/assets/js/external/gsap.min.js', array('jquery'), _S_VERSION, true);
    wp_enqueue_script("scroll-trigger", get_template_directory_uri() . '/assets/js/external/ScrollTrigger.min.js', array('jquery'), _S_VERSION, true);
    wp_enqueue_script("gblaze-smoother-script", get_template_directory_uri() . '/assets/js/external/smooth-scroll-gblaze.min.js', array('jquery'), _S_VERSION, false);
    wp_enqueue_script('alpine', 'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js', array(), _S_VERSION, true);
    //wp_enqueue_script("jquery-ui-script", get_template_directory_uri() . '/assets/js/external/jquery-ui.js', _S_VERSION, true);
    //wp_enqueue_script("scroll-reveal", "https://unpkg.com/scrollreveal@4.0.0/dist/scrollreveal.min.js", array('jquery'), _S_VERSION, true);    
    //wp_enqueue_script("scrollbar", "https://cdnjs.cloudflare.com/ajax/libs/smooth-scrollbar/8.5.2/smooth-scrollbar.js", array('jquery'), _S_VERSION, true);    
    //wp_enqueue_script('SplitText', get_template_directory_uri() . '/assets/js/external/SplitText.min.js', array(), _S_VERSION, true);

    wp_register_script("owl", get_template_directory_uri() . '/assets/js/external/owl.min.js', array('jquery'), _S_VERSION, true);    
    wp_register_script("jarallax", "https://cdn.jsdelivr.net/npm/jarallax@2/dist/jarallax.min.js", array('jquery'), _S_VERSION, true);
    wp_register_script("jarallax-video", "https://cdn.jsdelivr.net/npm/jarallax@2/dist/jarallax-video.min.js", array('jquery'), _S_VERSION, true);
    wp_register_script("swiper", get_template_directory_uri() . '/assets/js/external/swiper-bundle.min.js', array('jquery'), _S_VERSION, true);
    wp_register_script("flowbite", "https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js", array('jquery'), _S_VERSION, true);
    wp_register_script("split-type", get_template_directory_uri() . '/assets/js/external/SplitType.min.js', array(), _S_VERSION, true);
    wp_register_script('splitting', 'https://unpkg.com/splitting/dist/splitting.min.js', array(), _S_VERSION, true);
    wp_register_script('glightbox', get_template_directory_uri() . '/assets/js/external/glightbox-3.3.0/dist/js/glightbox.min.js', array(), _S_VERSION, true);
    //wp_register_script('locomotive', 'https://cdn.jsdelivr.net/npm/locomotive-scroll@3.5.4/dist/locomotive-scroll.min.js', array(), _S_VERSION, true);
    //wp_register_script("owl2", get_template_directory_uri() . '/assets/js/external/owl-custom.js', array('jquery'), _S_VERSION, true);    
    //wp_register_script("splide", "https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js", array('jquery'), _S_VERSION, false);
    //wp_register_script("chart", "https://cdn.jsdelivr.net/npm/chart.js", array(), _S_VERSION, true);
    //wp_register_script('alpine', 'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js', array(), _S_VERSION, true);
    //wp_register_script('select2', 'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js',  array(), _S_VERSION, true);



    // wp_register_script("jquery-ui", get_template_directory_uri() . '/assets/js/external/jquery-ui.js', array(), _S_VERSION, array('strategy'  => 'defer', 'in_footer' => true));

    // $js_dirs = __DIR__ . '/assets/js/custom/';
    // foreach (scandir($js_dirs) as $k => $js) {
    //     if ($js === '.' || $js === '..') {
    //         continue;
    //     }
    //     $file = get_template_directory_uri() . '/assets/js/custom/' . $js;
        
    //     wp_enqueue_script("custom-js-" . $k, $file, ['jquery'], rand(), array('strategy'  => 'defer', 'in_footer' => true));
    //     // wp_localize_script("custom-js-" . $k, 'frontendajax', array('ajaxurl' => admin_url('admin-ajax.php'), 'nonce' => wp_create_nonce('acf_block_nonce')));
    // }

    wp_enqueue_script("custom-min-js", get_template_directory_uri() . '/assets/js/custom.min.js', ['gsap', 'gblaze-smoother-script', 'jquery'], rand(), array('strategy'  => 'defer', 'in_footer' => true));
    wp_localize_script("custom-min-js", 'frontendajax', array('ajaxurl' => admin_url('admin-ajax.php'), 'nonce' => wp_create_nonce('acf_block_nonce')));
}

function back_css_styles($hook)
{
    wp_enqueue_style('bf-custom-admin-style', get_template_directory_uri() . '/assets/css/admin/styles.css', array(), _S_VERSION);
}

function back_js_scripts($hook)
{
    if ($hook === 'post.php' || $hook === 'post-new.php') {
    }
}

function enqueue_block_editor_scripts()
{
    wp_enqueue_script('bf-block-preview-script', get_template_directory_uri() . '/assets/js/admin/block-preview.js', array('jquery'), _S_VERSION, true);
    wp_localize_script("bf-block-preview-script", 'theme_path', array('url' => get_template_directory_uri()));
}















/******************** ACF ************************/
add_action('acf/init', 'my_acf_op_init');

function my_acf_op_init()
{
    if (function_exists('acf_add_options_page')) {
        acf_add_options_page(array(
            'menu_title'    => 'Global Config',
            'menu_slug'     => 'theme-general-settings',
            'capability'    => 'manage_options',
            'redirect'      => true,
            'icon_url'      => menu_icon(),
        ));

        acf_add_options_sub_page(array(
            'page_title'    => 'Theme Settings',
            'menu_title'    => 'Theme Settings',
            'parent_slug'   => 'theme-general-settings',
            'capability'    => 'manage_options',
        ));

        acf_add_options_sub_page(array(
            'page_title'    => 'Header Navigation',
            'menu_title'    => 'Header Navigation',
            'parent_slug'   => 'theme-general-settings',
            'capability'    => 'manage_options',
        ));

        acf_add_options_sub_page(array(
            'page_title'    => 'Footer Navigation',
            'menu_title'    => 'Footer Navigation',
            'parent_slug'   => 'theme-general-settings',
            'capability'    => 'manage_options',
        ));

        acf_add_options_sub_page(array(
            'page_title'    => '404',
            'menu_title'    => '404',
            'parent_slug'   => 'theme-general-settings',
            'capability'    => 'manage_options',
        ));
    }
}

add_action('init', 'register_custom_blocks');

function register_custom_blocks()
{
    if (!function_exists('acf_register_block_type')) {
        return;
    }

    $theme_slug = get_field("theme_slug", "option");
    $theme_slug = $theme_slug ? $theme_slug : "baunfire";

    $blocks_dir = __DIR__ . '/blocks';

    if (!is_dir($blocks_dir) || !is_readable($blocks_dir)) {
        return;
    }

    foreach (scandir($blocks_dir) as $dir) {
        $block_path = $blocks_dir . '/' . $dir;

        if ($dir === '.' || $dir === '..' || !is_dir($block_path)) {
            continue;
        }

        $block_json = $block_path . '/block.json';
        if (!file_exists($block_json)) {
            continue;
        }

        register_block_type($block_path, [
            'category' => $theme_slug,
            'icon'     => block_icon(true),
            'supports' => [
                'anchor' => true,
            ],
        ]);
    }
}

add_filter('block_categories_all', 'custom_block_category', 10, 2);

function custom_block_category($categories, $post)
{
    $theme_slug = get_field("theme_slug", "option");
    $theme_slug = $theme_slug ? $theme_slug : "baunfire";

    $custom_category = array(
        array(
            'slug' => $theme_slug,
            'title' => __(ucfirst(strtolower($theme_slug)) . ' Blocks', 'baunfire')
        ),
    );

    return array_merge($custom_category, $categories);
}

add_filter('block_categories_all', 'custom_block_category', 10, 2);


















add_filter('facetwp_facet_dropdown_show_counts', '__return_false');
  

// Hook into Gravity Forms after submission
add_action( 'gform_after_submission', 'mark_form_as_submitted', 10, 2 );
function mark_form_as_submitted( $entry, $form ) {
    // Start the session if not already started
    if ( session_status() === PHP_SESSION_NONE ) {
        session_start();
    }
    // Set a session variable to mark the form as submitted
    $_SESSION[ 'form_submitted_' . $form['id'] ] = true;
}

// Hook into Gravity Forms to check for submission status before displaying the form
add_filter( '<<!nav>>gform_get_form<<!/nav>>', 'check_submission_status', 10, 3 );
function check_submission_status( $form_string, $form_object, $url ) {
    // Start the session if not already started
    if ( session_status() === PHP_SESSION_NONE ) {
        session_start();
    }

    // Get the form ID
    $form_id = $form_object['id'];

    // Check if the form was already submitted for this session
    if ( isset( $_SESSION[ 'form_submitted_' . $form_id ] ) && $_SESSION[ 'form_submitted_' . $form_id ] ) {
        // If submitted, return a confirmation message instead of the form
        return '<p>Thank you, your form has already been submitted.</p>';
    }

    // If not submitted, return the form HTML
    return $form_string;
}

function get_acf_block_field_value_by_post_id($post_id, $block_name, $field_name) {
    $post = get_post($post_id);    
    if (!$post) {
        return null; // Post not found
    }

    $blocks = parse_blocks($post->post_content);

    foreach ($blocks as $block) {
        if ($block['blockName'] === $block_name) {
            if (isset($block['attrs']['data'][$field_name])) {
                return $block['attrs']['data'][$field_name];
            }
        }
    }

    return null; // Block or field not found
}


add_filter('timber/context', 'global_timber_context');

function global_timber_context($context) {
    $context['options'] = get_fields('option'); // 'option' is the default post_id for the main options page
    return $context;
}

