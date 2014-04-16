'use strict';

/**
 * Configuration
 */

var version = '1.0.0',
    lastUpdated = '26 Feb 2014';


/* jsonPath of the files will be inserted by gulp-script-inject after reading /src/json folder */

/**
 * Tapestry Module
 */

angular.module('tapestry', [
    'tapestry.services', 
    'tapestry.controllers', 
    'tapestry.directives', 
    'tapestry.filters', 
    'ngRoute',
    'once'

    ])

    .value('version', version)
    
    .value('lastUpdated', lastUpdated)
    
    .value('isMobile', /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test( (navigator.userAgent||navigator.vendor||window.opera))) 
   
    /**
     * Router provider
     * @param  {[type]} $routeProvider [description]     
     */
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        
        //$locationProvider.hashPrefix('!');

        /* Homepage */

        $routeProvider.when('/', {
            title: 'Overview',
            templateUrl: 'assets/js/templates/home.html',
            controller: 'headerController'

        })

        /* Homepage */

        $routeProvider.when('/changelog', {
            title: 'Changelog',
            templateUrl: 'assets/js/templates/changelog.html',
            controller: 'headerController'            

        })

        /* All other routes */

        $routeProvider.otherwise({redirectTo: '/'})

        
        /* Add new routes based on the Configuration */

        angular.forEach(jsonPath, function(value, key){

            value.slug = value.name.replace(/\s+/g, '-').toLowerCase()

            if(value.slug == "templates"){

                $routeProvider.when('/' + value.slug + '/:slug', {
                    templateUrl: 'assets/js/templates/listing-template.html',
                    controller: 'templateController'
                })

            }else{

                $routeProvider.when('/' + value.slug + '/:slug', {
                    templateUrl: 'assets/js/templates/listing.html',
                    controller: 'listingController'
                })

                $routeProvider.when('/' + value.slug + '/:slug/:section', {
                    templateUrl: 'assets/js/templates/listing.html',
                    controller: 'listingController'
                })
            }

        })
        

    }])

    /**
     * Runs once the app is initialized
     * @param  {[type]} $rootScope   [description]
     * @param  {[type]} $http        [description]     
     * @return {[type]}              [description]
     */
    .run(['$rootScope', '$http', '$q', '$filter', 
        '$cacheFactory', function($rootScope, $http, $q, $filter, $cacheFactory){

        $rootScope.styles = [];

        /**
         * Cachefactory
         */
        
        var cache = $cacheFactory.get('cache')

        /**
         * Change Title on routeChange         
         */
        
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {            
            
            if(current.$$route && current.$$route.title){

                $rootScope.$broadcast('sectionChange', current.$$route.title)

            }

        });

        /**
         * Assign values to rootScope
         */
        
        var requests = [],
            names = [],
            slug = []

        angular.forEach(jsonPath, function(value , key){
            
            /* Add Pattern name in array */

            names.push(value.name)

            slug.push(value.slug)

            /* Add requests in to array for $q */

            requests.push($http.get(value.path, {cache: cache}))
            
        })

        /**
         * When all requests are completed
         */

        
         
        $q.all(requests).then(function(response){
            
            angular.forEach(response, function(r, i){

                var parseObject = r.data;

                /**
                 * Create a Slug from the title
                 * Reduces $watch on filter {{element.name | anchor}}
                 */
                angular.forEach(parseObject, function(value, key){
                     value.slug = $filter('anchor')(value.name)
                })

                /**
                 * Push to rootScope
                 */

                $rootScope.styles.push({
                    name: names[i],
                    slug: slug[i],
                    data: parseObject
                })

            })
        })


        /**
         * Watch changes and add to Autocomplete
         */
        
        

        $rootScope.$watch('styles', function(newValue){
            
            if(newValue.length){

                /**
                 * Creates a flattened version of the array
                 */

                var autoCompleteArray = []

                angular.forEach(newValue, function(value, index){
                    
                    autoCompleteArray.push(flattener(value.data, value.name, value.slug))

                })

                /**
                 * Combines Arrays
                 */
                
                var data = autoCompleteArray.reduce(function(a, b, index, array){
                    return a.concat(b);
                })
                                
                /**
                 * Invokes autocomplete
                 */

                window.$autocomplete = $('.js-pattern-search').autocomplete({
                    
                    lookup: data,

                    onSelect: function(value){
                        //console.log(value)
                        window.location.hash = value.url

                    },

                    formatResult: function (suggestion, currentValue) {
                        var reEscape = new RegExp('(\\' + ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'].join('|\\') + ')', 'g'),
                            pattern = '(' + currentValue.replace(reEscape, '\\$1') + ')';

                        return suggestion.value.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>') + 
                        '<span class="ac__desc">'+ suggestion.category + ' &rarr; ' + suggestion.root+'</span>';
                    }
                })


                /**
                 * hide Menu
                 */
                
                setTimeout(function(){
                    angular.element('html').removeClass('menu__opened');
                }, 2000)

            }

        }, true)


        
        /**
         * Fix position of autocomplete on scroll
         */
        angular.element(window).bind('scroll resize', function(){

            $autocomplete && $autocomplete.autocomplete('fixPosition')

        });


        
        

    }])

;


/**
 * Flattening Array
 * @param  {Object} 
 * @return {Object} Flattened array
 */
function flattener(arrr, template, category){

    var a = []

    var flattenArray = function(arr, parent){

        for(var i = 0; i< arr.length; i++){

            //console.log(parent)
            
            var parent = parent? parent: '',
                root = parent.replace(/\s+/g, '-').toLowerCase(),
                slug = arr[i].name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/\s+/g, '-').toLowerCase()

            a.push({
                value: arr[i].name,
                slug: slug,
                root: root,
                template: arr[i].template? arr[i].template: null,
                url: '/' + category + '/' + (root? root : slug) + (slug != root && root? '/' + slug : '') ,
                category: category
            })

            
            if(arr[i].children && typeof arr[i].children == 'object'){                

                var p = parent? parent : arr[i].name
                
                flattenArray(arr[i].children, p)
                
            }
        }

        return a
    
    }

    return flattenArray(arrr)
};
