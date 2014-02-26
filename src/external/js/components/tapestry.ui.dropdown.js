/**
 * Plugin Name: Dropdown
 * Author : Vinay@PebbleRoad
 * Date: 18/02/2014
 * Description: Creates a tab out of the following markup
 * Markup: 
 */

;(function($, window, undefined){

    var defaults = {
        
        

    };


    /**
     * Constructor
     */
    
    function Dropdown(el, options){

        var self = this

        this.el = el

        this.$el = $(el)


        /**
         * Click Handler
         */
        
        this.$el.on('click', function(e){

            var $parent = self.$el.parent(),
                $others = $('[data-toggle="dropdown"]').parent().not($parent)

            $others.removeClass('dropdown-active')            

            $parent.toggleClass('dropdown-active')

            e.preventDefault()

            e.stopPropagation()
        });


        /**
         * Hide dropdown on body click
         */
        
        $('html').click(function(e){

            $('[data-toggle="dropdown"]').parent().removeClass('dropdown-active');
            
        })

        $('.ui-dropdown').click(function(e){
            
            e.stopPropagation()

        })

        
    }


    /**
     * Registers the plugin
     */
    
    $.fn.extend({

        dropdown: function(options){

            return this.each(function(){

                var $this = $(this),
                    dropdown = $this.data('dropdown')


                if(!dropdown) $this.data('dropdown', new Dropdown(this, options))

            })
        }

    });


    /**
     * Initialize the plugin
     */
    $(window).load(function(){

        $('[data-toggle]').dropdown();

    });



})(jQuery, window);