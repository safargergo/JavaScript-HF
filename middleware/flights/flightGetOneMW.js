
/**
 * Lekéri az adatbázisból az adott id-jú flight-hoz tartozó adatokat.
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {

        res.locals.route = {
                _id: "id1",
                Start: "city A",
                Destination: "city B",
                Distance: "123 km",
                Departure: "2022-09-30 12:15",
                Arrival: "2022-09-30 15:00"
            }
        return next();
    };
};