const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// 设计用户集合结构
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 7
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true // admin为超级管理员，normal为普通用户
    },
    state: {
        type: Number,
        default: 1 // 用户状态，0禁用状态，1启用状态
    }
})

// 创建用户集合
const UserModel = mongoose.model('User', userSchema);

// function createUser(pwd) {
//     let md5 = crypto.createHash('md5');
//     let newPas = md5.update(pwd).digest('hex');
//     // 创建一个初始用户
//     User.create({
//         username: '粉条小太爷',
//         email: '3204966069@qq.com',
//         password: newPas,
//         role: 'admin',
//         state: 1
//     }).then(() => {
//         console.log('用户创建成功');
//     }).catch((err) => {
//         console.log('用户创建失败', err);
//     })
// }
// createUser('123456');

module.exports = {
    UserModel
}