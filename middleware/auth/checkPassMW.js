
/**
 * Ellenőrzi a jelszót, hogy helyes-e.
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof req.body.password === "undefined") {
            return next();
        }

        if (req.body.password === "jelszo1234") {
            req.session.loggedin = true;
            return req.session.save(error => {
                return res.redirect("/aircrafts");
            });
        }

        res.locals.error = "Wrong password!";
        return next();
    };
};