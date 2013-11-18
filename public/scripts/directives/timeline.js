define([
    './module',
    'snap',
    './timeline/composites/timeline',
], function (module, snap, Timeline) {
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
                    scope.$watch('data', function () {
                        if (scope.data.length === 0) {
                            return;
                        }
                        
                        var config = {
                            startAt: tAttrs.startAt,
                            endAt: tAttrs.endAt,
                            headerRowSize: 30,
                            verticalMargin: 10,
                            lengthPerMonth: 35,
                            heightPerLane: 56,
                            heightPerEvent: 40,
                            monthSeparatorHeight: 5,
                            markerHeight: 5,
                            animationDuration: 200
                        };
                        
                        var width = lengthBetweenDates(config.startAt, config.endAt, config.lengthPerMonth);
                        var height = 2 * config.verticalMargin + scope.data.length * config.heightPerLane + config.headerRowSize;
                        var paper = snap(width, height);
                        
                        var timeline = new Timeline(paper, 5000);
                        timeline.width = width;
                        timeline.height = height;
                        timeline.startAt = tAttrs.startAt;
                        timeline.endAt = tAttrs.endAt;
                        timeline.clickHandler = function (eventID) {
                            scope.$apply(function () {
                                scope.click({ eventID: eventID });
                            });
                        };
                        
                        timeline.data = scope.data;
                        timeline.update(false);
                        
                        timeline.lengthPerMonth = 20;
                        timeline.update(true);
                        
                        console.log(scope.data);
                        var timelineNode = paper.node;
                        tElement.append(timelineNode);
                        var compiled = $compile(timelineNode);
                        compiled(scope);
                    });
                };
            }
        };
    });
    
    function lengthBetweenDates(startAt, endAt, lengthPerMonth) {
        var startAtTime = Date.parse(startAt);
        var endAtTime = Date.parse(endAt);
        var monthInMilliseconds = (30.4375 * 24 * 60 * 60 * 1000);
        return (endAtTime - startAtTime) / monthInMilliseconds * lengthPerMonth;
    }
});