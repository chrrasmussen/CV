define([
    './group',
    './lane'
], function (Group, Lane) {
    'use strict';
    
    function Lanes(paper, animationDuration) {
        Group.call(this, paper, animationDuration);
        
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.titles = [];
        
        this.lanes = [];
    }
    
    Lanes.prototype = Object.create(Group.prototype);
    Lanes.prototype.constructor = Lanes;
    
    Lanes.prototype.update = function (animate) {
        this.getChildren(); // TODO: Force population of this.lanes
        
        var heightPerLane = this.height / this.lanes.length;
        this.lanes.forEach(function (lane, index) {
            lane.x = this.x;
            lane.y = this.y + index * heightPerLane;
            lane.width = this.width;
            lane.height = heightPerLane;
            lane.title = this.titles[index];
            
            lane.update(true);
        }, this);
        
        Group.prototype.update.call(this);
    };
    
    Lanes.prototype.getChildren = function () {
        if (this.lanes.length === 0) {
            this.titles.forEach(function (element, index) {
                var lane = new Lane(this.paper, this.animationDuration);
                lane.attr = {
                    class: 'lane'
                };
                
                this.lanes.push(lane);
            }, this);
        }
        
        return this.lanes;
    };
    
    return Lanes;
});