baunfire.addModule({
    init(baunfire) {
        const $ = baunfire.$;

        const script = () => {
            const els = $("section.three-col-carousel");
            if (!els.length) return;

            els.each(function () {
                const self = $(this);
                /* Add your logic here */            
	
                const slider = document.querySelector('.slider');
                const slides = document.querySelectorAll('.slide')
                const sliderBg = document.querySelector('.slider__bg');
                // const sliderNext = document.querySelector('.slider-control.next');
                // const sliderPrev = document.querySelector('.slider-control.prev');
                const sliderDot = document.querySelector('.flickity-page-dot');

                const flkty = new Flickity( slider, {
                    cellSelector: '.slide',
                    pageDots: false,
                    wrapAround: true,
                    draggable: false,
                    prevNextButtons: false,
                    autoPlay: false,
                    rightToLeft: true,
                    accessibility: false

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

                var $dotGroup = $('.slider-dots');
                
                $dotGroup.on( 'click', '.slider-dot', function() {
                    var index = $(this).data('ctr');
                    let currentSlide = flkty.selectedIndex;
                    if(index != currentSlide) {
                        slideAnim(currentSlide, index)
                    }
                });

                // sliderPrev.addEventListener('click', () => {
                //     let currentSlide = flkty.selectedIndex;
                //     slideAnim(currentSlide, )
                // })

                // sliderNext.addEventListener('click', () => {
                //     let currentSlide = flkty.selectedIndex;
                //     slideAnim(currentSlide, 3)
                // })

                // function initSlider() {
                    // let currentSlide = slides[0];
                    // let bgColor = currentSlide.dataset.bg;
                    // sliderBg.style.backgroundColor = bgColor;
                // }

                // initSlider();

            });
        }

        script();
    }
});
