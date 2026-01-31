typeof app !== 'undefined' && app.ready(() => {
    var $ = jQuery.noConflict();

    const script = () => {
        const els = $("section.sixty-forty-hero");
        if (!els.length) return;

        els.each(function () {
            const self = $(this);
            /* Add your logic here */
        });
    }

    script();
});
