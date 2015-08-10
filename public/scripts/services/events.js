define([
    './module'
], function (module) {
    'use strict';
    
    module.factory('events', function($http) {
        var fetchData = $http.get('data/en.json');
        
        function getBasicInfo() {
            return fetchData.then(function (response) {
                return response.data.basicInfo;
            });
        }
        
        function getTimelineData() {
            return fetchData.then(function (response) {
                return response.data.timeline;
            });
        }
        
        return {
            getBasicInfo: getBasicInfo,
            getTimelineData: getTimelineData
        };
    });
});