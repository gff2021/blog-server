const mongoose = require('mongoose');
const { JournalModel } = require('../../model/journalModel');

const baseURL = '/journal';

module.exports = function (router) {
    // 处理查询日志
    router.post(baseURL + '/queryJournalList', (req, res) => {
        const {
            pageInfo: {
                pageNo,
                pageSize
            }
        } = req.body;
        JournalModel.count({}, (err, count) => {
            if (err) {
                return res.send({ status: 400, error: err })
            };
            JournalModel.find({}).skip((pageNo - 1) * pageSize).limit(pageSize || 10).sort({ createTime: -1 }).exec((err, data) => {
                if (err) {
                    return res.send({ status: 400, msg: '服务器错误，请联系管理员' });
                }
                res.send({
                    status: 200,
                    result: {
                        dataList: data,
                        total: count
                    },
                });
            })
        });
    })

    // 处理新增日志
    router.post(baseURL + '/createJournal', (req, res) => {
        const {
            abstract,
            content,
            createTime
        } = req.body;
        if (!abstract) {
            return res.send({
                status: 400,
                msg: '摘要不能为空'
            })
        };
        JournalModel.create({
            abstract,
            content,
            createTime
        }).then((dataList) => {
            res.send({
                status: 200,
                msg: '新建成功',
                result: {
                    dataList
                }
            });
        }).catch((error) => {
            res.send({
                status: 400,
                msg: error
            })
        })
    })

    // 处理编辑日志
    router.post(baseURL + '/updateJournal', (req, res) => {
        const {
            id,
            abstract,
            content,
            updateTime
        } = req.body;
        JournalModel.updateOne({ _id: id }, {
            abstract,
            content,
            updateTime
        }, (err, data) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '保存失败'
                })
            };
            return res.send({
                status: 200,
                msg: '保存成功'
            })
        })
    })

    // 处理删除日志
    router.post(baseURL + '/deleteJournal', (req, res) => {
        const { id } = req.body;
        JournalModel.deleteOne({ _id: id }, (err, data) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '服务器错误，请联系管理员'
                });
            };
            return res.send({
                status: 200,
                msg: '删除成功'
            });
        })
    })
}