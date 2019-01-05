// 依赖模块
const express = require('express');
const router = express.Router();

// 汇总路由
    // 首页路由
const home = require('./route/controllers/home');
const account = require('./route/controllers/account');

// 首页展示
router.get('/', home.index);
router.get('/login',account.login)
module.exports = router;