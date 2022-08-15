const url = require('url');
const {JournalModel} = require('../../model/journalModel');

// const pageSize = 6; // 日志页面每页条数

module.exports = function(router) {
    router.get('/journal', (req, res) => {
        // const urlObj = url.parse(req.url, true);
        // const {query} = urlObj;
        // const currentPage = query.page ? query.page / 1 : 1;
        // JournalModel.count({}, (err, count) => {
        //     if (err) {
        //         return res.send({status: 400, error: err})
        //     }
        //     const totalPage = count % pageSize === 0 ? count / pageSize : Math.floor(count / pageSize) + 1;
        //     JournalModel.find({}).skip((currentPage / 1 - 1) * pageSize).limit(pageSize || 10).sort({createTime: -1}).exec((err, data) => {
        //         if (err) {
        //             return res.send({status: 400, error: err})
        //         }
        //         return res.render('journal.html', {
        //             journalList: data,
        //             currentPage,
        //             totalPage,
        //         })
        //     })
        // })
        
        return res.render('journal.html');
    });

    router.get('/journal/reqJournalData', (req, res) => {
        const urlObj = url.parse(req.url, true);
        const {query: {pageNo, pageSize}} = urlObj;
        JournalModel.count({}, (err, count) => {
            if (err) {
                return res.send({status: 400, error: err})
            }
            const totalPage = count % pageSize === 0 ? count / pageSize : Math.floor(count / pageSize) + 1;
            JournalModel.find({}).skip((pageNo / 1 - 1) * pageSize).limit(pageSize || 10).sort({createTime: -1}).exec((err, data) => {
                if (err) {
                    return res.send({status: 400, error: err})
                }
                return res.send({
                    status: 200, 
                    result: {
                        dataList: data,
                        pageInfo: {
                            totalPage
                        }
                    }
                })
                // return res.render('journal.html');
            })
        })
    })
}