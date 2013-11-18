define([
    './el'
], function (El) {
    'use strict';
    
    function Text(paper, animationDuration) {
        El.call(this, paper, animationDuration, 'text');
        
        this.text = '';
    }
    
    Text.prototype = Object.create(El.prototype);
    Text.prototype.constructor = Text;
    
    Text.prototype.getNode = function () {
        if (!this.el) {
            this.el = this.paper.text(0, 0, this.text).attr(this.attr); // TODO: Must fix this. Attributes are not dynamic!
        }
        
        return this.el;
    };
    
    return Text;
});