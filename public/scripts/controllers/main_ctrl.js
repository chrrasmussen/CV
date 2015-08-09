define([
    './module'
], function (module) {
    'use strict';
    
    module.controller('MainCtrl', function ($scope, $http, $location) {
        $scope.timelineEndDate = calculateTimelineEndDate(new Date());
        
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
        
        function calculateTimelineEndDate(date) {
            var numberOfMonthsInTheFuture;
            if (date.getMonth() <= 1) {
                numberOfMonthsInTheFuture = 5 - date.getMonth();
            }
            else if (date.getMonth() > 1 && date.getMonth() <= 7) {
                numberOfMonthsInTheFuture = 11 - date.getMonth();
            }
            else if (date.getMonth() > 7) {
                numberOfMonthsInTheFuture = 11 - date.getMonth() + 6;
            }
            
            date.setMonth(date.getMonth() + numberOfMonthsInTheFuture + 1); // Will overflow to the next year automatically
            date.setDate(1); // First day of the month
            
            function pad(n) {
                return (n < 10) ? ('0' + n) : n;
            }
            
            return (date.getYear() + 1900)  + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate());
        }
        
        console.log('MainCtrl loaded');
    });
});