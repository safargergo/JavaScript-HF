const requireOption = require('../requireOption');
/**
 * Menti a járat adatait az adatbázisba.
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {

    const RouteModel = requireOption(objectrepository, "RouteModel");
    return function (req, res, next) {
        if (typeof req.body.Start === "undefined"
            || typeof req.body.Destination === "undefined"
            || typeof req.body.Distance === "undefined"
            || typeof req.body.Departure === "undefined"
            || typeof req.body.Arrival === "undefined") 
            {
            return next();
        }
        if (typeof res.locals.route == "undefined") {
            res.locals.route = new RouteModel();
        }

        res.locals.route.Start = req.body.Start;
        res.locals.route.Destination = req.body.Destination;
        res.locals.route.Distance = req.body.Distance;
        res.locals.route.Departure = req.body.Departure;
        res.locals.route.Arrival = req.body.Arrival;
        res.locals.route.Done = false;
        res.locals.route._Aircraft = res.locals.aircraft._id;

        res.locals.route.save((err) => {
            if (err) {
                return next(err);
            }
            return res.redirect(`/futureflights/${res.locals.aircraft._id}`)
        })
    };
};