define([
    './module',
    'snap',
    './timeline/utils',
    './timeline/composites/timeline'
], function (module, snap, utils, Timeline) {
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
                            lengthPerMonth: 40,
                            heightPerLane: 56,
                            heightPerEvent: 40,
                            monthSeparatorHeight: 5,
                            markerHeight: 5,
                            animationDuration: 200
                        };
                        
                        var width = utils.lengthBetweenDates(config.startAt, config.endAt, config.lengthPerMonth);
                        var height = 2 * config.verticalMargin + scope.data.length * config.heightPerLane + config.headerRowSize;
                        var paper = snap(width, height);
                        
                        var timeline = new Timeline(paper, 200);
                        timeline.width = width;
                        timeline.height = height;
                        timeline.startAt = tAttrs.startAt;
                        timeline.endAt = tAttrs.endAt;
                        timeline.lengthPerMonth = 40;
                        timeline.clickHandler = function (eventID) {
                            scope.$apply(function () {
                                scope.click({ eventID: eventID });
                            });
                        };
                        
                        timeline.data = scope.data;
                        timeline.update(false);
                        
                        var timelineNode = paper.node;
                        tElement.append(timelineNode);
                        var compiled = $compile(timelineNode);
                        compiled(scope);
                    });
                };
            }
        };
    });
});