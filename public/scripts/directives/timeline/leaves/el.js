define([
    '../component'
], function (Component) {
    'use strict';
    
    function El(paper, animationDuration, type) {
        Component.call(this, paper, animationDuration);
        
        this.type = type;
        this.el = null;
        this.attr = {};
    }
    
    El.prototype = Object.create(Component.prototype);
    El.prototype.constructor = El;
    
    El.prototype.getNode = function () {
        if (!this.el) {
            this.el = this.paper.el(this.type).attr(this.getAttr());
        }
        
        return this.el;
    };
    
    El.prototype.update = function (animate) {
        if (!this.el) {
            this.getNode();
        }
        else {
            if (animate) {
                this.el.animate(this.getAttr(), this.animationDuration);
            }
            else {
                this.el.attr(this.getAttr());
            }
        }
    };
    
    El.prototype.getAttr = function () {
        return this.attr;
    };
    
    return El;
});