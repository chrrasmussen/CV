define([
    './module'
], function (module) {
    'use strict';
    
    module.factory('events', function($http) {
        var events = {};
        events.data = [];
        events.fetch = function () {
            return $http.get('data/en.json').success(function (data) {
                    events.data = data;
                });
        };
        
        return events;
    });
});