const express = require('express');
const loadLoginRouter = require('./admin/loginRoute');
const tagManageRouter = require('./admin/tagManageRoute');
const articalManageRouter = require('./admin/articalManageRoute');
const loadJournalRouter = require('./admin/journalRoute');
const albumManageRouter = require('./admin/albumManageRoute');

const admin = express.Router();

loadLoginRouter(admin);
tagManageRouter(admin);
articalManageRouter(admin);
loadJournalRouter(admin);
albumManageRouter(admin);

module.exports = admin;