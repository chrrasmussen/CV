define([
    './module'
], function (module) {
    'use strict';
    
    module.controller('EventCtrl', function ($scope, $routeParams, event) {
        $scope.event = event;
        
        $scope.isPeriod = (event.type === 'period');
        $scope.isMilestone = (event.type === 'milestone');
        
        $scope.$emit('setBackgroundColor', event.backgroundColor, event.normalTextColor);
        
        console.log('EventCtrl loaded');
    });
});