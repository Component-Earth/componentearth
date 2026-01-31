const ajaxFilter = document.getElementById( 'ajax-filter' )
const siteContent = document.getElementById( 'site-content' )
const loading = document.getElementById( 'loading' )
const loadMore = document.getElementById( 'load-more' )

if(ajaxFilter !== null) {
    ajaxFilter.querySelector( 'el-menu' ).addEventListener( 'click', event => {        
        event.preventDefault();

        ajaxFilter.querySelector('button span').innerHTML = event.target.attributes[2].value
        
        loading.classList.remove('hidden')
        loadMore.classList.add('hidden')
        siteContent.classList.add( 'hidden' )    
        
        siteContent.scrollIntoView({ behavior: 'smooth' });
        
        fetch( ahr_args.ajaxurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                // filter WordPress posts by category
                'cat' : event.target.attributes[1].value
            } ),
        }).then( response => {
            return response.text()
        }).then( response => {

            if( response ) {
                siteContent.innerHTML = response;
            }
            setTimeout( function() {
                loading.classList.add('hidden')
                loadMore.classList.remove('hidden')
                siteContent.classList.remove( 'hidden' )
            }, 2000);

        }).catch( error => {
            console.log( error )
        })

    } );
}