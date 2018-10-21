const db = require('../tools/db_config');
// 查找话题
exports.findTopics = (callback) => {
    const sql = 'SELECT * FROM `topics` ORDER BY `createdAt` DESC';
    db.query(sql,(err,data) => {
        if(err){
           return callback(err,null);
        }
        callback(null,data);
    })
}


// 添加话题
exports.addTopic = (body,callback) =>{
    const sql = 'INSERT INTO `topics` SET ?';
    db.query(sql,body,(err,data) => {
        if(err){
            return callback(err,null);
        }
        callback(null,data);
    })
}

// 根据ID找话题
exports.findTopicID = (topicID,callback) => {
    const sql = 'SELECT * FROM `topics` WHERE `id`=?';
    db.query(sql,topicID,(err,data) => {
        if(err){
            return callback(err,data);
        }
        callback(null,data);
    })
}

// 编辑修改
exports.updateTopicID = (body,topicID,callback) => {
    const sql = 'UPDATE `topics` SET `title`=?, `content`=? WHERE `id`=?';
    db.query(sql,[
        body.title,
        body.content,
        topicID],(err,data) => {
        if(err){
            return callback(err);
        }
        callback(null,data);
    })
}

// 删除话题
exports.deleTopicID = (topicID,callback) =>{
    const sql = 'DELETE FROM `topics` WHERE `id`=?';
    db.query(sql,topicID,(err,data) => {
        if(err){
            return callback(err);
        }
        callback(null,data);
    })
}