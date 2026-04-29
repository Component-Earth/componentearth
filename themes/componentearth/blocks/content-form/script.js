baunfire.addModule({
    init(baunfire) {
        const $ = baunfire.$;

        const script = () => {
            const els = $("section.content-form");
            if (!els.length) return;

            els.each(function () {
                const self = $(this);
            });
        }

        script();
    }
});
