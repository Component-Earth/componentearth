typeof app !== 'undefined' && app.ready(() => {
    var $ = jQuery.noConflict();

    const script = () => {
        const els = $("section.single-quote-text");
        if (!els.length) return;

        els.each(function () {
            const self = $(this);
            /* Add your logic here */
        });
    }

    script();
});
