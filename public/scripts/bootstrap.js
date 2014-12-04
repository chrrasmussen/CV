define([
    'require',
    'angular',
    './app',
    './initializers/html5mode',
    './initializers/routes',
    './ga'
], function (require, angular) {
    'use strict';
    
    require([
        'domReady!'
    ], function (document) {
        angular.bootstrap(document, ['cv']);
    });
});