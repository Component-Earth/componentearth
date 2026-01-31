typeof app !== 'undefined' && app.ready(() => {
    var $ = jQuery.noConflict();

    const script = () => {
        const els = $("section.tabbed-sixty-forty");
        if (!els.length) return;

        els.each(function () {
            const self = $(this);

            const carousel = self.find(".owl-carousel");

            if (!carousel.length) return;

            carousel.owlCarousel({
                nav: false,
                loop: true,
                autoplay: false,
                rewind: true,
                margin: 16,
                slideBy: 1,
                items: 1,
                dotsEach: true,
                autoWidth: false,
                dots: true,
                dotsData: true,
            });
            
            // Go to the next item
            self.find('.btn-next').click(function() {
                carousel.trigger('next.owl.carousel');
            })

            // Go to the previous item
            self.find('.btn-prev').click(function() {
                // With optional speed parameter
                // Parameters has to be in square bracket '[]'
                carousel.trigger('prev.owl.carousel');
            })
            
            let mm = gsap.matchMedia();

            mm.add({
                isDesktop: `(min-width: 768px)`,
                isMobile: `(max-width: 767px)`,

            }, (context) => {
                let { isDesktop, isMobile } = context.conditions;

                if (isDesktop) {
                    if (carousel) {
                        carousel.trigger('refresh.owl.carousel');
                    }
                }

                if (isMobile) {
                    if (carousel) {
                        carousel.trigger('refresh.owl.carousel');
                    }
                }

                return () => { }
            });
        });
    }
    
    script();
});
