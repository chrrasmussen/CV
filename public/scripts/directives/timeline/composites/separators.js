define([
    '../utils',
    './group',
    '../leaves/el',
    '../leaves/text'
], function (utils, Group, El, Text) {
    'use strict';
    
    function Separators(paper, animationDuration) {
        Group.call(this, paper, animationDuration);
        
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.startAt = '2000-01-01';
        this.endAt = '2015-01-01';
        this.padding = 5;
        this.lengthPerMonth = 35;
        this.headerRowSize = 30;
        
        this.separators = [];
    }
    
    Separators.prototype = Object.create(Group.prototype);
    Separators.prototype.constructor = Separators;
    
    Separators.prototype.update = function (animate) {
        this.getChildren(); // TODO: Force population of this.lanes
        
        var endAtDate = new Date(Date.parse(this.endAt));
        var startAtDate = new Date(Date.parse(this.startAt));
        
        var index = 0;
        var currentDate = new Date(endAtDate.getFullYear(), endAtDate.getMonth(), 1);
        while (currentDate.getTime() >= startAtDate.getTime()) {
            var dateX = this.x + utils.lengthBetweenDates(currentDate.toISOString(), this.endAt, this.lengthPerMonth);
            
            var smallStripeY = this.y + this.height - this.headerRowSize;
            
            // New year
            if (currentDate.getMonth() === 0) {
                var yearSeparator = this.separators[index];
                yearSeparator.attr = {
                    x1: dateX,
                    y1: this.y,
                    x2: dateX,
                    y2: this.y + this.height
                };
                yearSeparator.update(animate);
                
                index++;
                var yearText = this.separators[index];
                
                yearText.text = currentDate.getFullYear();
                yearText.attr = {
                    x: dateX - this.padding,
                    y: this.y + this.height - this.padding,
                    textAnchor: 'end',
                    dominantBaseline: 'middle'
                };
                yearText.update(animate);
            }
            // Mid-year
            else if (currentDate.getMonth() === 6) {
                var midYearSeparator = this.separators[index];
                midYearSeparator.attr = {
                    x1: dateX,
                    y1: smallStripeY,
                    x2: dateX,
                    y2: smallStripeY + 10 // TODO: Fix magic number
                };
                midYearSeparator.update(animate);
            }
            // Other months
            else {
                var monthSeparator = this.separators[index];
                monthSeparator.attr = {
                    x1: dateX,
                    y1: smallStripeY,
                    x2: dateX,
                    y2: smallStripeY + 5 // TODO: Fix magic number
                };
                monthSeparator.update(animate);
            }
            
            // Get date for previous month
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
            index++;
        }
        
        Group.prototype.update.call(this);
    };
    
    Separators.prototype.getChildren = function () {
        if (this.separators.length === 0) {
            var endAtDate = new Date(Date.parse(this.endAt));
            var startAtDate = new Date(Date.parse(this.startAt));
            
            var currentDate = new Date(endAtDate.getFullYear(), endAtDate.getMonth(), 1);
            while (currentDate.getTime() >= startAtDate.getTime()) {
                // New year
                if (currentDate.getMonth() === 0) {
                    var yearSeparator = new El(this.paper, this.animationDuration, 'line');
                    this.separators.push(yearSeparator);
                    
                    var yearText = new Text(this.paper, this.animationDuration);
                    this.separators.push(yearText);
                }
                // Mid-year
                else if (currentDate.getMonth() === 6) {
                    var midYearSeparator = new El(this.paper, this.animationDuration, 'line');
                    this.separators.push(midYearSeparator);
                }
                // Other months
                else {
                    var monthSeparator = new El(this.paper, this.animationDuration, 'line');
                    this.separators.push(monthSeparator);
                }
                
                // Get date for previous month
                currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
            }
        }
        
        return this.separators;
    };
    
    return Separators;
});