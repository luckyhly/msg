// 路由模块--处理分发
// 导包
const express = require('express');
const c_user = require('./controllers/c_user');

// 获取路由对象express.Router（）
const router = express.Router();

// router监听请求
router.get('/', c_user.showSignin);

// 导出路由对象
module.exports = router;
