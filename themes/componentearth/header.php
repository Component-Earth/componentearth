<?php
/**
 * The header for our theme
 *
 * Displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package baunfire
 */

use Timber\Timber;

global $post;
$postID = get_the_ID();

// Grab theme setting colors
$theme_color = get_field('theme_color', 'option');
$theme_color_dark = get_field('theme_color_dark', 'option');
$theme_color_secondary = get_field('theme_color_secondary', 'option');
$theme_color_tertiary = get_field('theme_color_tertiary', 'option');
$theme_color_highlight = get_field('theme_color_highlight', 'option');
$font_color_dark = get_field('font_color_dark', 'option');
$font_color_light = get_field('font_color_light', 'option');

$context = Timber::context([
    'global_nav_theme' => get_field('global_nav_theme'),
    'hide_navigation' => get_field('hide_navigation'),
    'site_logo'        => get_field('site_logo', 'option'),
    'footer_logo'      => get_field('footer_logo', 'option'),
    'header_nav_item'  => get_field('header_nav_item', 'option'),
    'login_url'        => get_field('login_url', 'option'),
]);
?>

<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

    <!-- Browser UI Theme Color -->
    <meta name="theme-color" content="<?= esc_attr($theme_color); ?>">

    <link rel="icon" type="image/png" href="<?= favicon(); ?>">

    <!-- CSS Variables from ACF Theme Settings -->
    <style>
        :root {
            --theme-color: <?= esc_html($theme_color); ?>;
            --theme-color-dark: <?= esc_html($theme_color_dark); ?>;
            --theme-color-secondary: <?= esc_html($theme_color_secondary); ?>;
            --theme-color-tertiary: <?= esc_html($theme_color_tertiary); ?>;
            --theme-color-highlight: <?= esc_html($theme_color_highlight); ?>;
            --font-color-dark: <?= esc_html($font_color_dark); ?>;
            --font-color-light: <?= esc_html($font_color_light); ?>;
        }
    </style>

    <script type="text/javascript">
        const templateURL = '<?= get_template_directory_uri(); ?>';
        history.scrollRestoration = 'manual';
    </script>

    <!-- Open Graph Meta -->
    <meta property="og:title" content="<?= esc_attr(get_the_title($postID)); ?>">
    <meta property="og:image" content="<?= esc_url(get_the_post_thumbnail_url($postID)); ?>">
    <meta property="og:description" content="<?= esc_attr(get_the_excerpt($postID)); ?>">
    <meta property="og:url" content="<?= esc_url(get_the_permalink($postID)); ?>">

    <?php wp_head(); ?>

    <!-- <script>
        SmoothScroll({
            keyboardSupport: true,
            animationTime: 800,
            stepSize: 25,
            arrowScroll: 50,
            touchpadSupport: true,
        });
    </script> -->
</head>

<body <?php body_class('is-loading'); ?>>
    <div <?php if(is_front_page()) : ?> id="top-nav" <?php endif ?>>
    <?php Timber::render('./partials/nav-header.twig', $context); ?>
    </div>
    <!-- <div id="smooth-wrapper">
        <div id="smooth-content"> -->
