typeof app !== 'undefined' && app.ready(() => {
    var $ = jQuery.noConflict();

    const script = () => {
        const els = $("section.sixty-forty");
        if (!els.length) return;

        els.each(function () {
            const self = $(this);
            
            const video = self.find('.play-video');
            if (!video.length) return;

            GLightbox({
                touchNavigation: true,
                loop: false,
                autoplayVideos: true
            });
        });
    }

    script();
});
