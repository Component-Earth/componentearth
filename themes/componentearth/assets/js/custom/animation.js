(function (){
    const $ = baunfire.$;

    let startingThreshold = 90;

    baunfire.Animation = {
        init() {
            this.handleNavMobile();
            this.bgAnim();
        },

        handleNavMobile() {
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
        },

        bgAnim(parent = "") {

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
                            duration: 2.75,
                            delay: 0.15,
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
    };

    baunfire.addModule(baunfire.Animation);
})();