(function (app) {
    "use strict";
    var $ = jQuery.noConflict();
    var Global = function () { };

    Global.prototype.init = function () {
        Global.prototype.handleDownloadLinks();
    };

    Global.prototype.refreshScrollTriggers = function () {
        const triggers = ScrollTrigger.getAll();

        triggers.forEach((trigger) => {
            if (trigger.vars.id == 'nav-bg-scroll' || trigger.vars.id == 'nav-bg-hide') return;
            trigger.refresh(true);
        });
    };
    
    Global.prototype.handleDownloadLinks = function () {
        const links = $(`a[href^="download:"]`);
        if (!links.length) return;

        links.each(function () {
            const self = $(this);
            const href = self.attr('href');
            self.attr('href', href.replace('download:', ''));
            self.attr('download', '');
        });
    };

    Global.prototype.updateSelectClass = function (target) {
        const parent = target.selectmenu("menuWidget");
        parent.find(".selected").removeClass("selected");
        
        const activeItem = parent.find(".ui-state-active");
        activeItem.addClass("selected");
    };

    app.Global = Global;

    app.ready(function () {
        // console.log("Global ->");
        Global.prototype.init();
    });
})(window.app);
