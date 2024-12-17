define([
], function () {
    'use strict';

    return {
        findEventById: findEventById,
        getCurrentDate: getCurrentDate
    };

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

    function getCurrentDate() {
        return new Date('2023-12-15'); // CV is not getting any more updates, so freeze the timeline to this date.
    }
});
