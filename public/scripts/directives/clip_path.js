define([
    './module'
], function (module) {
    'use strict';
    
    module.directive('clipPath', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$on('$locationChangeSuccess', function () {
                    // Substitute url(#ID) with url(URL#ID)
                    updateAttributes();
                });
                
                // Update on load
                updateAttributes();
                
                function updateAttributes() {
                    var location = window.location.origin + window.location.pathname;
                    attrs.$set('clipPath', attrs.clipPath.replace(/url\([^#]*#([^)]+)\)/i, 'url(' + location + '#$1)'));
                }
            }
        };
    });
});