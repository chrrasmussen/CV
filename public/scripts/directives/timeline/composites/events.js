define([
    '../utils',
    './group',
    './period',
    './milestone'
], function (utils, Group, Period, Milestone) {
    'use strict';
    
    function Events(paper, animationDuration) {
        Group.call(this, paper, animationDuration);
        
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.lengthPerMonth = 0;
        this.heightPerEvent = 40;
        this.heightPerLane = 60;
        this.data = [];
        this.clickHandler = function () {};
        
        this.events = [];
        this.lanes = [];
    }
    
    Events.prototype = Object.create(Group.prototype);
    Events.prototype.constructor = Events;
    
    Events.prototype.update = function (animate) {
        this.getChildren(); // TODO: Force population of this.lanes
        
        var heightPerLane = this.height / this.lanes.length;
        this.data.forEach(function (laneData, laneIndex) {
            laneData.content.forEach(function (eventData, eventIndex) {
                var event = this.lanes[laneIndex][eventIndex];
                
                if (event instanceof Period) {
                    var endAt = eventData.endAt || new Date().toISOString();
                    
                    var endAtLength = utils.lengthBetweenDates(endAt, this.endAt, this.lengthPerMonth);
                    var startAtLength = utils.lengthBetweenDates(eventData.startAt, this.endAt, this.lengthPerMonth);
                    
                    var periodX = this.x + endAtLength;
                    var eventMargin = (this.heightPerLane - this.heightPerEvent) / 2;
                    var periodY = this.y + laneIndex * this.heightPerLane + eventMargin;
                    var periodWidth = (startAtLength - endAtLength);
                    
                    event.x = periodX;
                    event.y = periodY;
                    event.width = periodWidth;
                    event.height = this.heightPerEvent;
                    event.title = eventData.title;
                    event.subtitle = eventData.subtitle;
                    event.textColor = eventData.textColor;
                    event.backgroundColor = eventData.backgroundColor;
                }
                else if (event instanceof Milestone) {
                    var milestoneX = this.x + utils.lengthBetweenDates(eventData.date, this.endAt, this.lengthPerMonth);
                    var milestoneY = this.y + (laneIndex + 0.5) * this.heightPerLane;
                
                    event.x = milestoneX;
                    event.y = milestoneY;
                    event.radius = this.heightPerEvent / 2;
                    event.imageSrc = eventData.iconImage;
                    event.backgroundColor = eventData.iconBackgroundColor;
                }
                
                var clickHandler = this.clickHandler;
                event.clickHandler = function () {
                    clickHandler(eventData.id);
                };
                
                event.update(true);
            }, this);
        }, this);
        
        Group.prototype.update.call(this);
    };
    
    Events.prototype.getChildren = function () {
        if (this.events.length === 0) {
            this.data.forEach(function (laneData, laneIndex) {
                var eventsForLane = [];
                
                laneData.content.forEach(function (eventData, eventIndex) {
                    var event;
                    if (eventData.type === 'period') {
                        event = new Period(this.paper, this.animationDuration);
                        event.attr = {
                            class: 'period'
                        };
                    }
                    else if (eventData.type === 'milestone') {
                        event = new Milestone(this.paper, this.animationDuration);
                        event.attr = {
                            class: 'milestone'
                        };
                    }
                    
                    this.events.push(event);
                    eventsForLane.push(event);
                }, this);
                
                this.lanes.push(eventsForLane);
            }, this);
        }
        
        return this.events;
    };
    
    return Events;
});