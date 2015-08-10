define([
    './module'
], function (module) {
    'use strict';
    
    module.filter('age', function() {
        return function (dateString) {
            return calculateAge(new Date(dateString));
        };
    });
    
    // SOURCE: http://stackoverflow.com/a/21984136
    function calculateAge(birthday) {
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs);
        return Math.abs((ageDate.getYear() + 1900) - 1970);
    }
});