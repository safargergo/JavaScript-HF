const requireOption = require('../requireOption');

/**
 * Ha hibás a felhasználónév vagy a jelszó, akkor ezt majd templating-gel jelzi a user-nek.
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository, "UserModel");
    return function (req, res, next) {
        if (typeof req.body.Email === "undefined"
            || typeof req.body.Username === "undefined"
            || typeof req.body.Password === "undefined"
            || typeof req.body.PasswordCheck === "undefined") 
            {
            return next();
        }

        if (req.body.Email === "" || req.body.Username === "" || req.body.Password === "" || req.body.PasswordCheck === ""){
            res.locals.error = "Fill out all fields!";
            return next();
        }
        if (!(req.body.Password === req.body.PasswordCheck)){
            res.locals.error = "The passwords not match!"
            return next();
        }
        if (req.body.Username.length < 4) {
            res.locals.error = "The username must be at least 4 char!";
            return next();
        }
        if (req.body.Password.length < 4) {
            res.locals.error = "The username must be at least 4 char!";
            return next();
        }

        UserModel.findOne({ Email: req.body.Email }, (err, user) => {
            if (err){
                return next(err);
            } else if (user){
                res.locals.error = "This Email is already registred!";
                return next();
            }
            UserModel.findOne({ Username: req.body.Username }, (err, user2) => {
                if (user2){
                    res.locals.error = "This username is already used!";
                    return next();
                }
                res.locals.user = new UserModel();
                res.locals.user.Email = req.body.Email;
                res.locals.user.Username = req.body.Username;
                res.locals.user.Password = req.body.Password;

                res.locals.user.save((err) => {
                    if (err){
                        return next(err);
                    } 
                    return res.redirect("/");
                })
            });
        });
    };
};