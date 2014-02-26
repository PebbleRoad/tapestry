/**
 * Plugin Name: Dropdown
 * Author : Vinay@PebbleRoad
 * Date: 18/02/2014
 * Description: Creates a tab out of the following markup
 * Markup: 
 */

;(function($, window, undefined){

    var defaults = {
        
        collapse: true

    };


    /**
     * Constructor
     */
    
    function Accordion(el, options){

        var self = this

        this.el = el

        this.$el = $(el)

        /* Options */

        this.options = $.extend({}, defaults, options)


        /* Content */

        this.$content = this.$el.find('.accordion__content')


        /* Headers */

        this.$headers = this.$el.find('.accordion__header')


        /**
         * Click Handler
         */
        
        this.$el.on('click', '.accordion__header', function(e){

            var $this = $(this)

            if(self.options.collapse) {

                self.$content.slideUp()

                self.$headers.not($this).removeClass('accordion__active')

            }
            

            $this
                .next()
                .stop()
                .slideToggle()
                .end()
                .toggleClass('accordion__active')            

            e.preventDefault()
        })

        

        
    }


    /**
     * Registers the plugin
     */
    
    $.fn.extend({

        accordion: function(options){

            return this.each(function(){

                var $this = $(this),
                    accordion = $this.data('accordion')


                if(!accordion) $this.data('accordion', new Accordion(this, options))

            })
        }

    });


    /**
     * Initialize the plugin
     */
    $(window).load(function(){

        $('.ui-accordion').accordion();

    });



})(jQuery, window);