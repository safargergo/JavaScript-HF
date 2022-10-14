
/**
 * Ha hibás a felhasználónév vagy a jelszó, akkor ezt majd templating-gel jelzi a user-nek.
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};