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

                const flkty = new Flickity( slider, {
                    cellSelector: '.slide',
                    pageDots: false,
                    wrapAround: true,
                    prevNextButtons: false,
                    autoPlay: false,
                    rightToLeft: false,
                    accessibility: false,
                    draggable: true,
                    initialIndex: 1 
                });

                // Cache your jQuery elements
                var $dotGroup = $('.slider-dots');
                var $dots = $dotGroup.find('.slider-dot');
                let activeTimeline = null;

                // Combined change handler: Updates dots immediately on any index shift
                flkty.on('change', function(index) {
                    
                    var originalGalleryLength = flkty.cells.length / 4;
                    let currentSlide = index % originalGalleryLength;
                    $dots.removeClass('active');
                    $dots.filter('[data-ctr="' + currentSlide + '"]').addClass('active');
                });

                // Settle handler: Automatically cleans up and resets GSAP states 
                flkty.on('settle', function(index) {
                    if (activeTimeline) {
                        activeTimeline.revert();
                        activeTimeline = null;
                    }
                });        

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

                // Animation function optimized for cloning/looping
                function slideAnim(currentSlideIndex, targetSlideIndex) {
                    if (activeTimeline) {
                        activeTimeline.revert();
                    }

                    // FIX: Instead of relying on a global static NodeList, grab the specific 
                    // visual element that Flickity is interacting with right now.
                    let currentSlideEl = flkty.selectedElement; 
                    
                    if (!currentSlideEl) return;

                    let year = currentSlideEl.querySelector('.slide__date');
                    let title = currentSlideEl.querySelector('.slide__title');
                    let img = currentSlideEl.querySelector('.slide__img');
                    
                    activeTimeline = gsap.timeline({defaults: {duration: .5, ease: 'power2.in'}});
                    
                    // Only animate elements if they exist in the current viewport clone
                    if (year) activeTimeline.to(year, {xPercent: -80, autoAlpha: 0});
                    if (img) activeTimeline.to(img, {xPercent: -80, autoAlpha: 0}, '-=.3');
                    if (title) activeTimeline.to(title, {xPercent: -80, autoAlpha: 0}, '-=.3');
                    
                    activeTimeline.add(() => {
                        flkty.select(targetSlideIndex);                        
                    });
                }      


            });
        }

        script();
    }
});
