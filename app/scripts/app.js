define([
    'angular',
    'angular-route',
    './controllers/index',
    './directives/index',
    './filters/index',
    './services/index'
], function (angular) {
    'use strict';
    
    return angular.module('cv', ['ngRoute', 'cv.services', 'cv.controllers', 'cv.filters', 'cv.directives']);
});