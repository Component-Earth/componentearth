baunfire.addModule({
    init(baunfire) {
        const $ = baunfire.$;

        const script = () => {
            const els = $("section.testimonials");
            if (!els.length) return;

            els.each(function () {
                const self = $(this);
                /* Add your logic here */
                var owl = $(".owl-carousel");
                owl.owlCarousel({
                    center: true,
                    items: 3.5,
                    margin: 24,
                    loop: true,
                    nav: false,
                    autoplay: true,
                    autoplayTimeout:5000,
                    autoplayHoverPause:false
                });
            });
        }

        script();
    }
});
