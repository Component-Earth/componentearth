baunfire.addModule({
    init(baunfire) {
        const $ = baunfire.$;

        const script = () => {
            const els = $("section.filter-block");
            if (!els.length) return;

            els.each(function () {
                const self = $(this);
                /* Add your logic here */

                const filterDropdown = $('#filter-category a');
                const filterDropdown2 = $('#filter-industry a');
                const cards = $('.card');


                filterDropdown.click(function(e) {
                    e.preventDefault();
                    const selectedValue = $(this).data('value');

                    cards.each(function(e) {
                        // Get the ID from the data attribute
                        const card =  $(this);
                        const cardId = card.data('id');

                        // Logic: Show if 'all' is selected OR if IDs match
                        if (selectedValue === "all" || cardId === selectedValue) {
                        card.removeClass('hidden');
                        } else {
                        card.addClass('hidden');
                        }
                    });
                });

                filterDropdown2.click(function(e) {
                    e.preventDefault();
                    const selectedValue = $(this).data('value');

                    cards.each(function(e) {
                        // Get the ID from the data attribute
                        const card =  $(this);
                        const cardId = card.data('id');

                        // Logic: Show if 'all' is selected OR if IDs match
                        if (selectedValue === "all" || cardId === selectedValue) {
                        card.removeClass('hidden');
                        } else {
                        card.addClass('hidden');
                        }
                    });
                });
            });
        }

        script();
    }
});
