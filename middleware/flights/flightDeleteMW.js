
/**
 * Elvégzi a járat törlését és tovább irányít a járatokat listázó oldalra.
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.locals.flight === "undefined") {
            return next();
        }

        res.locals.flight.remove(error => {
            if (error) {
                return next(error);
            }
            return res.redirect(`/futureflights/${res.locals.aircraft.id}`);
        });
    };
};