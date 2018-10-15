// 程序入口文件
// 导包
const express = require('express');
const router = require('./router');

// 返回app
const app = express();

// 挂载路由
app.use(router);

// 绑定端口
app.listen(12346,() => {
    console.log('run it at localhost:12346');
})