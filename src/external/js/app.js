(function($, window, undefined){

    FastClick.attach(document.body);


    $('body').bind('tapestry.completed', function(){


        /**
         * Initialize Select replacement
         */
        
        $('.js-selecter').selecter()

        /* fancybox */

        $(".fancybox").fancybox({
            padding: [30, 15, 15, 15],
            minWidth: 200        
        });

        /**
         * Dropzone
         */
        
        Dropzone.options.dictDefaultMessage == "asdas";


        /**
         * Tooltip
         */
        
        $('[data-tooltip], [rel*="tooltip"]').each(function(){
            
            var event = $(this).data('tooltip-event') || 'hover'

            $(this).tipsy({
                trigger: event,
                gravity: 'w',
                opacity: 1
            })
        })


        /**
         * Slider
         */
        
        $('.js-slider, [data-component="slider"]').each(function(){
            $(this).slider();
        });


        /**
         * Carousel
         * Docs : http://owlgraphic.com/owlcarousel
         */
        
        
        $('.ui-carousel, [data-component="carousel"]').owlCarousel({
     
            navigation : true, // Show next and prev buttons
            slideSpeed : 300,
            paginationSpeed : 400,
            singleItem:true

            // "singleItem:true" is a shortcut for:
            // items : 1, 
            // itemsDesktop : false,
            // itemsDesktopSmall : false,
            // itemsTablet: false,
            // itemsMobile : false
     
      });

        //$('.ui-tabs, [data-component="tabs"]').tabber()


        /**
         * Datepicker
         */
            
        
        $('.js-datepicker, .js-datepicker-inline, .js-daterange').datepicker({
            format: "dd/mm/yyyy",        
            autoclose: true,
            todayBtn: "linked"
        });


        /**
         * colorbox
         */
        
        //$('[rel*=colorbox]').boxer()
        
        var countries = [
           { value: 'Andorra', data: 'AD' },       
           { value: 'Zimbabwe', data: 'ZZ' }
        ];

        $('.js-autocomplete').autocomplete({
            lookup: countries
        })

        $('.ui-accordion').accordion();

        $('.ui-tabs, [data-component="ui-tabs"]').tabs();

        $('[data-toggle]').dropdown();

        //$('.tapestry-menu-side').scrollspy();
        
        var $menu = $('.tapestry-menu-side a')
        
        

    });

    
})(jQuery, window)