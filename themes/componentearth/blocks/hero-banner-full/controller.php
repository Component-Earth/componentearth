<?php
use Timber\Timber;

if ($is_preview && !empty($block['data'])) {
  $image = get_template_directory_uri() . '/blocks';
  echo '<img alt="preview" style="width:100%; height:auto;" src="' . $image .  '/hero-banner-full/preview.png">';
  return;
}

acf_setup_meta($block["data"], $block["id"], true);


$context_menu = Timber::context([
  'global_nav_theme' => get_field('global_nav_theme'),
  'hide_navigation' => get_field('hide_navigation'),
  'site_logo'        => get_field('site_logo', 'option'),
  'footer_logo'      => get_field('footer_logo', 'option'),
  'header_nav_item'  => get_field('header_nav_item', 'option'),
  'login_url'        => get_field('login_url', 'option'),
]);

$context = Timber::context([
  "block" => $block,
  "fields" => get_field("block"),
  "context_menu" => $context_menu
]);

$context["block"]["slug"] = sanitize_title($block["title"]);

acf_reset_meta($block["id"]);

Timber::render("./template.twig", $context);