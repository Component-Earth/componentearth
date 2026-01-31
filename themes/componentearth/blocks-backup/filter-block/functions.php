<?php
add_action('wp_enqueue_scripts', function() {    
    wp_register_script('tw-elements', 'https://cdn.jsdelivr.net/npm/@tailwindplus/elements@1', array(), _S_VERSION, true);
});


add_action( 'wp_enqueue_scripts', function() {
	wp_register_script( 'ahr_filter', get_template_directory_uri() . '/blocks/filter-block/filter.js', ['jquery'], time(), true );
	wp_localize_script( 
		'ahr_filter',
		'ahr_args',
		array(
			'ajaxurl' => add_query_arg( 
				array( 
					'action' => 'ajaxfilter' 
				),
				admin_url( 'admin-ajax.php' )
			),
            'nonce' => wp_create_nonce('acf_block_nonce')
		)
    );
	wp_enqueue_script( 'ahr_filter' );
	
	//Load more
    $query_args = array(
        'post_type' => 'resources', 
        'posts_per_page' => 3, 
        'orderby' => 'date', 
        'order'   => 'DESC',   
    );

    $custom_query = new WP_Query( $query_args );

	wp_register_script( 'ahr_loadmore', get_template_directory_uri() . '/blocks/filter-block/loadmore.js', ['jquery'], time(), true );
	wp_localize_script( 
		'ahr_loadmore',
		'ahr_loadmore_params',
		array(
			'ajaxurl' => add_query_arg( 
				array( 
					'action' => 'loadmore' 
				),
				admin_url( 'admin-ajax.php' )
			),
            'posts' => json_encode( $custom_query ),
            'cur_page' => get_query_var( 'paged' ) ? get_query_var( 'paged' ) : 1,
            'max_page' => $custom_query->max_num_pages,
            'nonce' => wp_create_nonce('acf_block_nonce')
		)
    );
	wp_enqueue_script( 'ahr_loadmore' );
	
} );

add_action( 'wp_ajax_ajaxfilter', 'ajax_filter_by_category' );
add_action( 'wp_ajax_nopriv_ajaxfilter', 'ajax_filter_by_category' );

function ajax_filter_by_category() {

	$args = json_decode( file_get_contents( "php://input" ), true );

    if($args['cat'] != 0) :
        $tax_query = [
            [
                'taxonomy' => 'resource-type',
                'field'    => 'term_id',
                'terms'    => $args['cat'],
            ]
        ];
    else :
        $tax_query = [];
    endif;

    $query_args = array(
        'post_type' => 'resources', 
        'posts_per_page' => 12, 
        'orderby' => 'date', 
        'order'   => 'DESC',   
        'tax_query' => $tax_query        
    );

    $custom_query = new WP_Query( $query_args );
	
	// below is almost unchanged part from Twenty Twenty theme index.php file
	$i = 0;

	if ( $custom_query->have_posts() ) : ?>
        <div class="grid xl:grid-cols-3 md:grid-cols-2 gap-[1.75rem]">
            <?php while ( $custom_query->have_posts() ) : $custom_query->the_post(); 

                $custom_block = get_field('block', get_the_ID());
                $custom_excerpt = $custom_block['excerpt'];

                $excerpt = $custom_excerpt ? $custom_excerpt : get_the_excerpt();
                $excerpt = substr($excerpt, 0, 260);
                $result = substr($excerpt, 0, strrpos($excerpt, ' '));

                $terms = wp_get_post_terms( get_the_ID(), 'resource-type');
                $post_date = get_the_date( 'M j, Y' );
                $post_thumb_id = get_post_thumbnail_id(get_the_ID());
                $custom_image = wp_get_attachment_image_src($post_thumb_id, 'full');
                $image = $custom_image ? $custom_image[0] : "";  
                ?>
                <div class="bg-[#F4EDE9] p-[1.75rem] gap-[1.75rem] flex flex-col relative group w-full">
                    <a href="<?php the_permalink() ?>" class="absolute top-0 left-0 w-full h-full z-10"></a>
                    <?php if($image) : ?>
                        <div class="h-[14.75rem]">
                            <img src="<?php echo $image; ?>" class="object-cover w-full h-full group-hover:scale-105 group-hover:transition-all group-hover:duration-300 group-hover:ease-in-out" />
                        </div>
                    <?php endif; ?>
                    <div class="flex flex-col justify-between gap-[1.75rem] <?php if($image) : ?> h-auto <?php else : ?> h-full <?php endif; ?>">
                        <div class="flex flex-col gap-[1.75rem]">
                            <div class="flex gap-[1rem] items-center justify-between">
                                <div class="flex ~gap-[0.5rem]/[1rem] flex-wrap items-center justify-start">
                                    <?php 
                                        foreach ( $terms as $term ) {
                                            $term_link = get_term_link( $term );
                                            echo '<div class="bg-[#E09762] text-black px-[0.75rem] py-[0.25rem] font-mono text-[0.75rem] rounded-[1.5rem] text-center lowercase">' . $term->name . '</div>' . ' ';
                                        } 
                                    ?>
                                </div>
                                <div class="font-mono text-[0.75rem]">
                                    <?php echo $post_date; ?>
                                </div>
                            </div>
                            <div class="flex flex-col gap-[0.75rem]">
                                <h6><?php the_title(); ?></h6>
                                <?php if ($result) : ?>
                                    <div class="font-secondary text-[0.875rem]"><?php echo $result; ?></div>
                                <?php endif; ?>
                            </div>
                        </div>
                        <a class="flex justify-between items-center w-full font-secondary-600 text-[1rem]" href="<?php the_permalink(); ?>">
                            Learn more
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <rect x="19" y="11" width="2" height="2" fill="black"/>
                                <rect x="15" y="11" width="2" height="2" fill="black"/>
                                <rect opacity="0.8" x="13" y="11" width="2" height="2" fill="black"/>
                                <rect opacity="0.6" x="11" y="11" width="2" height="2" fill="black"/>
                                <rect opacity="0.5" x="9" y="11" width="2" height="2" fill="black"/>
                                <rect opacity="0.4" x="7" y="11" width="2" height="2" fill="black"/>
                                <rect opacity="0.2" x="5" y="11" width="2" height="2" fill="black"/>
                                <rect x="13" y="5" width="2" height="2" fill="black"/>
                                <rect x="15" y="7" width="2" height="2" fill="black"/>
                                <rect x="17" y="9" width="2" height="2" fill="black"/>
                                <rect x="13" y="17" width="2" height="2" fill="black"/>
                                <rect x="15" y="15" width="2" height="2" fill="black"/>
                                <rect x="17" y="13" width="2" height="2" fill="black"/>
                            </svg>
                        </a>
                    </div>
                </div>
            <?php endwhile;
            wp_reset_postdata(); // Restore original post data ?>
        </div>
    <?php else : ?>
        <div class="font-secondary text-[1rem]"><?php echo 'No posts found'; ?></div>
    <?php endif;


	die;

}

add_action( 'wp_ajax_loadmore', 'ahr_loadmore_ajax_handler' ); // wp_ajax_{action}
add_action( 'wp_ajax_nopriv_loadmore', 'ahr_loadmore_ajax_handler' ); // wp_ajax_nopriv_{action}

function ahr_loadmore_ajax_handler(){
 
	// prepare our arguments for the query
	$args = json_decode( stripslashes( $_POST[ 'query' ] ), true );
	$args[ 'paged' ] = $_POST[ 'page' ] + 1; // we need next page to be loaded
	$args[ 'post_status' ] = 'publish';

	// it is always better to use WP_Query but not here
	query_posts( $args );
 
	if( have_posts() ) : ?>
        <div class="grid xl:grid-cols-3 md:grid-cols-2 gap-[1.75rem]">
            <?php while( have_posts() ): the_post();

                $custom_block = get_field('block', get_the_ID());
                $custom_excerpt = $custom_block['excerpt'];

                $excerpt = $custom_excerpt ? $custom_excerpt : get_the_excerpt();
                $excerpt = substr($excerpt, 0, 260);
                $result = substr($excerpt, 0, strrpos($excerpt, ' '));

                $terms = wp_get_post_terms( get_the_ID(), 'resource-type');
                $post_date = get_the_date( 'M j, Y' );
                $post_thumb_id = get_post_thumbnail_id(get_the_ID());
                $custom_image = wp_get_attachment_image_src($post_thumb_id, 'full');
                $image = $custom_image ? $custom_image[0] : "";  
                ?>
                <div class="bg-[#F4EDE9] p-[1.75rem] gap-[1.75rem] flex flex-col relative group w-full">
                    <a href="<?php the_permalink() ?>" class="absolute top-0 left-0 w-full h-full z-10"></a>
                    <?php if($image) : ?>
                        <div class="h-[14.75rem]">
                            <img src="<?php echo $image; ?>" class="object-cover w-full h-full group-hover:scale-105 group-hover:transition-all group-hover:duration-300 group-hover:ease-in-out" />
                        </div>
                    <?php endif; ?>
                    <div class="flex flex-col justify-between gap-[1.75rem] <?php if($image) : ?> h-auto <?php else : ?> h-full <?php endif; ?>">
                        <div class="flex flex-col gap-[1.75rem]">
                            <div class="flex gap-[1rem] items-center justify-between">
                                <div class="flex ~gap-[0.5rem]/[1rem] flex-wrap items-center justify-start">
                                    <?php 
                                        foreach ( $terms as $term ) {
                                            $term_link = get_term_link( $term );
                                            echo '<div class="bg-[#E09762] text-black px-[0.75rem] py-[0.25rem] font-mono text-[0.75rem] rounded-[1.5rem] text-center lowercase">' . $term->name . '</div>' . ' ';
                                        } 
                                    ?>
                                </div>
                                <div class="font-mono text-[0.75rem]">
                                    <?php echo $post_date; ?>
                                </div>
                            </div>
                            <div class="flex flex-col gap-[0.75rem]">
                                <h6><?php the_title(); ?></h6>
                                <?php if ($result) : ?>
                                    <div class="font-secondary text-[0.875rem]"><?php echo $result; ?></div>
                                <?php endif; ?>
                            </div>
                        </div>
                        <a class="flex justify-between items-center w-full font-secondary-600 text-[1rem]" href="<?php the_permalink(); ?>">
                            Learn more
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <rect x="19" y="11" width="2" height="2" fill="black"/>
                                <rect x="15" y="11" width="2" height="2" fill="black"/>
                                <rect opacity="0.8" x="13" y="11" width="2" height="2" fill="black"/>
                                <rect opacity="0.6" x="11" y="11" width="2" height="2" fill="black"/>
                                <rect opacity="0.5" x="9" y="11" width="2" height="2" fill="black"/>
                                <rect opacity="0.4" x="7" y="11" width="2" height="2" fill="black"/>
                                <rect opacity="0.2" x="5" y="11" width="2" height="2" fill="black"/>
                                <rect x="13" y="5" width="2" height="2" fill="black"/>
                                <rect x="15" y="7" width="2" height="2" fill="black"/>
                                <rect x="17" y="9" width="2" height="2" fill="black"/>
                                <rect x="13" y="17" width="2" height="2" fill="black"/>
                                <rect x="15" y="15" width="2" height="2" fill="black"/>
                                <rect x="17" y="13" width="2" height="2" fill="black"/>
                            </svg>
                        </a>
                    </div>
                </div>
            <?php endwhile;
            wp_reset_postdata(); // Restore original post data ?>
        </div>        
    <?php 
	endif;
	die; // here we exit the script and even no wp_reset_query() required!
}