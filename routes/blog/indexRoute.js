const url = require('url');

module.exports = function(router) {
    router.get('/', (req, res) => {
        res.render('index.html');
    });
}