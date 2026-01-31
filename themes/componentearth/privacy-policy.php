<?php
/**
 * Template Name: Legal
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package baunfire
 */

use Timber\Timber;
$context = Timber::context();

get_header();
?>

<main>
    <?php Timber::render('./partials/privacy-policy.twig', $context); ?>
</main>
<?php get_footer(); ?>
