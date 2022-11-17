
/**
 * Elvégzi a járat törlését és tovább irányít a járatokat listázó oldalra.
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.locals.route === "undefined") {
            return next();
        }

        res.locals.route.remove((err) => {
            if (err) {
                return next(err);
            }
            return res.redirect(`/futureflights/${res.locals.aircraft._id}`);
        });
    };
};