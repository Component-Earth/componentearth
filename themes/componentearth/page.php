<?php

/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package baunfire
 */

get_header();
?>

<main class="relative bg-cover bg-[#DBD5C6]" style="background-image: url(<?= get_template_directory_uri(); ?>/assets/img/png/bg-pattern.png); background-position: 100% 960px;">
    
    <?php the_content(); ?>
</main>

<?php get_footer(); ?>
