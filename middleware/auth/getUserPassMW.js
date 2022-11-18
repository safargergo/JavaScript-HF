const requireOption = require('../requireOption');

/**
 * Beállítja a felhasználó új jelszavát.
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository, "UserModel");
    return function (req, res, next) {
        if (typeof req.body.Email === "undefined"
            || typeof req.body.Username === "undefined") 
            {
            return next();
        }

        if (req.body.Email === "" || req.body.Username === ""){
            res.locals.error = "Fill out all fields!";
            return next();
        }

        UserModel.findOne({ Email: req.body.Email }, (err, user) => {
            if (err){
                return next(err);
            } else if (!user){
                res.locals.error = "This Email is not registred!";
                return next();
            }
            UserModel.findOne({ Username: req.body.Username }, (err, user2) => {
                if (err){
                    return next(err);
                } else if (!user2){
                    res.locals.error = "This username is not used!";
                    return next();
                }

                if (user.Email === user2.Email && user.Username === user2.Username) {
                    console.log(`A ${user.Username} - ${user.Email} felhasználónév-eMail pároshoz tartozó jelszó: `);
                    console.log(user.Password);
                    res.locals.error = "jelszo elkuldve";
                    return next();
                } else {
                    res.locals.error = "The Username and Email not belonging to each other!"
                    return next();
                }

            });
            
        });

    };
};