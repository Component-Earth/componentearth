baunfire.addModule({
    init(baunfire) {
        const $ = baunfire.$;

        const script = () => {
            const els = $("section.tabbed-carousels");
            if (!els.length) return;

            els.each(function () {
                const self = $(this);
                /* Add your logic here */               

                
                function switchTab(tabId) {
                    // Hide all panes and deactivate all buttons

                    $('.tab-pane').removeClass('active');
                    $('.tab-btn').removeClass('active');
                    
                    // Show the selected pane and activate the clicked button
                    $('.tab-btn[data-tab=' + tabId + ']').addClass('active');    
                    $('.tab-pane[data-tab=' + tabId + ']').addClass('active');
                }

                $('.tab-btn').click(function(e) {
                    switchTab($(this).data('tab'));
                })

                // external js: flickity.pkgd.js

                // var $carousel = $('.carousel').flickity({
                //     imagesLoaded: true,
                //     percentPosition: false,
                // });
                
                // var $imgs = $carousel.find('.carousel-cell img');
                // // get transform property
                // var docStyle = document.documentElement.style;
                // var transformProp = typeof docStyle.transform == 'string' ?
                //     'transform' : 'WebkitTransform';
                // // get Flickity instance
                // var flkty = $carousel.data('flickity');
                
                // $carousel.on( 'scroll.flickity', function() {
                //     flkty.slides.forEach( function( slide, i ) {
                //     var img = $imgs[i];
                //     var x = ( slide.target + flkty.x ) * -1/3;
                //     img.style[ transformProp ] = 'translateX(' + x  + 'px)';
                //     });
                // });
                // $carousel.on('staticClick.flickity', function(event, pointer, cellElement, cellIndex) {
                //     // cellElement is the clicked slide's element
                //     if (cellElement) {
                //       console.log('Clicked cell index: ' + cellIndex);
                //       // Perform actions, e.g., navigate to a URL or open a modal
                //       $(cellElement).toggleClass('is-clicked');
                //     }
                //   });

                // $carousel.on('dragStart.flickity', function() {
                //     $carousel.find('.slide-link').css('pointer-events', 'none');
                // });
                  
                // $carousel.on('dragEnd.flickity', function() {
                //     $carousel.find('.slide-link').css('pointer-events', 'auto');
                // });
                  

            });
        }

        script();
    }
});
