define([
    './group',
    '../leaves/el'
], function (Group, El) {
    'use strict';
    
    function Marker(paper, animationDuration) {
        Group.call(this, paper, animationDuration);
        
        this.x = 0;
        this.y = 0;
        this.height = 0;
        this.radius = 3;
        
        this.markerTop = new El(paper, animationDuration, 'circle');
        this.markerStripe = new El(paper, animationDuration, 'line');
    }
    
    Marker.prototype = Object.create(Group.prototype);
    Marker.prototype.constructor = Marker;
    
    Marker.prototype.update = function (animate) {
        this.markerTop.attr = {
            cx: this.x,
            cy: this.y,
            r: this.radius
        };
        
        this.markerStripe.attr = {
            x1: this.x,
            y1: this.y,
            x2: this.x,
            y2: this.y + this.height
        };
        
        this.markerTop.update(animate);
        this.markerStripe.update(animate);
        
        Group.prototype.update.call(this);
    };
    
    Marker.prototype.getChildren = function () {
        return [this.markerTop, this.markerStripe];
    };
    
    return Marker;
});