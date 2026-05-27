jQuery(function($) {
    const serviceLink = jQuery( '.design-card__meta__cta' )
    const siteContentView = jQuery( '#main-content' )
    const loading = jQuery( '#loading' )


    serviceLink.on( 'click', function(event) {        
        event.preventDefault();      
        
        var id = $(this).data('id');
        
        loading.removeClass('hidden')            
                
        //siteContentView.scrollIntoView({ behavior: 'smooth' });
        
        $.ajax({
            url: ajax_load_service_params.ajax_url,
            type: 'post',
            dataType: 'json', // Expect a JSON response
            data: {
                action: 'handle_ajax_load_service', 
                nonce: ajax_load_service_params.nonce,                    
                'id' : id,
            },
            success: function(response) {
                if (response.post) {
                    siteContentView.html(response.post); // Replace posts
                    siteContentView.css('opacity', '1'); // Remove loading indicator
                } else {
                    siteContentView.html('<p>No content found1.</p>');
                }
                setTimeout( function() {
                    loading.addClass('hidden')
                    siteContentView.removeClass( 'hidden' )    
                }, 2000);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("AJAX Error: " + textStatus, errorThrown);
                siteContentView.css('opacity', '1');
            }
        });     

    } );
});