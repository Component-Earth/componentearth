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
?>

<main class="bg-white lg:pt-[2.75rem] pt-[5.5rem] relative ungated">
    <div class="container relative z-10">
        <a href="/resources" class="flex gap-[0.5rem] items-center justify-start mb-[2rem] font-mono text-black text-[0.875rem]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect width="2" height="2" transform="matrix(-1 0 0 1 5 11)" fill="black"/>
                <rect width="2" height="2" transform="matrix(-1 0 0 1 9 11)" fill="black"/>
                <rect opacity="0.8" width="2" height="2" transform="matrix(-1 0 0 1 11 11)" fill="black"/>
                <rect opacity="0.6" width="2" height="2" transform="matrix(-1 0 0 1 13 11)" fill="black"/>
                <rect opacity="0.5" width="2" height="2" transform="matrix(-1 0 0 1 15 11)" fill="black"/>
                <rect opacity="0.4" width="2" height="2" transform="matrix(-1 0 0 1 17 11)" fill="black"/>
                <rect opacity="0.2" width="2" height="2" transform="matrix(-1 0 0 1 19 11)" fill="black"/>
                <rect width="2" height="2" transform="matrix(-1 0 0 1 11 5)" fill="black"/>
                <rect width="2" height="2" transform="matrix(-1 0 0 1 9 7)" fill="black"/>
                <rect width="2" height="2" transform="matrix(-1 0 0 1 7 9)" fill="black"/>
                <rect width="2" height="2" transform="matrix(-1 0 0 1 11 17)" fill="black"/>
                <rect width="2" height="2" transform="matrix(-1 0 0 1 9 15)" fill="black"/>
                <rect width="2" height="2" transform="matrix(-1 0 0 1 7 13)" fill="black"/>
            </svg>
            Back
        </a>

        <div class="max-w-[69rem] mx-auto">
            <div class="max-lg:flex-col flex flex-col items-start relative w-full">            
                <div class="flex flex-col gap-[1.75rem] items-start max-w-[40.875rem] mb-[2rem]">
                    <div class="flex gap-[1rem] uppercase items-center justify-start text-black font-secondary text-[0.75rem] leading-[140%] w-auto">                                
                        <?php if($custom_tag) : ?>
                            <div class="bg-[#E09762] text-black px-[0.75rem] py-[0.25rem] font-mono text-[0.75rem] rounded-[1.5rem] text-center lowercase"><?php echo $custom_tag[0]->name; ?></div>
                        <?php endif; ?>
                        <span class="text-[0.75rem] leading-none capitalize font-mono"><?php echo get_the_date('M d, Y'); ?></span>
                    </div>
                    <h2 class="leading-none"><?php the_title(); ?></h2>
                    <span class="text-black font-secondary text-[1.125rem] leading-none">By <?php the_author(); ?></span>
                </div>

                <?php if($block && $block['banner']) : ?>
                    <div class="lg:hidden w-full flex flex-col gap-[2rem] pb-[2.5rem] md:h-[35.875rem] h-full bg-cover bg-no-repeat bg-center items-start justify-end p-[2.5rem] overflow-hidden" 
                        style="background-image: url(<?php echo $block['banner']['url']; ?>)">
                        <img src="<?php echo $block['banner']['url']; ?>" class="invisible" />
                    </div>
                <?php endif; ?>

                <?php if($block && $block['banner']) : ?>
                    <div class="lg:flex hidden w-full flex-col gap-[2rem] pb-[2.5rem] md:h-[35.875rem] h-[20.5rem] bg-cover bg-no-repeat bg-center items-start justify-end p-[2.5rem] overflow-hidden" 
                        style="background-image: url(<?php echo $block['banner']['url']; ?>)">
                        &nbsp;
                    </div>
                <?php endif; ?>                                    
            </div>

            <div class="max-w-[54rem] mx-auto max-lg:mt-[1.25rem] st-xxl sb-xxl">                
                <div class="flex flex-col items-start rich-content text-black [&_ul]:p-0 lg:!gap-[2.5rem] !gap-[2rem] [&_p]:!mb-0 [&_.wp-block-heading]:!mb-0 [&_.wp-block-separator]:w-full">
                    <?php the_content(); ?>
                </div>

                <div class="flex ~mt-[2rem]/[2.5rem] items-center ~mb-[2rem]/[3rem]">
                    <div class="flex border-y border-solid border-[#F4EDE9]">
                        <span class="font-secondary text-[0.875rem] tracking-[-0.01rem] leading-[140%] text-black ~p-[1.5rem]/[1.75rem] border-l border-r border-solid border-[#F4EDE9]">Share</span>                    
                        
                        <a class="group ~p-[1.5rem]/[1.75rem] border-r border-solid border-[#F4EDE9]" href="https://www.facebook.com/sharer/sharer.php?u=<?php echo get_permalink(); ?>" target="_blank" rel="nofollow noreferrer noopener">
                            <svg class="w-[1.5rem] h-[1.5rem]" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <path class="group-hover:fill-[#C50]" fill-rule="evenodd" clip-rule="evenodd" d="M0 5C0 2.23858 2.23858 0 5 0H27C29.7614 0 32 2.23858 32 5V27C32 29.7614 29.7614 32 27 32H5C2.23858 32 0 29.7614 0 27V5ZM8.2 13.3V24H11.6V13.3H8.2ZM8 9.9C8 11 8.8 11.8 9.9 11.8C11 11.8 11.8 11 11.8 9.9C11.8 8.8 11 8 9.9 8C8.9 8 8 8.8 8 9.9ZM20.6 24H23.8V17.4C23.8 14.1 21.8 13 19.9 13C18.2 13 17 14.1 16.7 14.8V13.3H13.5V24H16.9V18.3C16.9 16.8 17.9 16 18.9 16C19.9 16 20.6 16.5 20.6 18.2V24Z" fill="black"/>
                            </svg>
                        </a>

                        <a class="group ~p-[1.5rem]/[1.75rem] border-r border-solid border-[#F4EDE9]" href="https://www.facebook.com/sharer/sharer.php?u=<?php echo get_permalink(); ?>" target="_blank" rel="nofollow noreferrer noopener">
                            <svg class="w-[1.5rem] h-[1.5rem]" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <path class="group-hover:fill-[#C50]" d="M28 0C30.2091 0 32 1.79086 32 4V28C32 30.2091 30.2091 32 28 32H4C1.79086 32 0 30.2091 0 28V4C0 1.79086 1.79086 0 4 0H28ZM18.0449 7C17.5911 7 16.0128 7.0889 14.7666 8.23535C13.386 9.50578 13.5782 11.0273 13.624 11.291V13.7266H11.3223C11.1443 13.7267 11.0001 13.8709 11 14.0488V17.3291C11 17.5072 11.1442 17.6522 11.3223 17.6523H13.5146V26.6777C13.5148 26.8558 13.6598 27 13.8379 27H17.5547C17.7328 27 17.8768 26.8558 17.877 26.6777V17.6943H20.3975C20.5612 17.6943 20.6989 17.5717 20.7178 17.4092L21.1006 14.0859C21.111 13.9948 21.0824 13.9035 21.0215 13.835C20.9603 13.7663 20.8722 13.7266 20.7803 13.7266H17.877V11.6436C17.877 11.0159 18.2153 10.6974 18.8818 10.6973H20.7803C20.9584 10.6973 21.1025 10.5531 21.1025 10.375V7.3252C21.1025 7.147 20.9585 7.00195 20.7803 7.00195H18.1641C18.1454 7.00105 18.1047 7 18.0449 7Z" fill="black"/>
                            </svg>
                        </a>

                        <a class="group ~p-[1.5rem]/[1.75rem] border-r border-solid border-[#F4EDE9]" href="http://twitter.com/intent/tweet?url=<?php echo get_permalink(); ?>" target="_blank" rel="nofollow noreferrer noopener">
                            <svg class="w-[1.5rem] h-[1.5rem]" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <path class="group-hover:fill-[#C50]" d="M28 0C30.2091 0 32 1.79086 32 4V28C32 30.2091 30.2091 32 28 32H4C1.79086 32 0 30.2091 0 28V4C0 1.79086 1.79086 0 4 0H28ZM7 8L13.8047 16.751L7.35547 24H10.1172L15.0947 18.4062L19.4453 24H25L17.9062 14.7773L23.9365 8H21.1758L16.6279 13.1123L12.6953 8H7ZM11.8643 9.53906L21.7363 22.375H20.207L10.2236 9.53906H11.8643Z" fill="black"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
    <?php Timber::render("./blocks/cta-block/template.twig", $context_rel); ?>    
    
</main>

<?php get_footer(); ?>