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
        monthSeparatorHeight: 5,
        markerHeight: 5,
        animationDuration: 200
    };
    
    function timeline(element, data, config, clickHandler) {
        var dataHeight = data.length * config.heightPerLane;
        var width = lengthBetweenDates(config.timelineStartAt, config.timelineEndAt, config.lengthPerMonth);
        var height = 2 * config.verticalMargin + dataHeight + config.headerRowSize;
        
        var paper = snap(element).attr({
            width: width,
            height: height
        });
    
        drawLanes(paper, 0, config.verticalMargin, width, config.heightPerLane, data);
        
        drawYears(paper, 0, config.verticalMargin, config.timelineStartAt, config.timelineEndAt, dataHeight + config.headerRowSize, config.lengthPerMonth, config.headerRowSize);
        
        drawEdges(paper, 0, config.verticalMargin, width, dataHeight);
        
        drawDataPerLane(paper, 0, config.verticalMargin, width, config.heightPerLane, config.heightPerEvent, config.timelineEndAt, config.lengthPerMonth, config.animationDuration, data, clickHandler);
        
        var today = new Date().toISOString();
        var dateMarkerX = lengthBetweenDates(today, config.timelineEndAt, config.lengthPerMonth);
        var dateMarkerY = config.verticalMargin - config.markerHeight;
        var dateMarkerHeight = config.monthSeparatorHeight + dataHeight + config.markerHeight;
        drawDateMarker(paper, dateMarkerX, dateMarkerY, dateMarkerHeight);
    }
    
    function drawEdges(paper, x, y, width, height) {
        var topEdge = paper.line(x, y, width, y);
        
        var bottomEdge = paper.line(x, y + height, width, y  + height);
        
        paper.group(topEdge, bottomEdge).attr({
            class: 'edges'
        });
    }
    
    function drawDateMarker(paper, x, y, height) {
        var markerTop = paper.circle(x, y, 3);
        
        var markerStripe = paper.line(x, y, x, y + height);
        
        paper.group(markerTop, markerStripe).attr({
            class: 'marker'
        });
    }
    
    function drawDataPerLane(paper, x, y, width, heightPerLane, heightPerEvent, timelineEndAt, lengthPerMonth, animationDuration, data, clickHandler) {
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
                    
                    drawPeriod(paper, periodX, periodY, periodWidth, heightPerEvent, period.title, period.subtitle, period.textColor, period.backgroundColor, period.id, animationDuration, clickHandler);
                }
                else if (period.type === 'milestone') {
                    var milestoneX = x + lengthBetweenDates(period.date, timelineEndAt, lengthPerMonth);
                    var milestoneY = y + (lane + 0.5) * heightPerLane;
                    drawMilestone(paper, milestoneX, milestoneY, heightPerEvent / 2, period.iconImage, period.textColor, period.id, animationDuration, clickHandler);
                }
            }
        }
    }
    
    function drawLanes(paper, x, y, width, height, data) {
        for (var row = 0; row < data.length; row++) {
            var padding = 20;
            
            var lane = paper.rect(x, y + height * row, width, height);
            
            var laneText = paper.text(x + padding, y + height * row + height / 2, data[row].title).attr({
                dominantBaseline: 'middle',
                dy: 3
            });
            
            paper.group(lane, laneText).attr({
                class: 'lane'
            });
        }
    }
    
    function drawYears(paper, x, y, startAt, endAt, height, lengthPerMonth, headerRowSize) {
        var endAtDate = new Date(Date.parse(endAt));
        var startAtDate = new Date(Date.parse(startAt));
        
        var separators = [];
        
        var currentDate = new Date(endAtDate.getFullYear(), endAtDate.getMonth(), 1);
        while (currentDate.getTime() >= startAtDate.getTime()) {
            var dateX = x + lengthBetweenDates(currentDate.toISOString(), endAt, lengthPerMonth);
            
            var smallStripeY = y + height - headerRowSize;
            
            // New year
            if (currentDate.getMonth() === 0) {
                var yearSeparator = paper.line(dateX, y, dateX, y + height);
                separators.push(yearSeparator);
                
                var padding = 5;
                var yearText = paper.text(dateX - padding, y + height - padding, currentDate.getFullYear().toString()).attr({
                    textAnchor: 'end',
                    dominantBaseline: 'middle'
                });
                separators.push(yearText);
            }
            // Mid-year
            else if (currentDate.getMonth() === 6) {
                var midYearSeparator = paper.line(dateX, smallStripeY, dateX, smallStripeY + 10);
                separators.push(midYearSeparator);
            }
            // Other months
            else {
                var monthSeparator = paper.line(dateX, smallStripeY, dateX, smallStripeY + 5);
                separators.push(monthSeparator);
            }
            
            // Get date for previous month
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        }
        
        paper.group.apply(paper, separators).attr({
            class: 'separators'
        });
    }
    
    function drawPeriod(paper, x, y, width, height, title, subtitle, textColor, backgroundColor, eventID, animationDuration, clickHandler) {
        var periodRect = paper.rect(x, y, width, height).attr({
            fill: backgroundColor,
            stroke: textColor,
            strokeWidth: 0,
            rx: 3,
            ry: 3
        });
        
        var padding = 8;
        var verticalOffset = 12;
        
        var titleClipPathRect = paper.rect(x + padding, y, width - 2 * padding, height);
        
        var titleText = paper.text(x + padding, y + verticalOffset, title).attr({
            class: 'title',
            fill: textColor,
            dominantBaseline: 'middle',
            dy: 1,
            clipPath: titleClipPathRect
        });
        
        var subtitleClipPathRect = titleClipPathRect.clone();
        var subtitleText = paper.text(x + padding, y + (height - verticalOffset), subtitle).attr({
            class: 'subtitle',
            fill: textColor,
            dominantBaseline: 'middle',
            dy: 1,
            clipPath: subtitleClipPathRect
        });
        
        var group = paper.group(periodRect, titleText, subtitleText).attr({
            class: 'period'
        });
        
        var titleWidth = titleText.getBBox().width;
        var subtitleWidth = subtitleText.getBBox().width;
        var requiredWidth = Math.max(titleWidth, subtitleWidth);
        
        group.hover(function () {
            periodRect.animate({ fill: textColor }, animationDuration);
            titleText.animate({ fill: backgroundColor }, animationDuration);
            subtitleText.animate({ fill: backgroundColor }, animationDuration);
            
            if (requiredWidth + 2 * padding > width) {
                periodRect.animate({ width: requiredWidth + 2 * padding }, animationDuration);
                titleClipPathRect.animate({ width: titleWidth }, animationDuration);
                subtitleClipPathRect.animate({ width: subtitleWidth }, animationDuration);
            }
        }, function () {
            periodRect.animate({ fill: backgroundColor }, animationDuration);
            titleText.animate({ fill: textColor }, animationDuration);
            subtitleText.animate({ fill: textColor }, animationDuration);
            if (requiredWidth + 2 * padding > width) {
                periodRect.animate({ width: width }, animationDuration);
                titleClipPathRect.animate({ width: width - 2 * padding }, animationDuration);
                subtitleClipPathRect.animate({ width: width - 2 * padding }, animationDuration);
            }
        });
        
        group.click(function () {
            clickHandler(eventID);
        });
    }
    
    function drawMilestone(paper, milestoneX, milestoneY, radius, imageSrc, textColor, eventID, animationDuration, clickHandler) {
        var clipPathRect = paper.rect(milestoneX - radius, milestoneY - radius, radius * 2, radius * 2).attr({
            rx: 7,
            ry: 7
        });
        
        var milestoneImage = paper.image(imageSrc, milestoneX - radius, milestoneY - radius, radius * 2, radius * 2).attr({ clipPath: clipPathRect });
        
        var overlayRect = paper.rect(milestoneX - radius, milestoneY - radius, radius * 2, radius * 2).attr({
            fill: '#000',
            opacity: 0,
            rx: 7,
            ry: 7
        });
        
        var group = paper.group(milestoneImage, overlayRect).attr({
            class: 'milestone'
        });
        
        group.hover(function () {
            overlayRect.animate({
                opacity: 0.2
            }, animationDuration);
        }, function () {
            overlayRect.animate({
                opacity: 0
            }, animationDuration);
        });
        
        group.click(function () {
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