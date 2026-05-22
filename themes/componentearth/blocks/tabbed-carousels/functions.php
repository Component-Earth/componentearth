<?php

add_action( 'wp_enqueue_scripts', function() {
	wp_register_script( 'ajax-load-service', get_template_directory_uri() . '/blocks/tabbed-carousels/filter.js', ['jquery'], time(), true );
	wp_localize_script( 
        'ajax-load-service',
        'ajax_load_service_params',
		array(
            
            'ajax_url' => add_query_arg( 
                array( 
                    'action' => 'handle_ajax_load_service' 
                ),
                admin_url( 'admin-ajax.php' )
            ),    
            'nonce' => wp_create_nonce('acf_block_nonce')
		)
    );
	wp_enqueue_script( 'ajax-load-service' );
	
} );

add_action( 'wp_ajax_handle_ajax_load_service', 'handle_ajax_load_service' );
add_action( 'wp_ajax_nopriv_handle_ajax_load_service', 'handle_ajax_load_service' );

function handle_ajax_load_service() {

	$args = $_POST['id'];    
    $query_args = array(
        'post_type' => 'service', 
        'post_status' => 'publish',
        'post__in' => [$args]
    );

    $custom_query = new WP_Query( $query_args );
    
	
	// below is almost unchanged part from Twenty Twenty theme index.php file
	$i = 0;

	if ( $custom_query->have_posts() ) :
        ob_start(); // Start output buffering ?>
        <div class="wrapper">
            <?php while ( $custom_query->have_posts() ) : $custom_query->the_post(); 

                $custom_block = get_field('block', get_the_ID());
                $custom_excerpt = $custom_block['excerpt'];

                $excerpt = $custom_excerpt ? $custom_excerpt : get_the_excerpt();
                $excerpt = substr($excerpt, 0, 260);
                $result = substr($excerpt, 0, strrpos($excerpt, ' '));

                $terms = wp_get_post_terms( get_the_ID(), 'resource-type');
                $industries = wp_get_post_terms( get_the_ID(), 'resource-industry');
                $post_date = get_the_date( 'M j, Y' );
                $post_thumb_id = get_post_thumbnail_id(get_the_ID());
                $custom_image = wp_get_attachment_image_src($post_thumb_id, 'full');
                $image = $custom_image ? $custom_image[0] : "";  
                ?>
                <div class="bg-[#F4EDE9] p-[1.75rem] gap-[1.75rem] flex flex-col relative group w-full">
                   <?php echo get_the_title(); ?>
                </div>
            <?php endwhile;
            wp_reset_postdata(); // Restore original post data ?>
        </div>
        <?php $posts_html = ob_get_clean(); // Get the buffered posts HTML 
        
        echo json_encode( array( // Send both back as a JSON object
            'post'      => $posts_html
        ) ); ?>
    <?php else : ?>
        <?php 
        echo json_encode( array(
            'post'      => '<div class="text-[1rem]">No content found.</div>',
        ) ); ?>
    <?php endif;

	die;

}