typeof app !== 'undefined' && app.ready(() => {
    const $ = jQuery.noConflict();
  
    const script = () => {
        const els = $("section.hero-banner-full");
        if (!els.length) return;
    
        els.each(function () {
            const self = $(this);
            const mainTitle = self.find(".main-title");
            const paraDesc = self.find(".para-desc");
    
            app.Animation.prototype.headingAnimation(mainTitle, {
                trigger: self,
                start: "top 60%",
            }, {
                onStart: () => {
                    const tl = gsap.timeline();
        
                    if (paraDesc.length) {
                        tl.fromTo(paraDesc, { autoAlpha: 0, y: 30 }, {
                            autoAlpha: 1,
                            y: 0,
                            delay: 0.2,
                            duration: 0.6,
                            ease: Power2.easeOut,
                        });
                    }
                }
            });

            (function($){
                $.fn.extend({ 
                    rotaterator: function(options) {
             
                        var defaults = {
                            fadeSpeed: 500,
                            pauseSpeed: 100,
                            child:null
                        };
                         
                        var options = $.extend(defaults, options);
                     
                        return this.each(function() {
                            var o =options;
                            var obj = $(this);                
                            var items = $(obj.children(), obj);
                            // items.each(function() {
                            //     $(this).hide();
                            // });
                            if(!o.child) {
                                var next = $(obj).children(':first');
                            } else {
                                var next = o.child;
                            }

                            $(next).show().addClass('active');
                            var container = $('.rotating-words-wrapper__inner');
                            var containerWidth = container.width();
                            container.css({'width': $(next).width()});
                            if($(next).hasClass('active')) {
                                //$(next).css({'width': $(next).width(), 'left' : (containerWidth - $(next).width()) / 2 });
                                //$(next).css({'width': $(next).width() });
                                $(next).css({ 'height': $(next).height() });
                                container.css({'height': $(next).height() + 20 });

                            }

                            $(next).delay(o.pauseSpeed).fadeOut(o.fadeSpeed, function() {
                                var next = $(this).next();
                                if (next.length == 0){
                                    next = $(obj).children(':first');
                                }
                                $(obj).rotaterator({child : next, fadeSpeed : o.fadeSpeed, pauseSpeed : o.pauseSpeed});
                            });
                        
                        });
                    }
                });
            })(jQuery);
            
             $(document).ready(function() {
                $('#rotate').rotaterator({fadeSpeed:2000, pauseSpeed:300});
             });
        });
    };
  
    script();
});
