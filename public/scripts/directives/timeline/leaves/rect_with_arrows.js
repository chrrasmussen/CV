define([
    'snap',
    './el'
], function (snap, El) {
    'use strict';
    
    function RectWithArrows(paper, animationDuration) {
        El.call(this, paper, animationDuration, 'path');
        
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.rx = 3;
        this.ry = 3;
        this.arrowSize = 5;
        this.arrows = [];
    }
    
    RectWithArrows.prototype = Object.create(El.prototype);
    RectWithArrows.prototype.constructor = RectWithArrows;
    
    RectWithArrows.prototype.getAttr = function () {
        this.attr.path = this.calculatePath();
        return this.attr;
    };
    
    RectWithArrows.prototype.calculatePath = function () {
        if (this.arrows.length > 0) {
            return this.calculatePathWithArrows();
        }
        else {
            return this.calculatePathWithoutArrows();
        }
    };
    
    RectWithArrows.prototype.calculatePathWithArrows = function () {
        var path = snap.format('M{x},{y}', {
            x: this.x,
            y: this.y + this.height - this.ry
        });
        
        var sortedArrows = this.arrows.slice(0).sort(function(a, b) {
            return a - b;
        });
        
        var leftArrowPosition = sortedArrows[0];
        var leftMostArrowOverlapsCorner = leftArrowPosition - this.arrowSize < this.rx;
        var rightArrowPosition = sortedArrows[sortedArrows.length - 1];
        var rightMostArrowOverlapsCorner = rightArrowPosition + this.arrowSize > this.width - this.rx;
        
        if (leftMostArrowOverlapsCorner) {
            sortedArrows = sortedArrows.splice(1);
        }
        if (rightMostArrowOverlapsCorner) {
            sortedArrows = sortedArrows.splice(0, sortedArrows.length - 1);
        }
        
        // Add left arrow
        if (leftMostArrowOverlapsCorner) {
            path += snap.format('l0,{ry} L{arrowX},{arrowY} l0,{arrowSize} {arrowSize},-{arrowSize}', {
                arrowX: this.x + leftArrowPosition,
                arrowY: this.y + this.height,
                endX: this.x + this.width,
                endY: this.y + this.height,
                arrowSize: this.arrowSize,
                ry: this.ry
            });
        }
        else {
            path += snap.format('a{rx},{ry} 0 0,0 {rx},{ry}', {
                rx: this.rx,
                ry: this.ry
            });
        }
        
        // Add center arrows
        path += sortedArrows.map(this.calculateArrow, this).join('');
        
        // Add right arrow
        if (rightMostArrowOverlapsCorner) {
            path += snap.format('L{X},{Y} l{arrowSize},{arrowSize} 0,-{arrowSize} L{endX},{endY} l0,-{ry}', {
                X: this.x + rightArrowPosition - this.arrowSize,
                Y: this.y + this.height,
                endX: this.x + this.width,
                endY: this.y + this.height,
                arrowSize: this.arrowSize,
                ry: this.ry
            });
        }
        else {
            path += snap.format('L{X},{Y} a{rx},{ry} 0 0,0 {rx},-{ry}', {
                X: this.x + this.width - this.rx,
                Y: this.y + this.height,
                endX: this.x + this.width,
                rx: this.rx,
                ry: this.ry
            });
        }
        
        // Add top
        path += snap.format('l0,-{height} a{rx},{ry} 0 0,0 -{rx},-{ry} l-{width},0 a{rx},{ry} 0 0,0 -{rx},{ry}Z', {
            width: this.width - 2 * this.rx,
            height: this.height - 2 * this.ry,
            rx: this.rx,
            ry: this.ry
        });
        
        return path;
    };
   
    RectWithArrows.prototype.calculateArrow = function (position) {
        return snap.format('L{x},{y} l{arrowSize},{arrowSize} {arrowSize},-{arrowSize}', {
            x: this.x + position - this.arrowSize,
            y: this.y + this.height,
            arrowSize: this.arrowSize
        });
    };
    
    RectWithArrows.prototype.calculatePathWithoutArrows = function () {
        return snap.format('M{x},{y} a{rx},{ry} 0 0,0 {rx},{ry} l{width},0 a{rx},{ry} 0 0,0 {rx},-{ry} l0,-{height} a{rx},{ry} 0 0,0 -{rx},-{ry} l-{width},0 a{rx},{ry} 0 0,0 -{rx},{ry}Z', {
            x: this.x,
            y: this.y + this.height - this.ry,
            width: this.width - 2 * this.rx,
            height: this.height - 2 * this.ry,
            rx: this.rx,
            ry: this.ry
        });
    };

    return RectWithArrows;
});