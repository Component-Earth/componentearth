typeof app !== 'undefined' && app.ready(() => {
    var $ = jQuery.noConflict();

    const script = () => {
        const els = $("section.testimonials");
        if (!els.length) return;

        els.each(function () {
            const self = $(this);
            
            // $(window).on('scroll', function() {
            //     var windowScrollTop = $(window).scrollTop();
              
            //     var fullDivHeight = self.outerHeight();
            //     var divHeight = fullDivHeight / 4;
            //     var divOffsetTop = self.offset().top - divHeight;

            //     //if (windowScrollTop >= (divOffsetTop + divHeight)) {
            //     if (windowScrollTop > divOffsetTop && windowScrollTop < (divOffsetTop + divHeight)) {
            //         self.find('.inner').addClass('inner__sticky');
            //         self.find('.inner__content').addClass('inner__addTop');
            //     } 
                
            //     if (windowScrollTop < (divOffsetTop * 2.75) || windowScrollTop > (divOffsetTop + (divHeight * 2.75))) {
            //         self.find('.inner').removeClass('inner__sticky');
            //         self.find('.inner__content').removeClass('inner__addTop');
            //     } else {
            //         self.find('.inner').addClass('inner__sticky');
            //         self.find('.inner__content').addClass('inner__addTop');
            //     }
            // });
        });
    }
    
    script();
});
