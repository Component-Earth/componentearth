<?php
use Timber\Timber;

if ($is_preview && !empty($block['data'])) {
  $image = get_template_directory_uri() . '/blocks';
  echo '<img alt="preview" style="width:100%; height:auto;" src="' . $image .  '/filter-block/preview.png">';
  return;
}

acf_setup_meta($block["data"], $block["id"], true);

$categories = get_terms(
  array(
    'taxonomy' => 'resource-type',
    'orderby' => 'name'
  ) 
);
$paged = ( get_query_var('paged') ) ? get_query_var('paged') : 1;
$custom_args = [
  'post_type'=> 'resources', 
  'posts_per_page'=> 12,  
  'orderby' => 'date', 
  'order'   => 'DESC',
  'paged' => $paged
];

$custom_query = new WP_Query( $custom_args );

$context = Timber::context([
  "block" => $block,
  "fields" => get_field("block"),
  "categories" => $categories,
  "custom_query" => $custom_query
]);

$context["block"]["slug"] = sanitize_title($block["title"]);

acf_reset_meta($block["id"]);

Timber::render("./template.twig", $context); ?>


<script>
var posts_myajax = '<?php echo json_encode( $custom_query->query_vars ) ?>',
current_page_myajax = '<?php echo get_query_var( 'paged' ) ? get_query_var( 'paged' ) : 1 ?>',
max_page_myajax = <?php echo $custom_query->max_num_pages ?>
</script>