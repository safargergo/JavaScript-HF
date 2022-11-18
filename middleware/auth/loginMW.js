const requireOption = require('../requireOption');
/**
 * Ellenőrzi a jelszót, hogy helyes-e.
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository, "UserModel");
    return function (req, res, next) {
        if (typeof req.body.Username === "undefined"
            || typeof req.body.Password === "undefined") 
            {
            return next();
        }

        if (req.body.Username === "" || req.body.Password === ""){
            res.locals.error = "Fill out all fields!";
            return next();
        }

        UserModel.findOne({ Username: req.body.Username }, (err, result) => {
            if (err || !result) {
                res.locals.error = "Wrong username!"
              return next(err);
            }
            if (result.Password !== req.body.Password) {
                res.locals.error = "Wrong password";
                return next();
            }
            req.session.userid = result._id;
            req.session.loggedin = true;
            return res.redirect(`/aircrafts`);
        });
    };
};