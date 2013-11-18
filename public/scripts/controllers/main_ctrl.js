define([
    './module'
], function (module) {
    'use strict';
    
    module.controller('MainCtrl', function ($scope, $http, $location) {
        $scope.log = function (message) {
            console.log(message);
        };
        
        $scope.showEvent = function (eventID) {
            $location.path('/' + eventID);
        };
        
        $scope.backgroundColor = 'white';
        $scope.textColor = '#333';
        
        $scope.$on('setBackgroundColor', function (event, backgroundColor, textColor) {
            $scope.backgroundColor = backgroundColor;
            $scope.textColor = textColor;
        });
        
        $scope.timelineData = [];
        $http.get('data/en.json').success(function (data) {
            $scope.timelineData = data;
        });
        
        // TODO: Temp
        $scope.lengthPerMonth = 40;
        $scope.adjustLengthPerMonth = function (lengthPerMonth) {
            $scope.lengthPerMonth = lengthPerMonth;
        };
        
        console.log('MainCtrl loaded');
    });
});