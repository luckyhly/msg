
const m_topic = require('../models/m_topic');
const moment = require('moment');

// 话题页
exports.topicShow = (req, res,next) => {

    m_topic.findTopics(function (err, data) {
        if (err) {
            next(err);
        }
        res.render('index.html',{
            topics:data,
            user:req.session.user
        });
    })
    
}

// 添加话题
exports.createTopic = (req,res,next) => {
    res.render('topic/create.html');
}

// 
exports.handleCreateTopic = (req,res,next) => {
    const body = req.body;
    // 获取当前时间，moment包
    body.createdAt = moment().format();
    // 给话题添加userid
    body.userId = req.session.user.id;


    m_topic.addTopic(body,(err,data) => {
        if(err){
            next(err);
        }
        res.send({
            code:200,
            message:'添加成功'
        })
    });
}

// 展示话题详情页
exports.detailShow = (req,res,next) => {
    // 获取动态路由中的值
    const topicID = req.params.topicID;
    // console.log(req.params.topicID);
    m_topic.findTopicID(topicID,(err,data) => {
        if(err){
            next(err);
        }
        res.render('topic/show.html',{
            topic:data[0]
        });
    })
    
}

// 编辑页
exports.showEdit = (req,res,next) => {
    const topicID = req.params.topicID;
    m_topic.findTopicID(topicID,(err,data) => {
        if(err){
            next(err);
        }
        res.render('topic/edit.html',{
            topic:data[0]
        })
    })
}

// 编辑修改
exports.handleEdit = (req,res,next) => {
    const body = req.body;
    const topicID = req.params.topicID;
    m_topic.updateTopicID(body,topicID,(err,data) => {
        if(err){
            next(err);
        }
        res.send({
            code:200,
            message:'编辑成功'
        })
    })
}

// 删除话题
exports.deleTopic = (req,res,next) => {
    const topicID = req.params.topicID;
    m_topic.deleTopicID(topicID,(err,data) => {
        if(err){
            next(err);
        }
        res.send({
            code:200,
            message:'删除成功'
        })
    })
}