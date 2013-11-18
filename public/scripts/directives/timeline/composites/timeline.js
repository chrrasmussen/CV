define([
    '../utils',
    './group',
    './lanes',
    './separators',
    './edges',
    './events',
    './marker',
], function (utils, Group, Lanes, Separators, Edges, Events, Marker) {
    'use strict';
    
    function Timeline(paper, animationDuration) {
        Group.call(this, paper, animationDuration);
        
        this.width = 0;
        this.height = 0;
        this.startAt = '2015-01-01';
        this.endAt = '2000-01-01';
        this.headerRowSize = 30;
        this.verticalMargin = 10;
        this.lengthPerMonth = 35;
        this.heightPerLane = 56;
        this.heightPerEvent = 40;
        this.monthSeparatorHeight = 5;
        this.markerHeight = 5;
        this.data = [];
        
        this.lanes = new Lanes(paper, animationDuration);
        this.separators = new Separators(paper, animationDuration);
        this.edges = new Edges(paper, animationDuration);
        this.events = new Events(paper, animationDuration);
        this.marker = new Marker(paper, animationDuration);
    }
    
    Timeline.prototype = Object.create(Group.prototype);
    Timeline.prototype.constructor = Timeline;
    
    Timeline.prototype.update = function (animate) {
        // Lanes
        this.lanes.attr = {
            class: 'lanes'
        };
        
        this.lanes.x = 0;
        this.lanes.y = this.verticalMargin;
        this.lanes.width = this.width;
        this.lanes.height = this.heightPerLane * this.data.length;
        
        this.lanes.titles = this.data.map(function (element) {
            return element.title;
        });
        this.lanes.update(animate);
        
//        drawSeparators(paper, 0, this.verticalMargin, this.startAt, this.endAt, dataHeight + this.headerRowSize, this.lengthPerMonth, this.headerRowSize);
        
        // Separators
        this.separators.attr = {
            class: 'separators'
        };
        
        this.separators.x = 0;
        this.separators.y = this.verticalMargin;
        this.separators.width = this.width;
        this.separators.height = this.heightPerLane * this.data.length + this.headerRowSize;
        this.separators.startAt = this.startAt;
        this.separators.endAt = this.endAt;
        this.separators.lengthPerMonth = this.lengthPerMonth;
        this.separators.headerRowSize = this.headerRowSize;
        this.separators.update(animate);
        
        // Edges
        this.edges.attr = {
            class: 'edges'
        };
        
        this.edges.x = 0;
        this.edges.y = this.verticalMargin;
        this.edges.width = this.width;
        this.edges.height = this.heightPerLane * this.data.length;
        this.edges.update(animate);
        
        // Events
        this.events.attr = {
            class: 'events'
        };
        
        this.events.x = 0;
        this.events.y = this.verticalMargin;
        this.events.width = this.width;
        this.events.height = this.heightPerLane * this.data.length;
        this.events.heightPerLane = this.heightPerLane;
        this.events.heightPerEvent = this.heightPerEvent;
        this.events.endAt = this.endAt;
        this.events.lengthPerMonth = this.lengthPerMonth;
        this.events.data = this.data;
        this.events.clickHandler = this.clickHandler;
        this.events.update(animate);
        
        // Marker
        var today = new Date().toISOString();
        var dateMarkerX = utils.lengthBetweenDates(today, this.endAt, this.lengthPerMonth);
        var dateMarkerY = this.verticalMargin - this.markerHeight;
        var dateMarkerHeight = this.monthSeparatorHeight + this.heightPerLane * this.data.length + this.markerHeight;
        
        this.marker.attr = {
            class: 'marker'
        };
        
        this.marker.x = dateMarkerX;
        this.marker.y = dateMarkerY;
        this.marker.height = dateMarkerHeight;
        this.marker.update(animate);
        
        Group.prototype.update.call(this);
    };
    
    Timeline.prototype.getChildren = function () {
        return [this.lanes, this.separators, this.edges, this.events, this.marker];
    };
    
    return Timeline;
});