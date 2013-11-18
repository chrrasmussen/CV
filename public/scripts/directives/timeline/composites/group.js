define([
    '../component'
], function (Component) {
    'use strict';
    
    function Group(paper, animationDuration) {
        Component.call(this, paper, animationDuration);
        
        this.group = null;
        this.attr = {};
    }
    
    Group.prototype = Object.create(Component.prototype);
    Group.prototype.constructor = Group;
    
    Group.prototype.getNode = function () {
        if (!this.group) {
            var childNodes = this.getChildren().map(function (child) {
                return child.getNode();
            });
            
            this.group = this.paper.group.apply(this.paper, childNodes).attr(this.attr);
        }
        
        return this.group;
    };
    
    Group.prototype.update = function (animate) {
        this.getNode(); // TODO: Fix that it can update itself if children changes
    };
    
    Group.prototype.getChildren = function () {
        return [];
    };
    
    return Group;
});