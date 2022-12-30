const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const blog = require('./routes/blog');
const admin = require('./routes/admin');

const port = 8080;

const app = express();

// 连接数据库
require('./model/connect');

// 配置跨域资源共享
app.use(cors());

// 配置模板引擎
app.engine('html', require('express-art-template'));

// 开放静态资源
app.use('/blog', express.static(path.join(__dirname, '/public')));

app.set('views', path.join(__dirname, '/views'));

// 配置session
app.use(session({ secret: 'gffのblog' }));

// 配置request.body以处理post请求
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '50mb' }));

// 拦截路由
app.use('/blog', blog);
app.use('/admin-blog-cms', admin);

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port} ...`);
});