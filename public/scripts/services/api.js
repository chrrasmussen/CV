define([
    './module'
], function (module) {
    'use strict';

    module.factory('api', function($http) {
        var fetchData = $http.get('data/en.json');

        function getBasicInfo() {
            return fetchData.then(function (response) {
                return response.data.basicInfo;
            });
        }

        function getTimelineData() {
            return fetchData.then(function (response) {
                return {
                    initialEventId: response.data.initialEventId,
                    timeline: response.data.timeline
                };
            });
        }

        return {
            getBasicInfo: getBasicInfo,
            getTimelineData: getTimelineData
        };
    });
});
