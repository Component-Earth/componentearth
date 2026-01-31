typeof app !== 'undefined' && app.ready(() => {
    var $ = jQuery.noConflict();

    const script = () => {
        const els = $("section.careers");
        if (!els.length) return;

        els.each(function () {
            const self = $(this);
        });
    }

    script();
});
