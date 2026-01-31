<?php

/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package baunfire
 */
?>

<?php get_header();

use Timber\Timber;

$context = Timber::context([
    "ib_heading" => get_field("404_heading", "option"),
    "ib_content" => get_field("404_content", "option"),
    "ib_cta" => get_field("404_cta", "option"),
]);
?>

<main class="overflow-hidden">  
    <?php Timber::render("./partials/404.twig", $context); ?>    
</main>

<?php get_footer(); ?>