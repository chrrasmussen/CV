define([
    '../app'
], function (app) {
    'use strict';

    app.config(function($routeProvider) {
        $routeProvider.when('/', {
            resolve: {
                _: function ($location, api) {
                    api.getTimelineData().then(function (timelineData) {
                        if (timelineData.initialEventId) {
                            $location.path('/' + timelineData.initialEventId);
                        }
                    });
                }
            }
        });

        $routeProvider.when('/:id', {
            templateUrl: 'partials/event.html',
            controller: 'EventCtrl',
            resolve: {
                timelineData: function (api) {
                    return api.getTimelineData().then(function (timelineData) {
                        return timelineData.timeline;
                    });
                }
            }
        });
    });
});
