const requireOption = require("../requireOption");

/**
 * Lekéri az adatbázisból az összes járatot és eltárolja azokat amik már teljesítődtek. (done flights)
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {

    const RouteModel = requireOption(objectrepository, "RouteModel");
    return function (req, res, next) {
        if (res.locals.aircraft === "undefined") {
            return next();
        }

        RouteModel.find({
            _Aircraft: res.locals.aircraft._id,
            Done: true
            }, (err, routes) => {
                if (err) {
                    return next(err);
                }

                res.locals.routes = routes;
                return next();
        });
    };
};