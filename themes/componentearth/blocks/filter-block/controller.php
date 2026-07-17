<?php
use Timber\Timber;
if (isset($is_preview) && $is_preview && !empty($block['data'])) {
  $image = get_template_directory_uri() . '/blocks'; ?>
  <div class="" style="padding: 16px; border: #ccd0d4 solid 1px;">
    <div class="" style="margin-bottom: 16px;">
      <p style="margin-top:0px;"><?php echo $block['title']; ?></p>
    </div>
    <div class="" style="display:inline-block; border: #ccd0d4 solid 1px; padding: 16px;">
      <img alt="preview" style="width:100%; height:auto; max-width:320px;" src="<?php echo $image ?>/filter-block/preview.png">
    </div>
    
  </div>
  <?php
  return;
}
if(isset($block)) {

  acf_setup_meta($block["data"], $block["id"], true);
  $post_type = get_field('post_type');

  $paged = ( get_query_var('paged') ) ? get_query_var('paged') : 1;
  $custom_args = [
    'post_type'=> $post_type, 
    'posts_per_page'=> 12,  
    'post_status' => 'publish',
    'orderby' => 'date', 
    'order'   => 'DESC',
    'paged' => $paged
  ];

  $custom_query = new WP_Query( $custom_args );

  $show_filters = false;

  $context = Timber::context([
    "block" => $block,
    "fields" => get_field("block"),  
    "custom_query" => $custom_query,
    "show_filters" => $show_filters
  ]);

  $context["block"]["slug"] = sanitize_title($block["title"]);

  acf_reset_meta($block["id"]);

  Timber::render("./template.twig", $context); 
} ?>

<script>
var posts_myajax = '<?php echo json_encode( $custom_query->query_vars ) ?>',
current_page_myajax = '<?php echo get_query_var( 'paged' ) ? get_query_var( 'paged' ) : 1 ?>',
max_page_myajax = <?php echo $custom_query->max_num_pages ?>
</script>