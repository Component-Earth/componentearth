baunfire.addModule({
    init(baunfire) {
        const $ = baunfire.$;

        const script = () => {
            const els = $("section.one-col-carousel");
            if (!els.length) return;

            els.each(function () {
                const self = $(this);
                /* Add your logic here */            

                const slider = document.querySelector('.slider');
                const slides = document.querySelectorAll('.slide')
                const sliderBg = document.querySelector('.slider__bg');
                const sliderDot = document.querySelector('.flickity-page-dot');

                const flkty = new Flickity( slider, {
                    cellSelector: '.slide',
                    pageDots: false,
                    wrapAround: true,
                    draggable: false,
                    prevNextButtons: false,
                    autoPlay: false,
                    rightToLeft: false,
                    accessibility: false,
                    draggable: true

                });

                // Cache your jQuery elements
                var $dotGroup = $('.slider-dots');
                var $dots = $dotGroup.find('.slider-dot');

                // 1. Synchronize dots with Flickity changes
                flkty.on('change', function(index) {
                    // Finds the dot matching the current index based on data-ctr and toggles the active class
                    $dots.removeClass('active');
                    $dots.filter('[data-ctr="' + index + '"]').addClass('active');
                });

                function slideAnim(currentSlide, targetSlide) {
                    let tl = gsap.timeline({defaults: {duration: .5, ease: 'power2.in'}});
                    let currentSlideEl = slides[currentSlide];
                    let year = currentSlideEl.querySelector('.slide__date');
                    let title = currentSlideEl.querySelector('.slide__title');
                    let img = currentSlideEl.querySelector('.slide__img');
                    tl.to(year, {xPercent: -80, autoAlpha: 0});
                    tl.to(img, {xPercent: -80, autoAlpha: 0}, '-=.3');
                    tl.to(title, {xPercent: -80, autoAlpha: 0}, '-=.3');
                    tl.add(() => {
                        //flkty.next();
                        flkty.select( targetSlide );                        
                    })
                    tl.add(() => {
                        tl.revert();
                    }, '+=1')                
                }

                // INSTANT DOT CLICK (No animation delay)
                $dotGroup.on('click', '.slider-dot', function() {
                    var dot = $(this);
                    var index = dot.data('ctr');
                    let currentSlide = flkty.selectedIndex;
                    
                    if(index != currentSlide) {
                        // Direct internal selection bypasses the GSAP timeline completely
                        flkty.select(index); 
                    }
                });

                
                // 2. Custom Prev/Next Click Event Integrations
                // $('.flickity-button.previous').on('click', function(e) {
                //     e.preventDefault();
                //     e.stopPropagation(); // Stops Flickity from firing its own event handler
                //     let currentSlide = flkty.selectedIndex;
                //     // Calculate previous index wrapping around if wrapAround: true
                //     let prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
                //     slideAnim(currentSlide, prevIndex);
                // });

                // $('.flickity-button.next').on('click', function(e) {
                //     e.preventDefault();
                //     e.stopPropagation(); // Stops Flickity from firing its own event handler
                //     let currentSlide = flkty.selectedIndex;
                //     // Calculate next index wrapping around if wrapAround: true
                //     let nextIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
                //     slideAnim(currentSlide, nextIndex);
                // });

                // $('.prev-bttn').on('click', function(e) {
                //     e.preventDefault();
                //     let currentSlide = flkty.selectedIndex;
                //     let prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
                //     slideAnim(currentSlide, prevIndex);
                // });
                
                // $('.next-bttn').on('click', function(e) {
                //     e.preventDefault();
                //     let currentSlide = flkty.selectedIndex;
                //     let nextIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
                //     slideAnim(currentSlide, nextIndex);
                // });                


            });
        }

        script();
    }
});
