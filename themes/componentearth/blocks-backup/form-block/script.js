typeof app !== 'undefined' && app.ready(() => {
    var $ = jQuery.noConflict();

    const script = () => {
        const els = $("section.form-block");
        if (!els.length) return;

        els.each(function () {
            const self = $(this);
            /* Add your logic here */
            if (self.hasClass("looping-infinite-logos")) {
                loopingLogos(self);
            }
        });
    }

    const loopingLogos = (self) => {
        const wrapper = self.find(".logo-groups");
        const groups = wrapper.find(".logo-group");
        if (!groups.length) return;

        const firstGroup = groups.first().clone();
        wrapper.append(firstGroup);

        const checkImagesLoaded = () => {
            const imgs = wrapper.find("img");
            let loaded = 0;
            imgs.each(function () {
                if (this.complete) loaded++;
                else $(this).one("load", () => {
                    loaded++;
                    if (loaded === imgs.length) initLoop();
                });
            });
            if (loaded === imgs.length) initLoop();
        };

        const initLoop = () => {
            const totalWidth = groups.first().outerWidth(true);

            const tween = gsap.to(wrapper, {
                x: -totalWidth,
                duration: 50,
                ease: "none",
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize(x => parseFloat(x) % -totalWidth)
                },
                paused: true,
            });

            ScrollTrigger.create({
                trigger: self,
                start: "top 90%",
                end: "bottom top",
                onEnter: () => tween.play(),
                onEnterBack: () => tween.play(),
                onLeave: () => tween.pause(),
                onLeaveBack: () => tween.pause()
            });

            // Restart on resize to keep alignment
            window.addEventListener("resize", () => {
                gsap.set(wrapper, { x: 0 });
                tween.invalidate().restart(true).pause();
            });
        };

        checkImagesLoaded();
    };

    script();
});
