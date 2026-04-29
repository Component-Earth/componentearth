<?php

/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package baunfire
 */

get_header();

global $post;

$resource_cat = 'resource-type';
$args = array(
    'taxonomy' => $resource_cat,
    'orderby' => 'name',
    'order'   => 'ASC'
);

$type_color = ""; 	
$type_name = "";
$term = wp_get_post_terms($post->ID, $resource_cat);

if($term) : 
    $type_name = $term[0]->name;
endif;

$block = get_field('block');

/* Related BLOCK */
$fromPostRel = get_field("block_cta", $post->ID);
$fromOptionRel = get_field("block_cta", "option");
$dataRel = $fromPostRel ? $fromPostRel : $fromOptionRel;

$context_rel = Timber::context([
    "fields" => $dataRel,
    "from_single" => true
]);


$custom_tag = wp_get_post_terms($post->ID, 'resource-type');     


$post_thumb_id = get_post_thumbnail_id($post->ID);
$custom_image = wp_get_attachment_image_src($post_thumb_id, 'full');
$image = $custom_image ? $custom_image[0] : "";
?>

<main class="bg-[#C0D5EA] relative ungated pb-[5rem]">
    <?php if($image) : ?>
        <div class="lg:hidden w-full flex flex-col gap-[2rem] h-[31rem] bg-cover bg-no-repeat bg-start overflow-hidden rounded-b-[5rem]" 
            style="background-image: url(<?php echo $image; ?>)">
            <img src="<?php echo $image; ?>" class="invisible" />
        </div>
    <?php endif; ?>

    <div class="container relative z-10">
        <?php if($image) : ?>
            <div class="lg:flex hidden w-full flex-col gap-[2rem] md:h-[45rem] h-[31rem] bg-cover bg-no-repeat bg-start overflow-hidden rounded-b-[5rem]" 
                style="background-image: url(<?php echo $image; ?>)">
                &nbsp;
            </div>
        <?php endif; ?>  
        <div class="max-w-[69rem] mx-auto pt-[5rem]">
            <div class="max-lg:flex-col flex flex-col items-start relative w-full">        
                <div class="flex flex-col gap-[1.75rem] items-start">  
                    <div class="flex flex-col gap-[1.75rem]">
                        <div class="flex flex-col gap-[0.75rem] relative">
                            <div class="lg:block hidden text-[10rem] absolute top-[-2rem] left-[-3rem] text-[#025294] opacity-20">
                                01
                            </div>
                            <div class="lg:p-[3rem] flex flex-col gap-[1.5rem]">
                                <div class="py-[1rem] flex gap-[2rem] items-center text-primary font-tertiary text-[4rem] font-normal tracking-[-2%]">
                                    <div class="w-[10rem] h-[2px] bg-primary"></div> Resource
                                </div>           
                                <h2 class="text-primary-dark max-w-[30.875rem] text-[5.625rem] tracking-[-2%] leading-[90%]"><?php the_title(); ?></h2>                                
                                <div class="font-tertiary font-normal text-primary-dark text-[1rem]"><?php the_content(); ?></div>                                
                            </div>
                        </div>
                    </div>
                </div>                             
            </div>
        </div>
    </div> 
    
</main>

<?php get_footer(); ?>