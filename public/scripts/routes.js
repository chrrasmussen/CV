define([
    './app'
], function (app) {
    'use strict';
    
//    app.config(function($locationProvider) {
//        $locationProvider.html5Mode(true);
//    });
    
    app.config(function($routeProvider) {
        $routeProvider.when('/:id', {
            templateUrl: 'partials/event.html',
            controller: 'EventCtrl',
            resolve: {
                event: function ($route, $q, events) {
                    var eventID = $route.current.params.id;
                    
                    var deferred = $q.defer();
                    
                    events.fetch().success(function () {
                        var event = findEvent(events.data, eventID);
                        if (event) {
                            deferred.resolve(event);
                        }
                        else {
                            deferred.reject();
                        }
                    }).error(function () {
                        deferred.reject();
                    });
                    
                    return deferred.promise;
                }
            }
        });
        
        $routeProvider.otherwise({
            redirectTo: '/ntnu'
        });
    });
    
    function findEvent(data, eventID) {
        var currentEvent;
        data.forEach(function (category) {
            category.content.forEach(function (event) {
                if (event.id === eventID) {
                    currentEvent = event;
                }
            });
        });
        
        return currentEvent;
    }
});