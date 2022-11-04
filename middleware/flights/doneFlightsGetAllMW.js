const requireOption = require("../requireOption");

/**
 * Lekéri az adatbázisból az összes járatot és eltárolja azokat amik már teljesítődtek. (done flights)
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {

    const RouteModel = requireOption(objectrepository, "RouteModel");
    return function (req, res, next) {

        RouteModel.find({}, (err, routes) => {
            if (err){
                return next(err);
            }

            res.locals.routes = routes;
            return next();
        });
    };
};