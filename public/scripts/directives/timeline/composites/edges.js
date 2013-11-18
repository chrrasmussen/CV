define([
    './group',
    '../leaves/el'
], function (Group, El) {
    'use strict';
    
    function Edges(paper, animationDuration) {
        Group.call(this, paper, animationDuration);
        
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        
        this.topEdge = new El(paper, animationDuration, 'line');
        this.bottomEdge = new El(paper, animationDuration, 'line');
    }
    
    Edges.prototype = Object.create(Group.prototype);
    Edges.prototype.constructor = Edges;
    
    Edges.prototype.update = function (animate) {
        this.topEdge.attr = {
            x1: this.x,
            y1: this.y,
            x2: this.width,
            y2: this.y
        };
        
        this.bottomEdge.attr = {
            x1: this.x,
            y1: this.y + this.height,
            x2: this.width,
            y2: this.y + this.height
        };
        
        this.topEdge.update(animate);
        this.bottomEdge.update(animate);
        
        Group.prototype.update.call(this);
    };
    
    Edges.prototype.getChildren = function () {
        return [this.topEdge, this.bottomEdge];
    };
    
    return Edges;
});