typeof app !== 'undefined' && app.ready(() => {
    var $ = jQuery.noConflict();

    const script = () => {
        const els = $("section.faqs");
        if (!els.length) return;

        els.each(function () {
            const self = $(this);
            
        });
    }
    
    script();
});
