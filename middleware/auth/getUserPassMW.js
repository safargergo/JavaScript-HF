const requireOption = require('../requireOption');

/**
 * Beállítja a felhasználó új jelszavát.
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository, "UserModel");
    return function (req, res, next) {
        //res.locals.auth = "undefined";
        if (typeof req.body.Email === "undefined"
            || typeof req.body.Username === "undefined") 
            {
            //console.log(req.body.Email);
            return next();
        }

        if (req.body.Email === "" || req.body.Username === ""){
            // töltse ki mindegyik mezőt!
            res.locals.error = "Fill out all fields!";
            return next();
        }

        UserModel.findOne({ Email: req.body.Email }, (err, user) => {
            if (err){
                return next(err);
            } else if (!user){
                //res.locals.auth.vanmarilyenuser = "nincs";
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
                    console.log(`A ${user.username} - ${user.Email} felhasználónév-eMail pároshoz tartozó jelszó: `);
                    console.log(user.Password);
                    res.locals.error = "jelszo elkuldve";
                    return next();
                } else {
                    res.locals.error = "The Username and Email not belonging to each other!"
                    return next();
                }

                /*res.locals.user = new UserModel();
                res.locals.user.Email = req.body.Email;
                res.locals.user.Username = req.body.Username;
                res.locals.user.Password = req.body.Password;

                res.locals.user.save((err) => {
                    if (err){
                        return next(err);
                    } 
                    //console.log("db-be mentve a regisztracio")
                    return res.redirect("/");
                })*/
            });
            
        });

    };
};