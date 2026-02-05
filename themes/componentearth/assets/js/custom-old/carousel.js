(function () {
    const $ = baunfire.$;

    baunfire.Carousel = {
        init() {
            this.cards();
            this.logos();
            this.logosFluid();
            this.processCarousel();

            // baunfire.Global.refreshScrollTriggers();
            ScrollTrigger.refresh(true);
        },

        cards() {
            const customCarousel = $(".owl-carousel.card-carousel");

            if (!customCarousel.length) return;

            customCarousel.owlCarousel({
                dots: false,
                nav: false,
                loop: true,
                autoplay: true,
                center: true,
                slideTransition: 'linear',
                autoplaySpeed: 9000,
                autoplayHoverPause: true,
                margin: 24,
                responsive: {
                    0: {
                        items: 2,
                    },
                    760: {
                        items: 3,
                    },
                    1080: {
                        items: 5,
                        margin: 24
                    },
                    1440: {
                        items: 6,
                        margin: 24,
                    }
                }
            });


            customCarousel.find('.owl-item').on('mouseenter', function (e) {
                $(this).closest('.owl-carousel').trigger('stop.owl.autoplay');
            });
            customCarousel.find('.owl-item').on('mouseleave', function (e) {
                $(this).closest('.owl-carousel').trigger('play.owl.autoplay', [500]);
            });


            let mm = gsap.matchMedia();

            mm.add({
                isDesktop: `(min-width: 768px)`,
                isMobile: `(max-width: 767px)`,

            }, (context) => {
                let { isDesktop, isMobile } = context.conditions;

                if (isDesktop) {
                    if (customCarousel) {
                        customCarousel.trigger('refresh.owl.carousel');
                    }
                }

                if (isMobile) {
                    if (customCarousel) {
                        customCarousel.trigger('refresh.owl.carousel');
                    }
                }

                return () => { }
            });
        },

        logos() {
            const customCarousel = $(".logo-carousel.contained");

            if (!customCarousel.length) return;

            customCarousel.owlCarousel({
                dots: false,
                nav: false,
                loop: true,
                center: false,
                autoplay: true,
                margin: 80,
                autoWidth: false,
                autoplaySpeed: 9000,
                responsive: {
                    0: {
                        items: 2,
                        margin: 80,
                    },
                    560: {
                        items: 3,
                    },
                    980: {
                        items: 4,
                        margin: 100,
                    },
                    1300: {
                        items: 5,
                        margin: 120,
                    }
                }
            });

            let mm = gsap.matchMedia();

            mm.add({
                isDesktop: `(min-width: 768px)`,
                isMobile: `(max-width: 767px)`,

            }, (context) => {
                let { isDesktop, isMobile } = context.conditions;

                if (isDesktop) {
                    if (customCarousel) {
                        customCarousel.trigger('refresh.owl.carousel');
                    }
                }

                if (isMobile) {
                    if (customCarousel) {
                        customCarousel.trigger('refresh.owl.carousel');
                    }
                }

                return () => { }
            });
        },

        logosFluid() {
            const customCarousel = $(".logo-carousel.fluid");

            if (!customCarousel.length) return;

            customCarousel.owlCarousel({
                dots: false,
                nav: false,
                loop: true,
                center: false,
                autoplay: true,
                margin: 80,
                autoWidth: false,
                autoplaySpeed: 9000,
                responsive: {
                    0: {
                        items: 2,
                        margin: 80,
                    },
                    560: {
                        items: 3,
                    },
                    980: {
                        items: 4,
                        margin: 100,
                    },
                    1300: {
                        items: 6,
                        margin: 120,
                    }
                }
            });

            let mm = gsap.matchMedia();

            mm.add({
                isDesktop: `(min-width: 768px)`,
                isMobile: `(max-width: 767px)`,

            }, (context) => {
                let { isDesktop, isMobile } = context.conditions;

                if (isDesktop) {
                    if (customCarousel) {
                        customCarousel.trigger('refresh.owl.carousel');
                    }
                }

                if (isMobile) {
                    if (customCarousel) {
                        customCarousel.trigger('refresh.owl.carousel');
                    }
                }

                return () => { }
            });
        },

        processCarousel() {
            const carousel = $(".owl-carousel.process-carousel-inner");

            if (!carousel.length) return;

            carousel.owlCarousel({
                dots: false,
                nav: false,
                loop: true,
                autoplay: false,
                margin: 64,
                slideBy: 1,
                dotsEach: true,
                autoWidth: false,
                responsive: {
                    0: {
                        items: 1.10,
                        margin: 32,
                    },
                    760: {
                        items: 2.15,
                        margin: 32,
                    },
                    1080: {
                        items: 3.25,
                        margin: 64,
                    },
                    1300: {
                        items: 3.25,
                    }
                }
            });

            // Go to the next item
            $('.process-carousel-inner-wrapper').find('.btn-next').click(function () {
                carousel.trigger('next.owl.carousel');
            })

            // Go to the previous item
            $('.process-carousel-inner-wrapper').find('.btn-prev').click(function () {
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
        }
    };

    baunfire.addModule(baunfire.Carousel);
})();
