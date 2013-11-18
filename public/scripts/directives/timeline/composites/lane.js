define([
    './group',
    '../leaves/el',
    '../leaves/text'
], function (Group, El, Text) {
    'use strict';
    
    function Lane(paper, animationDuration) {
        Group.call(this, paper, animationDuration);
        
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.padding = 20;
        this.title = '';
        
        this.laneRect = new El(paper, animationDuration, 'rect');
        this.laneText = new Text(paper, animationDuration);
    }
    
    Lane.prototype = Object.create(Group.prototype);
    Lane.prototype.constructor = Lane;
    
    Lane.prototype.update = function (animate) {
        this.laneRect.attr = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
        
        this.laneText.text = this.title;
        this.laneText.attr = {
            x: this.x + this.padding,
            y: this.y + this.height / 2,
            dominantBaseline: 'middle',
            dy: 3
        };
        
        this.laneRect.update(animate);
        this.laneText.update(animate);
        
        Group.prototype.update.call(this);
    };
    
    Lane.prototype.getChildren = function () {
        return [this.laneRect, this.laneText];
    };
    
    return Lane;
});