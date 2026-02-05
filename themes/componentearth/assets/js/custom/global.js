(function () {
    const $ = baunfire.$;

    baunfire.Global = {
        init() {
            this.handleSpecialLinks();
        },

        handleSpecialLinks() {
            const download = () => {
                const links = $(`a[href^="download:"]`);
                if (!links.length) return;

                links.each(function () {
                    const self = $(this);
                    const href = self.attr('href');
                    self.attr('href', href.replace('download:', ''));
                    self.attr('download', '');
                });
            }

            download();
        },

        refreshScrollTriggers() {
            const triggers = ScrollTrigger.getAll();

            triggers.forEach((trigger) => {
                if (trigger.vars.id == 'nav-bg-scroll' || trigger.vars.id == 'nav-bg-hide') return;
                trigger.refresh(true);
            });
        }
    };

    baunfire.addModule(baunfire.Global);
})();
