const express = require('express');
const loadIndexRouter = require('./blog/indexRoute');
const loadJottingRouter = require('./blog/jottingRoute');
const loadPictureRouter = require('./blog/pictureRoute');
const loadJournalRouter = require('./blog/journalRoute');

const blog = express.Router();

// 加载首页路由
loadIndexRouter(blog);

// 加载随笔页路由
loadJottingRouter(blog);

// 加载图库路由
loadPictureRouter(blog);

// 加载日志页面路由
loadJournalRouter(blog);

module.exports = blog;