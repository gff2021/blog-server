const crypto = require('crypto');
const { UserModel } = require('../../model/userModel');

module.exports = function (router) {
    // 处理登录请求
    router.post('/login', async (req, res) => {
        const { email, password } = req.body;
        if (email.trim().length == 0 || password.trim().length == 0) {
            return res.status(400).render('error.html', { msg: '邮箱或密码不正确' });
        };
        const user = await UserModel.findOne({ email: email });
        let md5 = crypto.createHash('md5');
        let newPass = md5.update(password).digest('hex');
        if (user) {
            if (user.password === newPass) {
                req.session.username = user.username;
                res.send({
                    status: 200,
                    msg: '登录成功',
                    result: {
                        user
                    }
                });
            } else {
                res.send({
                    status: 404,
                    msg: '邮箱或密码输入错误'
                })
            }
        } else {
            res.send({
                status: 404,
                msg: '邮箱不存在'
            });
        }
    });
}