baunfire.addModule({
    init(baunfire) {
        const $ = baunfire.$;

        const script = () => {
            const els = $("section.hero-banner-title");
            if (!els.length) return;
        
            els.each(function () {
                const self = $(this);

            });
        }

        script();   
    }     
});