(function (app) {
    "use strict";
    var $ = jQuery.noConflict();
    var Animation = function () { };

    let startingThreshold = 90;

    Animation.prototype.init = function () {
        Animation.prototype.handleNav();
        Animation.prototype.handleNavMobile();
        Animation.prototype.transitionPresets();
        Animation.prototype.headerAnim();
        Animation.prototype.skeletonLoading();
        //Animation.prototype.smoothScroll();
        Animation.prototype.bgAnim();
    };
    
    // Animation.prototype.smoothScroll = function () {
    //     SmoothScroll({
    //         keyboardSupport: true,
    //         animationTime: 800,
    //         stepSize: 25,
    //         keyboardSupport: true,
    //         arrowScroll: 50,
    //         touchpadSupport: true,
    //     });
    // };
    
    Animation.prototype.handleNav = function () {
        const nav = $(".nav__desktop");
        if (!nav.length) return;

        const showNav = () => {
            const navContainer = $("nav");
            gsap.fromTo(
                navContainer,
                {
                    yPercent: -100,
                    autoAlpha: 0
                },
                {
                    autoAlpha: 1,
                    yPercent: 0,
                    duration: 0.8,
                    ease: Power2.easeOut,
                    delay: 0.2
                }
            );
        };


        const showDDPanel = () => {
            const items = nav.find(".nav__item.parent");
            const overlay = nav.find(".nav__overlay");

            overlay.hover(function () {
                const activeItems = nav.find(".nav__item.parent.active");
                items.removeClass("active");

                gsap.to(activeItems.find(".nav__dd"), {
                    height: 0,
                    duration: 0.4,
                    ease: Power2.easeOut,
                    overwrite: true,
                    onComplete: () => {
                        items.removeClass("active");
                    }
                });
            }, function (e) {
                return;
            });

            items.hover(function (e) {
                e.stopPropagation();

                const subSelf = $(this);
                const dd = subSelf.find(".nav__dd");
                const ddInner = dd.find(".nav__dd-inner");

                if (!subSelf.hasClass("active")) {
                    const navItemTL = gsap.timeline({ defaults: { overwrite: true } });

                    const activeItems = nav.find(".nav__item.parent.active");
                    items.removeClass("active");
                    subSelf.addClass("active");

                    if (activeItems.length) {
                        navItemTL.set(activeItems.find(".nav__dd, .nav__dd-inner"), {
                            clearProps: true
                        });
                    }

                    navItemTL
                        .fromTo(dd,
                            {
                                height: 0,
                            },
                            {
                                height: "auto",
                                duration: 0.6,
                                ease: "expo.out"
                            },
                        )
                        .fromTo(ddInner,
                            {
                                autoAlpha: 0,
                                y: "2rem",
                            },
                            {
                                y: 0,
                                autoAlpha: 1,
                                duration: 0.6,
                                ease: Power2.easeOut
                            },
                            "<0.2"
                        )

                } else {
                    overlay.trigger("click");
                }
            }, function (e) {
                items.removeClass('active');
                return;
            });
        }
        
        // const showDDPanel = () => {
        //     const items = nav.find(".nav__item.parent");
        //     const overlay = nav.find(".nav__overlay");

        //     overlay.hover(
        //         function () {
        //             const activeItems = nav.find(".nav__item.parent.active");
        //             items.removeClass("active");

        //             gsap.to(activeItems.find(".nav__dd"), {
        //                 autoAlpha: 0,
        //                 duration: 0.3,
        //                 ease: Power2.easeOut,
        //                 overwrite: true,
        //                 onComplete: () => {
        //                     items.removeClass("active");
        //                 }
        //             });
        //         },
        //         function () {
        //             return;
        //         }
        //     );

        //     items.hover(
        //         function (e) {
        //             e.stopPropagation();

        //             const subSelf = $(this);
        //             const dd = subSelf.find(".nav__dd");
        //             const ddInner = dd.find(".nav__dd-inner");
        //             //dd.css('left',  -dd.width()  );

        //             if (!subSelf.hasClass("active")) {
        //                 const navItemTL = gsap.timeline({ defaults: { overwrite: true } });

        //                 const activeItems = nav.find(".nav__item.parent.active");
        //                 items.removeClass("active");
        //                 subSelf.addClass("active");

        //                 if (activeItems.length) {
        //                     navItemTL.set(activeItems.find(".nav__dd, .nav__dd-inner"), {
        //                         clearProps: true
        //                     });
        //                 }

        //                 navItemTL.fromTo(
        //                     dd,
        //                     { autoAlpha: 0, display: "none" },
        //                     { autoAlpha: 1, display: "block", duration: 0.3, ease: Power2.easeOut }
        //                 );

        //                 navItemTL.fromTo(
        //                     ddInner,
        //                     { autoAlpha: 0 },
        //                     { autoAlpha: 1, duration: 0.3, ease: Power2.easeOut },
        //                     "<"
        //                 );
        //             }
        //         },
        //         function () {
        //             const subSelf = $(this);
        //             const dd = subSelf.find(".nav__dd");

        //             gsap.to(dd, {
        //                 autoAlpha: 0,
        //                 display: "none",
        //                 duration: 0.3,
        //                 ease: Power2.easeOut,
        //                 onComplete: () => {
        //                     subSelf.removeClass("active");
        //                 }
        //             });
        //         }
        //     );
        // };

        showNav();
        showDDPanel();
    };

    Animation.prototype.handleNavMobile = function () {
        const nav = $(".nav__mobile");
        if (!nav.length) return;

        const nav__burger = $(".nav__burger");

        const showDDPanel = () => {
            nav__burger.on('click', function (e) {
                e.stopPropagation();

                const subSelf = $(".nav__mobile");
                $(this).toggleClass('active');
                subSelf.toggleClass("active");

                // Close all dropdowns and reset styles
                //subSelf.find('.nav__dd').removeClass('active');
                //subSelf.find('.nav__item-inner').removeClass('active dimmed');
            });

            // Toggle submenu and inner content
            $('.nav__mobile').on('click', '.nav__item.parent', function (e) {
                e.stopPropagation();

                const dd = $(this);
                dd.siblings().removeClass('opened');
                dd.siblings().find('.nav__dd').removeClass('active');
                dd.siblings().find('.nav__item-inner').removeClass('active');

                dd.toggleClass('opened');
                dd.find('.nav__dd').toggleClass('active');
                dd.find('.nav__item-inner').toggleClass('active');
                
            });
        }

        showDDPanel();
    };

    Animation.prototype.headingAnimation = function (words, ST, TW = {}) {
        if (words) {
            const tweenConfig = {
                y: 0,
                autoAlpha: 1,
                stagger: { each: 0.04 },
                duration: 0.8,
                ease: Power2.easeOut,
                ...TW
            }

            if (ST) {
                tweenConfig.scrollTrigger = { ...ST };
            }

            gsap.fromTo(words, { y: "40px", autoAlpha: 0 }, { ...tweenConfig });
        }
    };

    Animation.prototype.footerAnimation = function () {
        const backToTopAnim = () => {
            const backToTop = $(`.footer__to-top`);
            if (!backToTop.length) return;

            backToTop.click(function () {
                gsap.to(window, {
                    duration: 0.2,
                    scrollTo: 0,
                    ease: Power1.easeInOut,
                    overwrite: true
                });
            });
        }

        const footerHeadingAnim = () => {
            let heading = $(".footer__pre-heading .inner-word");
            if (!heading.length) return;

            app.Animation.prototype.headingAnimation(heading, {
                trigger: ".footer",
                start: "top 60%"
            });
        }

        const footerVideo = () => {
            const videoContainer = $(`.footer__media .video-container`);
            if (!videoContainer.length) return;

            ScrollTrigger.create({
                trigger: "footer",
                start: "top 60%",
                once: true,
                onEnter: () => {
                    const videoID = videoContainer.data("video-id");
                    videoContainer.append(`<iframe src="https://player.vimeo.com/video/${videoID}?autoplay=1&background=1" playsinline frameborder="0" allow="autoplay;"></iframe>`);

                    setTimeout(() => {
                        videoContainer.addClass("loaded");

                        const playerContainer = videoContainer.find("iframe");
                        if (!playerContainer.length) return;

                        const playerInstance = new Vimeo.Player(playerContainer.get(0));
                        playerInstance.setMuted(true);

                        ScrollTrigger.create({
                            trigger: "footer",
                            start: "top center",
                            end: "bottom 30%",
                            onEnter: () => {
                                playerInstance.play();
                            },
                            onLeave: () => {
                                playerInstance.pause();
                            },
                            onEnterBack: () => {
                                playerInstance.play();
                            },
                            onLeaveBack: () => {
                                playerInstance.pause();
                            }
                        });
                    }, 3000);
                },
            });
        }

        backToTopAnim();
        footerVideo();
        footerHeadingAnim();
    };

    Animation.prototype.transitionPresets = function (parent = "") {
        const stInstance = ScrollTrigger.create({ start: `top ${startingThreshold}%`, toggleActions: "play none none none", });
        const defaultTweenProps = { duration: 1.2, ease: Power2.easeOut };

        animatedTop();
        animatedBottom();
        animatedFade();
        animatedLeft();
        animatedRight();
        staggerElementsTop();
        staggerElementsLeft();

        function animateDirection(type, x, y, alpha, delay) {
            const elements = gsap.utils.toArray(`${parent} .transition-${type}`);

            if (elements.length) {
                elements.forEach((el) => {
                    const customTriggerDistance = $(el).data("trigger-distance");
                    const customDelay = $(el).data("custom-delay") ? $(el).data("custom-delay") : delay;
                    // const customTriggerDistance = '-500px';
                    let triggerPreset = customTriggerDistance
                        ? { ...ScrollTrigger.create({ start: customTriggerDistance }).vars }
                        : { ...stInstance.vars };

                    gsap.set(el, { x, y, autoAlpha: alpha ? 0 : 1 });
                    gsap.to(el, {
                        ...defaultTweenProps,
                        autoAlpha: 1,
                        x: 0,
                        y: 0,
                        delay: customDelay,
                        scrollTrigger: { ...triggerPreset, trigger: el },
                    });
                });
            }
        }

        function animatedStagger(type, x, y, alpha) {
            const wrapper = gsap.utils.toArray(
                `${parent} .transition-${type}-stagger`
            );

            if (wrapper.length) {
                wrapper.forEach((wrap) => {
                    // const mode = $(wrap).data("mode");
                    // if (mode == "desktop" && smallScreens) return;

                    const customTriggerDistance = $(wrap).data("trigger-distance");
                    const customDelay = $(wrap).data("custom-delay");
                    const customStagger = $(wrap).data("custom-stagger");

                    let triggerPreset = customTriggerDistance
                        ? { ...ScrollTrigger.create({ start: customTriggerDistance }).vars }
                        : { ...stInstance.vars };
                    const children = [...wrap.children];

                    gsap.set(children, { x, y, autoAlpha: 0 });
                    gsap.to(children, {
                        ...defaultTweenProps,
                        autoAlpha: 1,
                        x: 0,
                        y: 0,
                        // delay: customDelay,
                        // stagger: { each: 1.6 },                     
                        delay: customDelay, 
                        stagger: customStagger,
                        duration: 2,   
                        //ease: "sine.out", 
                        //force3D: true,
                        scrollTrigger: {
                            ...triggerPreset,
                            trigger: children,
                            invalidateOnRefresh: true,
                        },
                    });
                });
            }
        }

        function animatedFade() {
            const fadedElements = gsap.utils.toArray(".transition-fade");
            if (fadedElements.length) {
                fadedElements.forEach((el) => {
                    let sectionTrigger = $(el).closest("section");
                    gsap.set(el, { visibility: "hidden" });
                    if ($(el).data('animation-delay'))
                        defaultTweenProps.delay = $(el).data('animation-delay');
                    gsap.from(el, {
                        ...defaultTweenProps,
                        autoAlpha: 0,
                        scrollTrigger: {
                            trigger: sectionTrigger,
                            ...stInstance.vars,
                            // markers: true
                        },
                    });
                });
            }

            const fadedElementsDefault = gsap.utils.toArray(
                ".transition-fade-default"
            );
            if (fadedElementsDefault.length) {
                fadedElementsDefault.forEach((el) => {
                    const customTriggerDistance = $(el).data("trigger-distance");
                    let triggerPreset = customTriggerDistance
                        ? { ...ScrollTrigger.create({ start: customTriggerDistance }).vars }
                        : { ...stInstance.vars };

                    gsap.set(el, { visibility: "hidden" });
                    gsap.from(el, {
                        ...defaultTweenProps,
                        autoAlpha: 0,
                        scrollTrigger: { trigger: el, ...triggerPreset },
                    });
                });
            }
        }

        function animatedTop() {
            animateDirection("top", 0, 60, true);
        }

        function animatedBottom() {
            animateDirection("bottom", 0, -60, true);
        }

        function animatedLeft() {
            animateDirection("left", 60, 0);
        }

        function animatedRight() {
            animateDirection("right", -60, 0);
        }

        function staggerElementsTop() {
            animatedStagger('top', 0, 100, true);
        }

        function staggerElementsLeft() {
            animatedStagger("left", -100, 0, true);
        }

        function animatedTextFill() {
            const splitTypes = document.querySelectorAll('.transition-text-fill');
            if (!splitTypes.length) return;

            splitTypes.forEach((char, i) => {
                const bg = char.dataset.bgColor;
                const fg = char.dataset.fgColor;

                const text = new SplitType(char, { types: 'words' });

                gsap.fromTo(text.words,
                    {
                        color: bg,
                    },
                    {
                        color: fg,
                        duration: 0.4,
                        stagger: 0.04,
                        ease: Power2.easeOut,
                        scrollTrigger: {
                            trigger: char,
                            start: 'top 100%',
                            end: 'top 20%',
                            scrub: 1.2,
                            toggleActions: 'play play play play'
                        }
                    }
                )
            });
        }

        function animatedCount() {
            const elementsWithCounterEffect = gsap.utils.toArray(".transition-count");

            const floatNum = (val, decimals, dec_point, thousands_sep) => {
                dec_point = typeof dec_point !== 'undefined' ? dec_point : '.';
                thousands_sep = typeof thousands_sep !== 'undefined' ? thousands_sep : ',';

                const parts = val.toFixed(decimals).split('.');
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_sep);

                var summary = parts.join(dec_point);
                return parseFloat(summary).toFixed(1);
            }

            const wholeNum = (val) => {
                const parts = val.toString().split(".");
                return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }

            elementsWithCounterEffect.forEach((el) => {
                const self = $(el);
                const originalText = self.find(".original");
                const targetText = self.find(".target");
                const targetValue = parseFloat(targetText.text().replace(/,/g, ''));

                let counter = { val: 0 };

                if (Number.isInteger(targetValue)) {
                    gsap.to(counter, {
                        duration: 1.4,
                        val: targetValue,
                        onUpdate: function () {
                            targetText.text(wholeNum(counter.val));
                        },
                        ease: Power3.easeOut,
                        scrollTrigger: {
                            trigger: el,
                            ...stInstance.vars,
                        },
                    });
                } else {
                    gsap.to(counter, {
                        duration: 1.4,
                        val: targetValue,
                        onUpdate: function () {
                            targetText.text(floatNum(counter.val, 2));
                        },
                        ease: Power3.easeOut,
                        scrollTrigger: {
                            trigger: el,
                            ...stInstance.vars,
                        },
                    });
                }
            });
        }

        animatedTextFill();
        animatedCount();
    };
    
    Animation.prototype.skeletonLoading = function (parent = "") {
        const skeleton = $('.skeleton');
        const skeletonImg = $('.skeleton-image');
        if (!skeleton.length) return;

        setTimeout(function(e) {
            skeletonImg.removeClass('skeleton-image');
            skeleton.removeClass('skeleton-text__body');
            skeleton.removeClass('skeleton-text');
            skeleton.removeClass('skeleton');
        }, 300);
    };

    Animation.prototype.headerAnim = function (parent = "") {

        const transitionSplit = $('.transition-splitting');
        if (!transitionSplit.length) return;
        
        ScrollTrigger.create({
            trigger: ".transition-splitting",
            start: "top 50%",
            once: true,
            onEnter: () => {
                const headline = $('.headline');
                const tagline = $('.tagline');

                setTimeout(function() {
                    transitionSplit.addClass('active');   
                }, 100);

                const resultsHeadline = Splitting({ target: headline, by: 'lines' });
                const resultsTagline = Splitting({ target: tagline, by: 'lines' });                
                
                setTimeout(function() {  
                    resultsHeadline && resultsHeadline[0] && resultsHeadline[0].lines.forEach((line, index) => {           
                        gsap.from(line, {
                            opacity: 0,
                            yPercent: 100, // Example: animate from below
                            //ease: "back.in",
                            delay: index * 0.05 // Delay based on line index
                        });      
                    });     
                }, 300);

                setTimeout(function() {                          
                    resultsTagline && resultsTagline[0] && resultsTagline[0].lines.forEach((line, index) => {
                        line.forEach((word) => {
                            gsap.from(word, { opacity: 0, delay: index /  4 });
                        })
                    });        
                 }, 600);                
            }
        });
    };

    Animation.prototype.bgAnim = function(parent = "") {        

        const revealContainers = document.querySelectorAll(".reveal");
        if (!revealContainers.length) return;

        revealContainers.forEach((container) => {
            let clipPath;

            // Left to right
            if (container.classList.contains("reveal--left")) {
                clipPath = "inset(0 0 0 100%)";
            }
            // Right to left
            if (container.classList.contains("reveal--right")) {
                clipPath = "inset(0 100% 0 0)";
            }
            // Top to bottom
            if (container.classList.contains("reveal--top")) {
                clipPath = "inset(0 0 100% 0)";
            }
            // Bottom to top
            if (container.classList.contains("reveal--bottom")) {
                clipPath = "inset(100% 0 0 0)";
            }

            const image = container.querySelector("img");

            
            ScrollTrigger.create({
                trigger: container,
                start: "top 100%",
                once: true,
                onEnter: () => {
                    // Animation trigger
                    const tl = gsap.timeline();

                    //const tl = gsap.timeline();

                    // Animation timeline
                    tl.set(container, { autoAlpha: 1 });
                    tl.from(container, {
                        clipPath,
                        duration: 3,
                        delay: 0.5,
                        ease: Power4.easeInOut
                    });

                    tl.from(image, {
                        //scale: 1.3,
                        duration: 1.2,
                        delay: -1,
                        ease: Power2.easeOut
                    });
                }
            });
        });
        
        ScrollTrigger.refresh();
    }

    app.Animation = Animation;

    app.ready(function () {
        // console.log("Animation ->");
        Animation.prototype.init();
    });
})(window.app);
