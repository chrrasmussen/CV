define([], function () {
    'use strict';
    
    function Component(paper, animationDuration) {
        this.paper = paper;
        this.animationDuration = animationDuration;
    }
    
    Component.prototype.getNode = function () {};
    
    Component.prototype.update = function () {};
    
    return Component;
});