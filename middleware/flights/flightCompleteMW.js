
/**
 * A járatot átállítja teljesítetté, és tovább irányít a listázó oldalra.
 * @param {*} objectrepository 
 * @returns 
 */
 module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};