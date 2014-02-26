/**
 * Tapestry Filters
 */

angular.module('tapestry.filters', [])
    .filter('anchor', [function(){

        return function(text){

          return text.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/\s+/g, '-').toLowerCase()
          
        }

    }])
;