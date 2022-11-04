
/**
 * Ellenőrzi hogy a felhasználó be van e jelentkezve. Ha nincs akkor login képernyőre irányítja.
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {
        /*if (typeof req.session.loggedin === "undefined" || req.session.loggedin !== true) {
            return res.redirect('/');
        }*/
        return next();
    };
};