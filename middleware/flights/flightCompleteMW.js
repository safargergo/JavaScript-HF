
/**
 * A járatot átállítja teljesítetté, és tovább irányít a listázó oldalra.
 * @param {*} objectrepository 
 * @returns 
 */
 module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.locals.route === "undefined") {
            return next();
        }

        res.locals.route.Done = true;

        res.locals.route.save((err) => {
            if (err) {
                return next(err);
            }
            return res.redirect(`/futureflights/${res.locals.aircraft._id}`)
        })
    };
};