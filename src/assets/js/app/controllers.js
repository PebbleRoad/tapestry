/**
 * Tapestry Controllers
 */

angular.module('tapestry.controllers', [])

    .controller('headerController', ['$scope', 'isMobile', '$rootScope', '$filter', function($scope, isMobile, $rootScope, $filter){

        var $html = angular.element('html')
        
        /**
         * Main Section
         */                

        $scope.$on('sectionChange', function(scope, section, name){

            /* Main Section : elements or components */
            $rootScope.rootSection = name? $filter('anchor')(name): '';
                
            /* Section title : Page elements */

            $rootScope.section = section                        

            /* Section slug : page-elements */

            $rootScope.sectionSlug = $filter('anchor')(section)


        })

        /**
         * Menu Toggle
         */
        
        $scope.toggleMenu = function($event){

            $event.stopPropagation()
            
            $html.toggleClass('menu__opened');

        }

        /**
         * Close menu when clicked outside
         */
        
        $html.bind('click', function(){

            $html.removeClass('menu__opened');

        })

        /**
         * Stop propagation in menu
         */
        
        document.getElementsByClassName('tapestry-menu')[0].addEventListener('click', function(e){
            e.stopPropagation()
        })


    }])

    .controller('listingController', [
        '$scope', 
        '$http', 
        '$routeParams', 
        '$location',
        '$rootScope',
        '$anchorScroll',
        '$timeout',
        '$interval',
        '$filter',
        '$route'
        , function($scope, $http, $routeParams, $location, $rootScope, $anchorScroll, $timeout, $interval, $filter, $route){

        
        var section = $location.$$path.split('/')[1],
            element = $routeParams.slug            


        $rootScope.$watch('styles', function(newValue){

            if(newValue){
                angular.forEach($rootScope.styles, function(value, key){
            
                    if(value.slug == section){

                        angular.forEach(value.data, function(v, k){

                            if(v.name.replace(/\s+/g, '-').toLowerCase() == element){
                                
                                $scope.patterns = value.data[k]
                                
                                /* Change to new section */

                                $rootScope.$broadcast('sectionChange', v.name, value.name)   
                            }

                        })
                    }

                });
            }

        })
        

        /**
         * Anchor
         */
        
        $scope.anchor = function(name){

            return $filter('anchor')(name)
        }
        
        /**
         * Prevent route change         
         */
        var lastRoute = $route.current;

        $scope.$on('$locationChangeSuccess', function(event) {

            if ($route && $route.current && $route.current.$$route.templateUrl.indexOf('listing') > 0) {
                //$route.current = lastRoute; //Does the actual prevention of routing
            }
        });

        /**
         * Sub menu click event
         */
        var $menu = angular.element('.tapestry-menu-side').on('click', 'a', function(e){

                var id = $(this).data('target'),
                    href = this.hash,
                    top = $(id).position().top

                $menu.find('a').removeClass('active')

                $(this).addClass('active')

                //window.location.hash = href

                $scope.scrollTo(top)

                e.preventDefault();
            
        })
    


        /**
         * Scroll to Wrapper
         */
        
        $scope.scrollTo = function(to){

            $('html, body').animate({
                scrollTop: to
            }, 200);

        }

        

        /**
         * Scroll to the section
         */
        
        angular.element('body').unbind('tapestry.completed.scrollspy');
        
        if($routeParams.section){

            $rootScope.subSection = $routeParams.section;

            var checkIdExists = $interval(function(){

                var anchor = $('#'+$routeParams.section)

                if(anchor.length){

                    $interval.cancel(checkIdExists)

                    var top = anchor.length? anchor.position().top : 0,
                        headerHeight = $('.tapestry-header').outerHeight()

                    /**
                     * Scroll to the section                 
                     */
                    angular.element('body').bind('tapestry.completed.scrollspy', function(){
                        
                        var top = anchor.length? anchor.position().top : 0,
                        headerHeight = $('.tapestry-header').outerHeight()

                        $scope.scrollTo(top - headerHeight + 80)

                        
                    })
                    
                    
                }


            }, 150)

            
            
        }else{

            $scope.scrollTo(0)

        }


        /**
         * Destroy interval when scope is destroyed
         */

        $scope.$on('destroy', function(){
            $timeout.cancel(checkIdExists)
        })

    }])

    .controller('templateController', ['$scope', '$rootScope', '$location', '$routeParams', function($scope, $rootScope, $location, $routeParams){

        var section = $location.$$path.split('/')[1],
            element = $routeParams.slug


        angular.forEach($rootScope.styles, function(value, key){
            
            if(value.slug == section){

                angular.forEach(value.data, function(v, k){

                    if(v.name.replace(/\s+/g, '-').toLowerCase() == element){
                        
                        $scope.templates = value.data[k]
                        
                        /* Change to new section */

                        $rootScope.$broadcast('sectionChange', v.name, value.name)   
                    }

                })
            }

        });

        //console.log($scope.templates)
        
    }])
;
