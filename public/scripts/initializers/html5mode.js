define([
    '../app'
], function (app) {
    'use strict';
    
    app.config(function($locationProvider) {
        $locationProvider.html5Mode(true);
    });
});