const requireOption = require('../requireOption');

/**
 * Beállítja a felhasználó új jelszavát.
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository, "UserModel");
    return function (req, res, next) {
        if (res.locals.hianyzokitoltes === "van"){
            return next();
        }
        if (res.locals.hibasjelszo === "van"){
            return next();
        }
        if (res.locals.hibasemail === "van"){
            return next();
        }
        if (res.locals.hibasusername === "van"){
            return next();
        }

        return next();
    };
};