const url = require('url');

module.exports = function(router) {
    router.get('/picture', (req, res) => {
        res.render('picture.html');
    });
}