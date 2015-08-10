define([
    './module'
], function (module) {
    'use strict';
    
    module.controller('EventCtrl', function ($scope, $location, $routeParams, api) {
        api.getTimelineData().then(function (data) {
            // If no ID is set, navigate to default event
            if (!$routeParams.id) {
                var firstEvent = findFirstEvent(data);
                $location.path('/' + firstEvent.id);
                return;
            }

            // Find event. Otherwise stop
            var event = findEventById(data, $routeParams.id);
            if (!event) {
                return;
            }

            $scope.event = event;

            $scope.isPeriod = (event.type === 'period');
            $scope.isMilestone = (event.type === 'milestone');

            $scope.$emit('setBackgroundColor', event.backgroundColor, event.normalTextColor);

            console.log('EventCtrl loaded');
        });
    });
    
    function findEventById(data, eventID) {
        return findEvent(data, function (event) {
            return (event.id === eventID);
        });
    }
    
    function findFirstEvent(data) {
        return findEvent(data, function (event) {
            return (event.type === 'period' && !event.endAt);
        });
    }
    
    function findEvent(data, predicate) {
        for (var dataKey in data) {
            var category = data[dataKey];
            
            for (var eventKey in category.content) {
                var event = category.content[eventKey];
                
                var foundEvent = predicate(event);
                if (foundEvent) {
                    return event;
                }
            }
        }
    }
});