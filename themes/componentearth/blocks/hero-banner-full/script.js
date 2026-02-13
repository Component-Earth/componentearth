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
                        

                gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.custom-nav',
                        // pin: true,
                        pinSpacing: true,
                        markers: false,
                        start: "top-=100px top", // when the top of the trigger hits the top of the viewport
                        end: "+=100", 
                        scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
                    }
                });

                tl.fromTo(
                    self.find(".custom-nav"), {
                        opacity: 1
                    },
                    {
                        opacity: 0
                    }
                );

                tl.set("#top-nav", { className: "" })
                  .set("#top-nav", { className: "top-nav-active" });


            });
        }

        script();        
    }
});