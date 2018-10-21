
// 函数模块

const m_user = require('../models/m_user');
exports.showSignin = (req, res,next) => {
    // res.send('控制器处理函数');
    res.render('signin.html');
};

// 表单提交登录
exports.handleSignin = (req, res,next) => {
    // console.log('发送成功');
    // req.body获取表单数据
    const body = req.body;
   
    // 先验证邮箱
    m_user.checkEmail(body.email, (err, data) => {
        if (err) {
           next(err);
        }
        // console.log(data);
        // 如果邮箱不存在
        if (!data[0]) {
            return res.send({
                code: 1,
                message: 'email不存在'
            });
        }
        // 验证密邮箱存在，验证密码
        if (data[0].password != body.password) {
            return res.send({
                code: 2,
                message: '密码错误'
            });
        }

        req.session.user = data[0];
        // console.log(req.session.user);

        // 都正确，跳转
        // res.send('登录成功');
        res.send({
            code: 200,
            message: '登录成功'
        });
    })
};

// 退出
exports.handleSignout = (req, res,next) => {
    delete req.session.user;
    res.redirect('/');
}

// 创建
exports.showSignup = (req, res,next) => {
    res.render('signup.html');
}

// 注册
exports.handleSignup = (req, res,next) => {
    const body = req.body;
    // console.log(body);
    
    // 验证邮箱
    m_user.checkEmail(body.email, (err, data) => {
        if (err) {
            next(err);
        }
        // 验证邮箱已存在
        if (data[0]) {
            return res.send({
                code: 1,
                message: '邮箱已存在'
            })
        }
        //邮箱不存，验证昵称
        m_user.checkNickname(body.nickname, (err, data) => {
            if (err) {
                next(err);
            }
            if (data[0]) {
                return res.send({
                    code: 2,
                    message: '昵称已存在'
                })
            }
        //如果昵称不存在，创建新用户
        m_user.insertUser(body,(err,data) => {
            if(err){
                next(err);
            }
            res.send({
                code:200,
                message:'注册成功'
            })
        })

        })
    })
        

    }


// 导出所有方法
// exports.showSignin = showSignin;
