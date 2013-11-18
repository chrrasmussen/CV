define([
    './group',
    '../leaves/el',
    '../leaves/image'
], function (Group, El, Image) {
    'use strict';
    
    function Milestone(paper, animationDuration) {
        Group.call(this, paper, animationDuration);
        
        this.x = 0;
        this.y = 0;
        this.radius = 20;
        this.imageSrc = '';
        this.clickHandler = function () {};
        this.hoverAnimationDuration = 200;
        
        this.clipPathRect = new El(paper, animationDuration, 'rect');
        this.milestoneImage = new Image(paper, animationDuration);
        this.overlayRect = new El(paper, animationDuration, 'rect');
    }
    
    Milestone.prototype = Object.create(Group.prototype);
    Milestone.prototype.constructor = Milestone;
    
    Milestone.prototype.update = function (animate) {
        this.clipPathRect.attr = {
            x: this.x - this.radius,
            y: this.y - this.radius,
            width: this.radius * 2,
            height: this.radius * 2,
            rx: 7,
            ry: 7
        };
        
        this.milestoneImage.imageSrc = this.imageSrc;
        this.milestoneImage.attr = {
            x: this.x - this.radius,
            y: this.y - this.radius,
            width: this.radius * 2,
            height: this.radius * 2,
            clipPath: this.clipPathRect.getNode()
        };
        
        this.overlayRect.attr = {
            x: this.x - this.radius,
            y: this.y - this.radius,
            width: this.radius * 2,
            height: this.radius * 2,
            rx: 7,
            ry: 7,
            opacity: 0
        };
        
        this.clipPathRect.update(animate);
        this.milestoneImage.update(animate);
        this.overlayRect.update(animate);
        
        Group.prototype.update.call(this);
        
        // TODO: Is this the best way to do it?
        var overlayRectNode = this.overlayRect.getNode();
        var animationDuration = this.hoverAnimationDuration;
        this.group.hover(function () {
            overlayRectNode.animate({
                opacity: 0.2
            }, animationDuration);
        }, function () {
            overlayRectNode.animate({
                opacity: 0
            }, animationDuration);
        });
        
        this.group.click(this.clickHandler);
    };
    
    Milestone.prototype.getChildren = function () {
        return [this.milestoneImage, this.overlayRect];
    };
    
    return Milestone;
});