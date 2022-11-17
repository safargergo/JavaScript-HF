const requireOption = require("../requireOption");
/**
 * Lekéri az adatbázisból az összes járatot és eltárolja azokat amik még nem teljesítődtek. (future flights)
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
            Done: false
            }, (err, routes) => {
                if (err){
                    return next(err);
                }

                res.locals.routes = routes;
                return next();
        });
    };
};