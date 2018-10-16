
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'news'
});
// connection.connect();

// 函数模块

const showSignin = (req, res) => {
    // res.send('控制器处理函数');
    res.render('signin.html');
};

// 表单提交
exports.handleSignin = (req, res) => {
    // console.log('发送成功');
    // req.body获取表单数据
    const body = req.body;
    // console.log(body);
    // 先验证邮箱
    const sql = "SELECT * FROM `users` WHERE `email`=?";
    connection.query(sql, body.email, (err, data) => {
        if (err) {
            return res.send({
                code:500,
                message:'服务器错误'
            });
        }
        // console.log(data);
        // 如果邮箱不存在
        if (!data[0]) {
            return res.send({
                code:1,
                message:'email不存在'
            });
        }
        // 验证密邮箱存在，验证密码
        if (data[0].password != body.password) {
            return res.send({
                code:2,
                message:'密码错误'
            });
        }
        // 都正确，跳转
        // res.send('登录成功');
        res.send({
            code: 200,
            message: '登录成功'
        });
    })


};

// 导出所有方法
exports.showSignin = showSignin;
