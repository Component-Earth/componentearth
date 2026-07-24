<?php
use Timber\Timber;
if (isset($is_preview) && $is_preview && !empty($block['data'])) {
  $image = get_template_directory_uri() . '/blocks'; ?>
  <div class="" style="padding: 16px; border: #ccd0d4 solid 1px;">
    <div class="" style="margin-bottom: 16px;">
      <p style="margin-top:0px;"><?php echo $block['title']; ?></p>
    </div>
    <div class="" style="display:inline-block; border: #ccd0d4 solid 1px; padding: 16px;">
      <img alt="preview" style="width:100%; height:auto; max-width:320px;" src="<?php echo $image ?>/tabbed-content/preview.png">
    </div>
    
  </div>
  <?php
  return;
}
if(isset($block)) {

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
}