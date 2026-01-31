typeof app !== 'undefined' && app.ready(() => {
    var $ = jQuery.noConflict();

    const script = () => {
        const els = $("section.animated-text");
        if (!els.length) return;

        els.each(function () {
            const self = $(this);
            /* Add your logic here */
            function animatedTextFill() {
                const splitTypes = document.querySelectorAll('.transition-text-fill');
                if (!splitTypes.length) return;

                splitTypes.forEach((char, i) => {
                    const bg = char.dataset.bgColor
                    const fg = char.dataset.fgColor

                    const text = new SplitType(char, { types: 'words' })

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
                                start: 'top 80%',
                                end: 'top 20%',
                                scrub: 1.2,
                                toggleActions: 'play play reverse reverse'
                            }
                        })
                });
            }

            animatedTextFill();
        });
    }

    script();
});
