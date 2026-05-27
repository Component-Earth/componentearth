<?php
use Timber\Timber;

if ($is_preview && !empty($block['data'])) {
  $image = get_template_directory_uri() . '/blocks';
  echo '<img alt="preview" style="width:100%; height:auto;" src="' . $image .  '/tabbed-content/preview.png">';
  return;
}

acf_setup_meta($block["data"], $block["id"], true);
$fields = get_field("block");

//global $post;
$tabs = $fields['tabs'];


$context = Timber::context([
  "block" => $block,
  "fields" => $fields,
  "tabs" => $tabs
]);

$context["block"]["slug"] = sanitize_title($block["title"]);

acf_reset_meta($block["id"]);

Timber::render("./template.twig", $context);