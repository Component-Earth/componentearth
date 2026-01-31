typeof app !== 'undefined' && app.ready(() => {
    var $ = jQuery.noConflict();

    const script = () => {
        const els = $("section.process-carousel-wrapper");
        if (!els.length) return;

        els.each(function () {
            const self = $(this);

            const carousel = $(".owl-carousel.process-carousel");

            if (!carousel.length) return;

            carousel.owlCarousel({
                dots: false,
                nav: false,
                loop: false,
                autoplay: false,
                rewind: true,
                margin: 28,
                slideBy: 1,
                dotsEach: true,
                autoWidth: false,
                responsive: {
                    0: {
                        items: 1,
                    },
                    760: {
                        items: 2.15,
                    },
                    1080: {
                        items: 2.5,
                    },
                    1300: {
                        items: 2.5,
                    }
                }
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
