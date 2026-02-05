<?php
// Customize wysiwyg toolbar presets
add_filter('acf/fields/wysiwyg/toolbars', function () {
    $toolbars['Plain Heading'] = array();
    $toolbars['Plain Heading'][1] = array('fullscreen', 'bold');

    // $toolbars['TOC'] = array();
    // $toolbars['TOC'][1] = array('bold', 'link', 'unlink', 'fullscreen', 'formatselect');

    $toolbars['Text and Link'] = array();
    $toolbars['Text and Link'][1] = array('fullscreen', 'link');

    $toolbars['Regular'] = array();
    $toolbars['Regular'][1] = array('fullscreen', 'italic', 'bold', 'bullist', 'link');

    $toolbars['Text and Link V2'] = array();
    $toolbars['Text and Link V2'][1] = array('fullscreen', 'fontsizeselect', 'link');

    add_filter('tiny_mce_before_init', function ($init) {
        // Add font sizes to the dropdown
        $init['fontsize_formats'] = "0.875rem 1rem";
        return $init;
    });

    return $toolbars;
});

add_filter('tiny_mce_before_init', function ($init) {
    $init['block_formats'] = 'Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6;';
    return $init;
});