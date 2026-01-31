typeof app !== 'undefined' && app.ready(() => {
    var $ = jQuery.noConflict();

    const script = () => {
        const els = $("section.single-assets");
        if (!els.length) return;

        els.each(function () {
            const self = $(this);
            const video = self.find('.video-container');

            if (video.length > 0) {
                const lightbox = GLightbox({
                    touchNavigation: true,
                    loop: false,
                    autoplayVideos: true
                });

                var videoURL = video.data('video-src');
                const options = {
                    url: videoURL,
                    width: 640,
                    loop: false,
                    autoplay: false,
                    title: 0,
                    sidedock: 0,
                    controls: 0
                };

                const player = new Vimeo.Player('video', options);

                player.setVolume(0);

                // Trigger a function when a slide is removed
                // lightbox.on('close', (index) => {
                // // index is the position of the element in the gallery
                //     player.play();
                // }); 
            }
        });
    }

    script();
});

