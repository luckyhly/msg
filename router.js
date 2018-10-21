// 路由模块--处理分发
// 导包
const express = require('express');
const c_user = require('./controllers/c_user');
const c_topic = require('./controllers/c_topic');
// 获取路由对象express.Router（）
const router = express.Router();

// router监听请求
router.get('/', c_user.showSignin)
      .post('/',c_user.handleSignin)
      .get('/topic',c_topic.topicShow)
      .get('/topic/create',c_topic.createTopic)
      .post('/createTopic',c_topic.handleCreateTopic)
    //   动态路由
      .get('/topic/:topicID',c_topic.detailShow)
      .get('/signout',c_user.handleSignout)
      .get('/topic/edit/:topicID',c_topic.showEdit)
      .post('/topic/:topicID/edit',c_topic.handleEdit)
      .post('/topic/:topicID/delete',c_topic.deleTopic)
      .get('/signup',c_user.showSignup)
      .post('/signup',c_user.handleSignup);
// 导出路由对象
module.exports = router;
