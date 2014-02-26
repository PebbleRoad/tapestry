/**
 * Plugin Name: Tabs
 * Author : Vinay@PebbleRoad
 * Date: 18/02/2014
 * Description: Creates a tab out of the following markup
 * Markup: 
 */

;(function($, window, undefined){

    var defaults = {
        
        handleClass: '.tab__handle',
        tabClass : '.tab'
        

    };


    /**
     * Constructor
     */
    
    function Tabs(el, options){

        var self = this

        this.el = el

        this.$el = $(el)


        /* Options */

        this.options = $.extend({}, defaults, options)


        /* Tab container */

        this.$tabcontainer = this.$el.find(this.options.tabClass)

        /* Tab handles */

        this.$handle = this.$el.find(this.options.handleClass)

        
        /**
         * Check if there is an active tab
         */
        
        var currentActive = this.$el.children('.active')

        /* Active Index */

        this.activeIndex = currentActive.length ? currentActive.prevAll().length : 0;

        /**
         * Hide all the Tabs Except the first
         */
        

         this.$tabcontainer            
            .hide()
            .eq(this.activeIndex)
            .show()


        /**
         * Build a fake tab for mobile
         */
        
        this._mobile();


        /**
         * Initialize Click handler
         */
        
        this.$el.on('click', this.options.handleClass + ', .tab__handle--mobile', function(e){

            var $this = $(this),
                href = $this.children('a').attr("href"),
                index = $this.data('index') != null?  $this.data('index') : $this.prevAll().length
            
            
            $this
                .addClass('active')
                .siblings()
                .removeClass('active')

            
            
            self.
                $el.find('.tab__handle--mobile')
                .removeClass('active').eq(index).addClass('active')


            /* Show the relevant tab */

            self.$tabcontainer
                .hide()
                .eq(index)
                .show()

            e.preventDefault()
        })
    }


    /**
     * build for mobile
     */
    
    Tabs.prototype._mobile = function(){


        var self = this

        this.$tabcontainer.each(function(index, e){
            
            var $this = $(this)

            $('<span class="tab__handle--mobile" data-index="'+index+'">' + self.$handle.eq(index).text() + '</span>').insertBefore($this)

        });

        this.$el.find('.tab__handle--mobile').eq(this.activeIndex).addClass('active')
    }

    /**
     * Registers the plugin
     */
    
    $.fn.extend({

        tabs: function(options){

            return this.each(function(){

                var $this = $(this),
                    tabs = $this.data('tabs')


                if(!tabs) $this.data('tabs', new Tabs(this, options))

            })
        }

    });


    /**
     * Initialize the plugin
     */
    $(window).load(function(){

        $('.ui-tabs, [data-component="ui-tabs"]').tabs();

    });



})(jQuery, window);