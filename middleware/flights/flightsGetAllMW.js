
/**
 * Lekéri az adatbázisból az összes járatot és eltárolja azokat amik még nem teljesítődtek. (future flights)
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {

        res.locals.routes = [
            {
                _id: "id1",
                Start: "city A",
                Destination: "city B",
                Distance: "123 km",
                Departure: "2022-09-30 12:15",
                Arrival: "2022-09-30 15:00"
            },
            {
                _id: "id2",
                Start: "city B",
                Destination: "city C",
                Distance: "456 km",
                Departure: "2022-09-30 16:15",
                Arrival: "2022-09-30 19:00"
            }
        ]

        return next();
    };
};