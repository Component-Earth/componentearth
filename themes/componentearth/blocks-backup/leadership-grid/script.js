typeof app !== 'undefined' && app.ready(() => {
    var $ = jQuery.noConflict();

    const script = () => {
        const els = $("section.leadership-grid");
        if (!els.length) return;

        els.each(function () {
            const self = $(this);
            // const scroller = new LocomotiveScroll({
            //     el: document.querySelector("[data-scroll-container]"),
            //     smooth: true,
            // });
            // // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
            // scroller.on("scroll", ScrollTrigger.update);

        });
    }
    
    script();
});
