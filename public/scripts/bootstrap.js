define([
    'require',
    'angular',
    './app',
    './routes',
], function (require, angular) {
    'use strict';
    
    require([
        'domReady!'
    ], function (document) {
        angular.bootstrap(document, ['cv']);
    });
});