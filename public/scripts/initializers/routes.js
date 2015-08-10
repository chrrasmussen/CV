define([
    '../app',
    '../utils'
], function (app, utils) {
    'use strict';
    
    app.config(function($routeProvider) {
        $routeProvider.when('/', {
            resolve: {
                _: function ($location, api) {
                    api.getTimelineData().then(function (timelineData) {
                        var firstEvent = utils.findFirstEvent(timelineData);
                        $location.path('/' + firstEvent.id);
                    });
                }
            }
        });
        
        $routeProvider.when('/:id', {
            templateUrl: 'partials/event.html',
            controller: 'EventCtrl',
            resolve: {
                timelineData: function (api) {
                    return api.getTimelineData();
                }
            }
        });
    });
});