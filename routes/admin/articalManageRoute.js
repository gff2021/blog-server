const mongoose = require('mongoose');
const { ArticalModel } = require('../../model/articalModel');

const baseURL = '/articalClassify/articalManage';

module.exports = function (router) {
	// 查询文章列表
	router.post(baseURL + '/queryArticalList', (req, res) => {
		const { pageInfo: { pageNo, pageSize } } = req.body;
		ArticalModel.count({}, (err, count) => {
			if (err) {
				return res.send({
					status: 400,
					msg: err
				})
			};
			ArticalModel.find().populate('category').skip((pageNo - 1) * pageSize || 0).limit(pageSize || 10).sort({ createTime: -1 }).exec((err, data) => {
				if (err) {
					return res.send({
						status: 400,
						msg: err
					})
				}
				return res.send({
					status: 200,
					result: {
						dataList: data,
						total: count
					},
				});
			})
		})
	})

	// 新建文章
	router.post(baseURL + '/createArtical', (req, res) => {
		const { title, categoryId, status, content, createTime } = req.body;
		ArticalModel.create({
			_id: new mongoose.Types.ObjectId(),
			title,
			category: categoryId,
			status,
			content,
			createTime
		}).then(dataList => {
			return res.send({
				status: 200,
				msg: '新建成功',
				result: {
					dataList
				}
			});
		}).catch(err => {
			console.log(err);
			return res.send({
				status: 400,
				msg: '服务器错误，请联系管理员'
			})
		})
	});

	// 编辑文章
	router.post(baseURL + '/updateArtical', (req, res) => {
		const { id, title, categoryId, status, content, updateTime } = req.body;
		ArticalModel.updateOne({ _id: id }, {
			title,
			category: categoryId,
			status,
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

	// 删除文章
	router.post(baseURL + '/deleteArtical', (req, res) => {
		const { id } = req.body;
		ArticalModel.deleteOne({ _id: id }, (err, data) => {
			if (err) {
				return res.send({
					status: 400,
					msg: '删除失败'
				});
			};
			return res.send({
				status: 200,
				msg: '删除成功'
			});
		})
	})
}