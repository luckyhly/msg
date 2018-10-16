// 程序入口文件
// 导包
const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
// 返回app
const app = express();

// 配置包
app.engine('html', require('express-art-template'));
// 统一配置静态资源
app.use('/node_modules', express.static('./node_modules'));
app.use('/public', express.static('./public'))
app.use(bodyParser.urlencoded({ extended: false }));


// 挂载路由
app.use(router);

// 绑定端口
app.listen(12346,() => {
    console.log('run it at localhost:12346');
})