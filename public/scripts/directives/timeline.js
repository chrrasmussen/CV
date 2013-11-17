define([
    './module',
    './test'
], function (module, Timeline) {
    'use strict';
    
    module.directive('timeline', function($compile) {
        return {
            restrict: 'E',
            scope: {
                startAt: '@',
                endAt: '@',
                data: '=',
                click: '&'
            },
            replace: true,
            template: '<div class="timeline"></div>',
            compile: function (tElement, tAttrs) {
                
                
                return function(scope, element, attrs) {
                    var timeline = new Timeline({
                        timelineStartAt: tAttrs.startAt,
                        timelineEndAt: tAttrs.endAt,
                        headerRowSize: 30,
                        verticalMargin: 10,
                        lengthPerMonth: 35,
                        heightPerLane: 56,
                        heightPerEvent: 40,
                        monthSeparatorHeight: 5,
                        markerHeight: 5,
                        animationDuration: 200
                    }, scope.data, function (eventID) {
                        scope.$apply(function () {
                            scope.click({ eventID: eventID });
                        });
                    });
                    
                    var timelineNode = timeline.getNode();
                    tElement.append(timelineNode);
                    var compiled = $compile(timelineNode);
                    compiled(scope);
                        
                    timeline.setClickHandler(function (eventID) {
                        scope.$apply(function () {
                            scope.click({ eventID: eventID });
                        });
                    });
                    
                    scope.$watch('data', function () {
                        if (scope.data.length === 0) {
                            return;
                        }
                        
                        timeline.setData(scope.data);
                    });
                };
            }
        };
    });
    
    module.directive('clipPath', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$on('$locationChangeSuccess', function () {
                    // Substitute url(#ID) with url(URL#ID)
                    attrs.$set('clipPath', attrs.clipPath.replace(/url\([^#]*#([^)]+)\)/i, 'url(' + window.location + '#$1)'));
                });
            }
        };
    });
});