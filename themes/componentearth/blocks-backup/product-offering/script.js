typeof app !== 'undefined' && app.ready(() => {
    var $ = jQuery.noConflict();

    const script = () => {
        const els = $("section.product-offering");
        if (!els.length) return;

        els.each(function () {
            const self = $(this);
            var lastScrollTop = 0; // Initialize with the top position

            $(window).on('scroll', function() {
                var windowScrollTop = $(window).scrollTop() + 500;
                var ctr = 0;
                var ctrBlock = 0;
              
                $('.block-text').each(function() {
                    var $this = $(this);
                    var divOffsetTop = $this.offset().top;
                    var divHeight = $this.outerHeight();
                    
                    ctrBlock = ctrBlock + 1;

                    if (windowScrollTop >= divOffsetTop && windowScrollTop < (divOffsetTop + divHeight)) {                    
                        
                        //if scrolling down
                        if(windowScrollTop > lastScrollTop) {
                            $('.block-image[data-id="' + $this.attr('id') + '"]').addClass('active').removeClass('inactive');     
                            if(ctrBlock > 1) {
                                $('.block-image[data-id="' + $this.attr('id') + '"]').css({ 'top': 20 * ctr + 'px', 'left': 20 * ctr + 'px'})                                
                            }
                        } else {
                            //if scrolling up
                            if( !$this.hasClass('active')) {
                                $('.block-image[data-id="' + $this.attr('id') + '"]').next().addClass('inactive').removeClass('active');     
                            }
                        }

                        $this.addClass('active');
                        $this.siblings().removeClass('active');
                    }
                    ctr = ctr + 1;
                });

                lastScrollTop = windowScrollTop;
              
            });
        });
    }
    
    script();
});
