define([], function () {
    'use strict';
    
    function lengthBetweenDates(startAt, endAt, lengthPerMonth) {
        var startAtTime = Date.parse(startAt);
        var endAtTime = Date.parse(endAt);
        var monthInMilliseconds = (30.4375 * 24 * 60 * 60 * 1000);
        return (endAtTime - startAtTime) / monthInMilliseconds * lengthPerMonth;
    }
    
    return {
        lengthBetweenDates: lengthBetweenDates
    };
});