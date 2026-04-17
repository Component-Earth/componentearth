jQuery(function($) {
    const ajaxFilter = jQuery( '#ajax-filter el-dropdown' )
    const siteContent = jQuery( '#site-content' )
    const filterBlock = jQuery('#filter-block');
    const siteContentView = document.getElementById( 'filter-block' )
    const loading = jQuery( '#loading' )
    const loadMore = jQuery( '#load-more' )

    if(ajaxFilter !== null) {
        ajaxFilter.each(function(e) {
            var dropdown = jQuery(this).find( 'el-menu a.filter' );

            dropdown.on( 'click', function(event) {        
                event.preventDefault();

                jQuery(this).addClass('active');            
                jQuery(this).siblings().removeClass('active');

                var dd = jQuery(this).closest('el-dropdown').attr('id');            
                var cat = 0, industry = 0;
                if(dd == "filter-category") {
                    cat = jQuery(this).data('value');
                    industry = 0;
                } else if(dd == "filter-industry") {
                    cat = 0;
                    industry = jQuery(this).data('value');
                }
                var selectedName = jQuery(this).data('name');

                jQuery(this).closest('el-dropdown').find('button span').html(selectedName);
                
                
                loading.removeClass('hidden')        
                siteContent.addClass( 'hidden' )        
                if(loadMore) {
                    loadMore.addClass('hidden')
                }            
                        
                siteContentView.scrollIntoView({ behavior: 'smooth' });
                
                $.ajax({
                    url: ajax_filter_params.ajax_url,
                    type: 'post',
                    dataType: 'json', // Expect a JSON response
                    data: {
                        action: 'handle_ajax_filter', 
                        nonce: ajax_filter_params.nonce,                    
                        'cat' : cat,
                        'industry' : industry
                    },
                    success: function(response) {
                        if (response.posts) {
                            siteContent.html(response.posts); // Replace posts
                            //pagination.html(response.pagination); // Replace pagination
                            siteContent.css('opacity', '1'); // Remove loading indicator
        
                            // Optional: Scroll to top of posts
                            $('html, body').animate({
                                scrollTop: filterBlock.offset().top - 50
                            }, 500);
                        } else {
                            siteContent.html('<p>No results found.</p>');
                            //pagination.html('');
                        }
                        setTimeout( function() {
                            loading.addClass('hidden')
                            siteContent.removeClass( 'hidden' )                        
                            //pagination.removeClass('hide')
                        }, 2000);
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.error("AJAX Error: " + textStatus, errorThrown);
                        siteContent.css('opacity', '1');
                    }
                });     

            } );
        } );
    }
});