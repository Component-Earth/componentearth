baunfire.addModule({
    init(baunfire) {
        const $ = baunfire.$;

        const script = () => {
            const els = $("section.tabbed-content");
            if (!els.length) return;

            els.each(function () {
                const self = $(this);
                /* Add your logic here */               

                
                function switchTab(tabId) {
                    // Hide all panes and deactivate all buttons

                    $('.tab-pane').removeClass('active');
                    $('.tab-btn').removeClass('active');
                    
                    // Show the selected pane and activate the clicked button
                    $('.tab-btn[data-tab=' + tabId + ']').addClass('active');    
                    $('.tab-pane[data-tab=' + tabId + ']').addClass('active');
                }

                $('.tab-btn').click(function(e) {
                    switchTab($(this).data('tab'));
                });

                $('.design-card__meta__cta').click(function(e) {
                    var dataID = $(this).data('id');
                    
                    $('#main-content').html();
                });                  

            });
        }

        script();
    }
});
