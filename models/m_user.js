
// 导入
const db = require('../tools/db_config');

// 验证邮箱
const checkEmail = function(email,callback){
    const sql = "SELECT * FROM `users` WHERE `email`=?";
    db.query(sql,email,(err,data) => {
        if(err){
           return callback(err,null);
        }
        callback(null,data);
    });
}

// 验证昵称
exports.checkNickname = (nickname,callback) => {
    const sql = 'SELECT * FROM `users` WHERE `nickname`=?';
    db.query(sql,nickname,(err,data) => {
        if(err){
            return callback(err);
        }
        callback(null,data);
    })
}

// 创建新用户
exports.insertUser = (body,callback) => {
    const sql = 'INSERT INTO `users` SET ?';
    db.query(sql,body,(err,data) =>{
        if(err){
            return callback(err);
        }
        callback(null,data);
    }) 
}

// 导出
exports.checkEmail = checkEmail;