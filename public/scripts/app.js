define([
    'angular',
    'angular-route',
    'angular-animate',
    './controllers/index',
    './directives/index',
    './filters/index',
    './services/index'
], function (angular) {
    'use strict';
    
    return angular.module('cv', ['ngRoute', 'ngAnimate', 'cv.services', 'cv.controllers', 'cv.filters', 'cv.directives']);
});