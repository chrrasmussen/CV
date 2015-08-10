define([
    '../app'
], function (app) {
    'use strict';
    
    app.config(function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/event.html',
            controller: 'EventCtrl'
        });
        
        $routeProvider.when('/:id', {
            templateUrl: 'partials/event.html',
            controller: 'EventCtrl'
        });
        
//        $routeProvider.otherwise({
//            redirectTo: '/index'
//        });
    });
});