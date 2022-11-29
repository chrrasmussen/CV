define([
    './module',
    '../utils'
], function (module, utils) {
    'use strict';
    
    module.controller('EventCtrl', function ($scope, $location, $routeParams, timelineData) {
        // Find event. Otherwise stop
        var event = utils.findEventById(timelineData, $routeParams.id);
        if (!event) {
            return;
        }

        $scope.event = event;

        $scope.isPeriod = (event.type === 'period');
        $scope.isMilestone = (event.type === 'milestone');

        $scope.$emit('setBackgroundColor', event.backgroundColor, event.bodyTextColor);

        console.log('EventCtrl loaded');
    });
});