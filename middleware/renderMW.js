
/**
 * Kirendereli a parameterben kapott html-t.
 * @param {*} objectrepository 
 * @param {*} html 
 * @returns 
 */
module.exports = function (objectrepository, viewName) {
    return function (req, res) {
        res.render(viewName, res.locals)
    };
};