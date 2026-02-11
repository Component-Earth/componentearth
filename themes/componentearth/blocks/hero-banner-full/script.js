baunfire.addModule({
    init(baunfire) {
        const $ = baunfire.$;

        const script = () => {
            const els = $("section.hero-banner-full");
            if (!els.length) return;
        
            els.each(function () {
                const self = $(this);
                const mainTitle = self.find(".main-title");
                const paraDesc = self.find(".para-desc");
        
                // Animation.prototype.headingAnimation(mainTitle, {
                //     trigger: self,
                //     start: "top 60%",
                // }, {
                //     onStart: () => {
                //         const tl = gsap.timeline();
            
                //         if (paraDesc.length) {
                //             tl.fromTo(paraDesc, { autoAlpha: 0, y: 30 }, {
                //                 autoAlpha: 1,
                //                 y: 0,
                //                 delay: 0.2,
                //                 duration: 0.6,
                //                 ease: Power2.easeOut,
                //             });
                //         }
                //     }
                // });
            });
        }

        script();        
    }
});