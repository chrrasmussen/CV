define([
], function () {
    'use strict';
    
    return {
        findFirstEvent: findFirstEvent,
        findEventById: findEventById
    };
    
    function findFirstEvent(data) {
        return findEvent(data, function (event) {
            return (event.type === 'period' && !event.endAt);
        });
    }
    
    function findEventById(data, eventID) {
        return findEvent(data, function (event) {
            return (event.id === eventID);
        });
    }
    
    function findEvent(data, predicate) {
        for (var dataKey in data) {
            var category = data[dataKey];
            
            for (var eventKey in category.content) {
                var event = category.content[eventKey];
                
                var foundEvent = predicate(event);
                if (foundEvent) {
                    return event;
                }
            }
        }
    }
});