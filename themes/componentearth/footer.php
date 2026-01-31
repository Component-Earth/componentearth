<?php

/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package baunfire
 */

use Timber\Timber;

$context = Timber::context([
    "footer_social_label" => get_field("footer_social_label", "option"),
    "footer_social" => get_field("footer_social", "option"),
    "primary_footer_nav_columns" => get_field("primary_footer_nav_columns", "option"),
    "secondary_footer_nav_item" => get_field("secondary_footer_nav_item", "option"),
    "footer_credits" => get_field("footer_credits", "option"),
    "footer_form_label" => get_field("footer_form_label", "option"),
    "footer_form_shorcode" => get_field("footer_form_shorcode", "option"),
    "footer_logo" => get_field("footer_logo", "option"),
    "footer_information" => get_field("footer_information", "option"),
]);
?>

<?php Timber::render("./partials/nav-footer.twig", $context); ?>

<?php wp_footer(); ?>

</body>

</html>