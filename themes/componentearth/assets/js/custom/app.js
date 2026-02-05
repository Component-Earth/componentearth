(function (w) {
    'use strict';

    const $ = jQuery.noConflict();

    const baunfire = {
        $,
        initialized: false,
        modules: [],
        init() {
            if (this.initialized) return;
            this.initialized = true;

            this.modules.forEach(mod => {
                if (typeof mod.init === 'function') {
                    mod.init(baunfire);
                }
            });
        },
        addModule(mod) {
            this.modules.push(mod);
        },
        load() {
            console.log('Baunfire loaded');
        },
        ready(callback) {
            baunfire.init();
            if (typeof callback === 'function') callback(baunfire);
        }
    };

    w.baunfire = baunfire;

})(window);