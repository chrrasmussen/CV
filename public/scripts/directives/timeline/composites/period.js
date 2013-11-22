define([
    './group',
    '../leaves/el',
    '../leaves/text',
    '../leaves/rect_with_arrows'
], function (Group, El, Text, RectWithArrows) {
    'use strict';
    
    function Period(paper, animationDuration) {
        Group.call(this, paper, animationDuration);
        
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.padding = 8;
        this.verticalOffset = 12;
        this.title = '';
        this.subtitle = '';
        this.backgroundColor = 'white';
        this.textColor = 'black';
        this.clickHandler = function () {};
        this.hoverAnimationDuration = 200;
        
        this.periodRect = new RectWithArrows(paper, animationDuration);
        this.titleClipPathRect = new El(paper, animationDuration, 'rect');
        this.titleText = new Text(paper, animationDuration);
        this.subtitleClipPathRect = new El(paper, animationDuration, 'rect');
        this.subtitleText = new Text(paper, animationDuration);
    }
    
    Period.prototype = Object.create(Group.prototype);
    Period.prototype.constructor = Period;
    
    Period.prototype.update = function (animate) {
        this.periodRect.x = this.x;
        this.periodRect.y = this.y;
        this.periodRect.width = this.width;
        this.periodRect.height = this.height;
        this.periodRect.rx = 3;
        this.periodRect.ry = 3;
        this.periodRect.arrowSize = 6;
        this.periodRect.arrows = [0, this.width];
        this.periodRect.attr = {
            fill: this.backgroundColor,
            strokeWidth: 0
        };
        
        this.titleClipPathRect.attr = {
            x: this.x + this.padding,
            y: this.y,
            width: this.width - 2 * this.padding,
            height: this.height
        };
        
        this.titleText.text = this.title;
        this.titleText.attr = {
            x: this.x + this.padding,
            y: this.y + this.verticalOffset,
            class: 'title',
            fill: this.textColor,
            dominantBaseline: 'middle',
            dy: 1,
            clipPath: this.titleClipPathRect.getNode()
        };
        
        this.subtitleClipPathRect.attr = { // TODO: Is this necessary? Can I use a single one?
            x: this.x + this.padding,
            y: this.y,
            width: this.width - 2 * this.padding,
            height: this.height
        };
        
        this.subtitleText.text = this.subtitle;
        this.subtitleText.attr = {
            x: this.x + this.padding,
            y: this.y + (this.height - this.verticalOffset),
            class: 'subtitle',
            fill: this.textColor,
            dominantBaseline: 'middle',
            dy: 1,
            clipPath: this.subtitleClipPathRect.getNode()
        };
        
        this.periodRect.update(animate);
        this.titleClipPathRect.update(animate);
        this.titleText.update(animate);
        this.subtitleClipPathRect.update(animate);
        this.subtitleText.update(animate);
        
        Group.prototype.update.call(this);
        
        var titleWidth = this.titleText.getNode().getBBox().width;
        var subtitleWidth = this.subtitleText.getNode().getBBox().width;
        var requiredWidth = Math.max(titleWidth, subtitleWidth);
        
        var periodRect = this.periodRect;
        var titleClipPathRect = this.titleClipPathRect.getNode();
        var titleText = this.titleText.getNode();
        var subtitleClipPathRect = this.subtitleClipPathRect.getNode();
        var subtitleText = this.subtitleText.getNode();
        var textColor = this.textColor;
        var backgroundColor = this.backgroundColor;
        var width = this.width;
        var padding = this.padding;
        var animationDuration = this.hoverAnimationDuration;
        
        this.group.hover(function () {
            periodRect.attr = { fill: textColor };
//            periodRect.animate({ fill: textColor }, animationDuration);
            titleText.animate({ fill: backgroundColor }, animationDuration);
            subtitleText.animate({ fill: backgroundColor }, animationDuration);
            
            if (requiredWidth + 2 * padding > width) {
                periodRect.width = requiredWidth + 2 * padding;
//                periodRect.animate({ width: requiredWidth + 2 * padding }, animationDuration);
                titleClipPathRect.animate({ width: titleWidth }, animationDuration);
                subtitleClipPathRect.animate({ width: subtitleWidth }, animationDuration);
            }
            
            periodRect.update(true);
        }, function () {
            periodRect.attr = { fill: backgroundColor };
//            periodRect.animate({ fill: backgroundColor }, animationDuration);
            titleText.animate({ fill: textColor }, animationDuration);
            subtitleText.animate({ fill: textColor }, animationDuration);
            if (requiredWidth + 2 * padding > width) {
                periodRect.width = width;
//                periodRect.animate({ width: width }, animationDuration);
                titleClipPathRect.animate({ width: width - 2 * padding }, animationDuration);
                subtitleClipPathRect.animate({ width: width - 2 * padding }, animationDuration);
            }
            
            periodRect.update(true);
        });
        
        this.group.click(this.clickHandler);
    };
    
    Period.prototype.getChildren = function () {
        return [this.periodRect, this.titleText, this.subtitleText];
    };
    
    return Period;
});