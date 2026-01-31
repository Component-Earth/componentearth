jQuery(function($){ // use jQuery code inside this to avoid "$ is not defined" error
	$( '.ahr_loadmore' ).click(function(){
 
		const button = $(this)
		const data = {
			'action' : 'loadmore',
			'query': posts_myajax, // that's how we get params from wp_localize_script() function
			'page' : current_page_myajax
		}

		
		console.log(data);
 
		$.ajax({ // you can also use $.post here
			url : '/wp-admin/admin-ajax.php', // AJAX handler
			data : data,
			type : 'POST',
			beforeSend : function ( xhr ) {
				button.text( 'Loading...' ) // change the button text, you can also add a preloader image
			},
			success : function( data ){
				if( data ) { 
					button.text( 'Load more' ).parent().prev().after(data) // insert new posts
					current_page_myajax++
 
					if ( current_page_myajax == max_page_myajax ) { 
						button.remove() // if last page, remove the button
					}
					// you can also fire the "post-load" event here if you use a plugin that requires it
					// $( document.body ).trigger( 'post-load' );
				} else {
					button.remove() // if no data, remove the button as well
				}
			}
		})
	})
})