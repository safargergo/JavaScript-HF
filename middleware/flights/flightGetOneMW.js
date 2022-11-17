const requireOption = require("../requireOption");

/**
 * Lekéri az adatbázisból az adott id-jú flight-hoz tartozó adatokat.
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
    const RouteModel = requireOption(objectrepository, "RouteModel");
    return function (req, res, next) {
        RouteModel.findOne({ _id: req.params.flightid}, (err, route) => {
            if (err){
                return next(err);
            }
            if (!route){
                return next(err);
            }

            res.locals.route = route;
            return next();
        });
        /*res.locals.route = {
                _id: "id1",
                Start: "city A",
                Destination: "city B",
                Distance: "123 km",
                Departure: "2022-09-30 12:15",
                Arrival: "2022-09-30 15:00"
            }
        return next();*/
    };
};