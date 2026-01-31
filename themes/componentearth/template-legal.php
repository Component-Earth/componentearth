<?php
/**
 * Template Name: Legal
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package baunfire
 */

get_header();

$post = Timber::get_post();

$fields = get_field('block', $post->ID);
$context_cta_global_footer = null;

if ($fields) {
    $context_cta_global_footer = Timber::context([
        'fields' => $fields,
        'block'  => [
            'id'     => 'cta-global-footer',
            'slug'   => 'cta-global-footer',
            'anchor' => '',
        ],
        'post'   => $post,
    ]);
}
?>

<main>
    <section class="legal bg-white relative">
        <div class="bg-light-gray pt-[4.5rem] md:pt-[12rem] pb-[2.5rem] md:pb-[5rem]">
            <div class="container max-w-[54.25rem] w-full">
                <div class="flex flex-col ~gap-[1rem]/[2rem]">
                    <h1 class="h1"><?php the_title(); ?></h1>
                    <p class="text-[0.75rem] leading-[140%] uppercase">Updated <?php echo get_field('date', $post->ID); ?></p>
                    <p class="text-[1.5rem]"><?php echo get_field('introduction', $post->ID); ?></p>
                </div>
            </div>
        </div>

        <div class="pb-[2.875rem] md:pb-[5rem]">
            <div class="container max-w-[54.25rem] w-full">
                <div class="transition-top">
                    <div class="rich-content">
                        <?php the_content(); ?>
                    </div>                    
                </div>
            </div>
        </div>
    </section>

    <?php if ($context_cta_global_footer) {
        Timber::render('blocks/cta-global-footer/template.twig', $context_cta_global_footer);
    } ?>
</main>

<style>
    .nav__outer {
        background-color: #ECF2F6;
    }
</style>

<?php get_footer(); ?>
