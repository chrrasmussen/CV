define([
    './module'
], function (module) {
    'use strict';
    
    module.controller('EventCtrl', function ($scope, $routeParams, event) {
        $scope.title = event.title;
        $scope.startAt = event.startAt;
        $scope.endAt = event.endAt || 'Today';
        $scope.isPeriod = event.type === 'period';
        $scope.isMilestone = event.type === 'milestone';
        
        console.log('EventCtrl loaded');
    });
});