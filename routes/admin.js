const express = require('express');
const loadLoginRouter = require('./admin/loginRoute');
const tagManageRouter = require('./admin/tagManageRoute');
const articalManageRouter = require('./admin/articalManageRoute');
const loadJournalRouter = require('./admin/journalRoute');

const admin = express.Router();

loadLoginRouter(admin);
tagManageRouter(admin);
articalManageRouter(admin);
loadJournalRouter(admin);

module.exports = admin;