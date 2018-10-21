// 程序入口文件
// 导包
const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'news'
};

// 实例化app对象
const app = express();
const sessionStore = new MySQLStore(options);

// 配置包
app.engine('html', require('express-art-template'));
// 统一配置静态资源
app.use('/node_modules', express.static('./node_modules'));
app.use('/public', express.static('./public'))
app.use(bodyParser.urlencoded({ extended: false }));
// 配置express-session
app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));

// 挂载路由
app.use(router);
// 统一处理错误的中间件
app.use((err,req,res,next) => {
	res.send({
		code:500,
		message:'err.message'
	});
});

// 绑定端口
app.listen(12346,() => {
    console.log('run it at localhost:12346');
})