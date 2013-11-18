define([
    './el'
], function (El) {
    'use strict';
    
    function Image(paper, animationDuration) {
        El.call(this, paper, animationDuration, 'image');
        
        this.imageSrc = '';
    }
    
    Image.prototype = Object.create(El.prototype);
    Image.prototype.constructor = Image;
    
    Image.prototype.getNode = function () {
        if (!this.el) {
            this.el = this.paper.image(this.imageSrc, this.attr.x, this.attr.y, this.attr.width, this.attr.height).attr(this.attr); // TODO: Must fix this. Attributes are not dynamic!
        }
        
        return this.el;
    };
    
    return Image;
});