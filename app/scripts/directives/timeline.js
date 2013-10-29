define([
    './module',
    'snap'
], function (module, snap) {
    'use strict';
    
    module.directive('timeline', function() {
        return {
            restrict: 'E',
            scope: {
                startAt: '@',
                endAt: '@',
                data: '=',
                click: '&'
            },
            replace: true,
            template: '<div class="timeline"><svg id="timeline"></svg></div>',
            link: function(scope, element, attrs) {
                config.timelineStartAt = attrs.startAt;
                config.timelineEndAt = attrs.endAt;
                
                scope.$watch('data', function () {
                    timeline('#timeline', scope.data, config, function (eventID) {
                        scope.$apply(function () {
                            scope.click({ eventID: eventID });
                        });
                    });
                });
            }
        };
    });
    
    var config = {
        timelineEndAt: '2015-01-01',
        timelineStartAt: '2000-01-01',
        headerRowSize: 30,
        verticalMargin: 10,
        lengthPerMonth: 35,
        heightPerLane: 56,
        heightPerEvent: 40,
        monthMarkerHeight: 5,
        markerHeight: 5,
        markerColor: '#CB6C6B'
    };
    
    function timeline(element, data, config, clickHandler) {
        var width = lengthBetweenDates(config.timelineStartAt, config.timelineEndAt, config.lengthPerMonth);
        var height = config.headerRowSize + 2 * config.verticalMargin + data.length * config.heightPerLane;
        
        var paper = snap(element).attr({
            width: width,
            height: height
        });
    
        drawLanes(paper, 0, config.verticalMargin, width, config.heightPerLane, data, '#F0F0F3', '#E8E8EA');
        
        drawYears(paper, 0, config.verticalMargin, config.timelineStartAt, config.timelineEndAt, height - 2 * config.verticalMargin, config.lengthPerMonth, config.headerRowSize, '#A3AFB2');
        
        var topLineY = config.verticalMargin;
        paper.line(0, topLineY, width, topLineY).attr({
            stroke: '#666666'
        });
        
        var bottomLineY = height - config.verticalMargin - config.headerRowSize;
        paper.line(0, bottomLineY, width, bottomLineY).attr({
            stroke: '#666666'
        });
        
        drawDataPerLane(paper, 0, config.verticalMargin, width, config.heightPerLane, config.heightPerEvent, config.timelineEndAt, config.lengthPerMonth, data, clickHandler);
        
        var today = new Date().toISOString();
        var dateMarkerX = lengthBetweenDates(today, config.timelineEndAt, config.lengthPerMonth);
        var dateMarkerY = config.verticalMargin - config.markerHeight;
        var dateMarkerHeight = height - config.verticalMargin - config.headerRowSize + config.monthMarkerHeight - dateMarkerY;
        drawDateMarker(paper, dateMarkerX, dateMarkerY, dateMarkerHeight, config.markerColor);
    }
    
    function drawDateMarker(paper, x, y, height, color) {
        paper.circle(x, y, 3).attr({
            fill: color
        });
        
        paper.line(x, y, x, y + height).attr({
            stroke: color
        });
    }
    
    function drawDataPerLane(paper, x, y, width, heightPerLane, heightPerEvent, timelineEndAt, lengthPerMonth, data, clickHandler) {
        for (var lane = 0; lane < data.length; lane++) {
            var periods = data[lane].content;
            for (var i = 0; i < periods.length; i++) {
                var period = periods[i];
                
                if (period.type === 'period') {
                    var endAt = period.endAt || new Date().toISOString();
                    
                    var endAtLength = lengthBetweenDates(endAt, timelineEndAt, lengthPerMonth);
                    var startAtLength = lengthBetweenDates(period.startAt, timelineEndAt, lengthPerMonth);
                    
                    var periodX = x + endAtLength;
                    var eventMargin = (heightPerLane - heightPerEvent) / 2;
                    var periodY = y + lane * heightPerLane + eventMargin;
                    var periodWidth = (startAtLength - endAtLength);
                    
                    drawPeriod(paper, periodX, periodY, periodWidth, heightPerEvent, period.title, period.subtitle, period.textColor, period.backgroundColor, period.id, clickHandler);
                }
                else if (period.type === 'milestone') {
                    var milestoneX = x + lengthBetweenDates(period.date, timelineEndAt, lengthPerMonth);
                    var milestoneY = y + (lane + 0.5) * heightPerLane;
                    drawMilestone(paper, milestoneX, milestoneY, heightPerEvent / 2, period.iconImage, period.textColor, period.id, clickHandler);
                }
            }
        }
    }
    
    function drawLanes(paper, x, y, width, height, data, evenColor, oddColor) {
        for (var row = 0; row < data.length; row++) {
            var padding = 20;
            var fill = (row % 2 === 0) ? evenColor : oddColor;
            
            paper.rect(x, y + height * row, width, height).attr({
                fill: fill
            });
            
            paper.text(x + padding, y + height * row + height / 2, data[row].title).attr({
                fill: '#666666',
                fontSize: 18,
                fontWeight: 200,
                textAnchor: 'start',
                dominantBaseline: 'middle',
                dy: 3
            });
        }
    }
    
    function drawYears(paper, x, y, startAt, endAt, height, lengthPerMonth, headerRowSize, color) {
        var endAtDate = new Date(Date.parse(endAt));
        var startAtDate = new Date(Date.parse(startAt));
        
        var currentDate = new Date(endAtDate.getFullYear(), endAtDate.getMonth(), 1);
        while (currentDate.getTime() >= startAtDate.getTime()) {
            var dateX = x + lengthBetweenDates(currentDate.toISOString(), endAt, lengthPerMonth);
            
            var smallStripeY = y + height - headerRowSize;
            
            if (currentDate.getMonth() === 0) {
                paper.line(dateX, y, dateX, y + height).attr({
                    stroke: color
                });
                
                var padding = 5;
                paper.text(dateX - padding, y + height - padding, currentDate.getFullYear().toString()).attr({
                    fontSize: 18,
                    fontWeight: 200,
                    fill: color,
                    textAnchor: 'end',
                    dominantBaseline: 'middle'
                });
            }
            else if (currentDate.getMonth() === 6) {
                paper.line(dateX, smallStripeY, dateX, smallStripeY + 10).attr({
                    stroke: color
                });
            }
            else {
                paper.line(dateX, smallStripeY, dateX, smallStripeY + 5).attr({
                    stroke: color
                });
            }
            
            // Get date for previous month
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        }
    }
    
    function drawPeriod(paper, x, y, width, height, title, subtitle, textColor, backgroundColor, eventID, clickHandler) {
        var periodRect = paper.rect(x, y, width, height, 3).attr({
            fill: backgroundColor,
            stroke: textColor,
            strokeWidth: 0
        });
        
        var padding = 8;
        var verticalOffset = 12;
        
        var titleClipPathRect = paper.rect(x + padding, y, width - 2 * padding, height);
        
        var titleText = paper.text(x + padding, y + verticalOffset, title).attr({
            fill: textColor,
            fontSize: 14,
            fontWeight: 'normal',
            dominantBaseline: 'middle',
            dy: 1,
            clipPath: titleClipPathRect
        });
        
        var subtitleClipPathRect = titleClipPathRect.clone();
        var subtitleText = paper.text(x + padding, y + (height - verticalOffset), subtitle).attr({
            fill: textColor,
            fontSize: 14,
            fontWeight: 200,
            dominantBaseline: 'middle',
            dy: 1,
            clipPath: subtitleClipPathRect
        });
        
        var group = paper.group(periodRect, titleText, subtitleText).attr({
            class: 'event'
        });
        
        var titleWidth = titleText.getBBox().width;
        var subtitleWidth = subtitleText.getBBox().width;
        var requiredWidth = Math.max(titleWidth, subtitleWidth);
        
        var duration = 200;
        group.hover(function () {
            periodRect.animate({ fill: textColor }, duration);
            titleText.animate({ fill: backgroundColor }, duration);
            subtitleText.animate({ fill: backgroundColor }, duration);
            
            if (requiredWidth + 2 * padding > width) {
                periodRect.animate({ width: requiredWidth + 2 * padding }, duration);
                titleClipPathRect.animate({ width: titleWidth }, duration);
                subtitleClipPathRect.animate({ width: subtitleWidth }, duration);
            }
        }, function () {
            periodRect.animate({ fill: backgroundColor }, duration);
            titleText.animate({ fill: textColor }, duration);
            subtitleText.animate({ fill: textColor }, duration);
            if (requiredWidth + 2 * padding > width) {
                periodRect.animate({ width: width }, duration);
                titleClipPathRect.animate({ width: width - 2 * padding }, duration);
                subtitleClipPathRect.animate({ width: width - 2 * padding }, duration);
            }
        });
        
        group.click(function () {
            clickHandler(eventID);
        });
    }
    
    function drawMilestone(paper, milestoneX, milestoneY, radius, imageSrc, textColor, eventID, clickHandler) {
        var circleMask = paper.circle(milestoneX, milestoneY, radius).attr({
            fill: 'white'
        });
        
        var milestoneImage = paper.image(imageSrc, milestoneX - radius, milestoneY - radius, radius * 2, radius * 2).attr({
            class: 'event',
            mask: circleMask
        });
        
        var duration = 300;
        milestoneImage.hover(function () {
            milestoneImage.animate({
                transform: 'r' + [15, [milestoneX, milestoneY]]
            }, duration * 1/4, function () {
                milestoneImage.animate({
                    transform: 'r' + [-15, [milestoneX, milestoneY]]
                }, duration * 2/4, function () {
                    milestoneImage.animate({
                        transform: 'r' + [0, [milestoneX, milestoneY]]
                    }, duration * 1/4);
                });
            });
        });
        
        milestoneImage.click(function () {
            clickHandler(eventID);
        });
    }
    
    function lengthBetweenDates(startAt, endAt, lengthPerMonth) {
        var startAtTime = Date.parse(startAt);
        var endAtTime = Date.parse(endAt);
        var monthInMilliseconds = (30.4375 * 24 * 60 * 60 * 1000);
        return (endAtTime - startAtTime) / monthInMilliseconds * lengthPerMonth;
    }
});