define([
    './group',
    '../leaves/el',
    '../leaves/image',
    '../leaves/rect_with_arrows'
], function (Group, El, Image, RectWithArrows) {
    'use strict';
    
    function Milestone(paper, animationDuration) {
        Group.call(this, paper, animationDuration);
        
        this.x = 0;
        this.y = 0;
        this.radius = 20;
        this.imageSrc = '';
        this.backgroundColor = 'white';
        this.clickHandler = function () {};
        this.hoverAnimationDuration = 200;
        
        this.backgroundRect = new RectWithArrows(paper, animationDuration);
        this.clipPathRect = new El(paper, animationDuration, 'rect');
        this.milestoneImage = new Image(paper, animationDuration);
        this.overlayRect = new RectWithArrows(paper, animationDuration);
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
        
        this.backgroundRect.x = this.x - this.radius;
        this.backgroundRect.y = this.y - this.radius;
        this.backgroundRect.width = this.radius * 2;
        this.backgroundRect.height = this.radius * 2;
        this.backgroundRect.rx = 7;
        this.backgroundRect.ry = 7;
        this.backgroundRect.arrowSize = 6;
        this.backgroundRect.arrows = [this.radius];
        this.backgroundRect.attr = {
            fill: this.backgroundColor,
            strokeWidth: 0
        };
        
        this.milestoneImage.imageSrc = this.imageSrc;
        this.milestoneImage.attr = {
            x: this.x - this.radius,
            y: this.y - this.radius,
            width: this.radius * 2,
            height: this.radius * 2,
            clipPath: this.clipPathRect.getNode()
        };
        
        this.overlayRect.x = this.x - this.radius;
        this.overlayRect.y = this.y - this.radius;
        this.overlayRect.width = this.radius * 2;
        this.overlayRect.height = this.radius * 2;
        this.overlayRect.rx = 7;
        this.overlayRect.ry = 7;
        this.overlayRect.arrowSize = 6;
        this.overlayRect.arrows = [this.radius];
        this.overlayRect.attr = {
            fill: 'black',
            strokeWidth: 0,
            opacity: 0
        };
        
        this.backgroundRect.update(animate);
        this.clipPathRect.update(animate);
        this.milestoneImage.update(animate);
        this.overlayRect.update(animate);
        
        Group.prototype.update.call(this);
        
        // TODO: Is this the best way to do it?
        var overlayRectNode = this.overlayRect;
        var animationDuration = this.hoverAnimationDuration;
        this.group.hover(function () {
            overlayRectNode.attr = {
                fill: 'black',
                strokeWidth: 0,
                opacity: 0.2
            };
            overlayRectNode.update(true);
        }, function () {
            overlayRectNode.attr = {
                fill: 'black',
                strokeWidth: 0,
                opacity: 0
            };
            overlayRectNode.update(true);
        });
        
        this.group.click(this.clickHandler);
    };
    
    Milestone.prototype.getChildren = function () {
        return [this.backgroundRect, this.milestoneImage, this.overlayRect];
    };
    
    return Milestone;
});