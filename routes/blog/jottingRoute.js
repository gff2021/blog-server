const url = require('url');

module.exports = function(router) {
    router.get('/jotting', (req, res) => {
        res.render('jotting.html');
    });
}