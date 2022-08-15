const mongoose = require('mongoose');
const { TagModel } = require('../../model/tagModel');

const baseURL = '/articalClassify/tagManage';

module.exports = function (router) {
	// 处理新建标签
	router.post(baseURL + '/createTag', (req, res) => {
		const { title, color, status, createTime } = req.body;
		if (!title) {
			return res.send({
				status: 400,
				msg: '无效的标签标题'
			})
		};
		TagModel.find({ $or: [{ title: title }, { color: color }] }).exec((err, data) => {
			if (err) {
				console.log(err);
				return res.send({
					status: 400,
					msg: '服务器错误，请联系管理员'
				})
			}
			if (data.length !== 0) {
				return res.send({
					status: 400,
					msg: '重复的标题或颜色'
				})
			}
			TagModel.create({
				_id: new mongoose.Types.ObjectId(),
				title,
				color,
				status,
				articalCount: 0,
				createTime
			}).then((dataList) => {
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
	});

	// 处理查询标签列表
	router.post(baseURL + '/queryTagList', (req, res) => {
		const { pageInfo: { pageNo, pageSize } } = req.body;
		TagModel.count({}, (err, count) => {
			if (err) {
				return res.send({
					status: 400,
					msg: err
				})
			};
			TagModel.find({}).skip((pageNo - 1) * pageSize || 0).limit(pageSize || 10).sort({ createTime: -1 }).exec((err, data) => {
				if (err) {
					return res.send({
						status: 400,
						msg: err
					});
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
	});

	// 处理编辑标签
	router.post(baseURL + '/updateTag', (req, res) => {
		const {
			id,
			title,
			color,
			status,
			updateTime
		} = req.body;
		if (!title) {
			return res.send({
				output: {
					status: 400,
					msg: '无效的标签标题'
				}
			})
		};
		TagModel.updateOne({ _id: id }, {
			title,
			color,
			status,
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

	// 处理删除标签
	router.post(baseURL + '/deleteTag', (req, res) => {
		const { id } = req.body;
		TagModel.deleteMany({ _id: id }, (err, data) => {
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

	// 标签列表模糊查询
	router.post(baseURL + '/requestAllTags', (req, res) => {
		TagModel.find({}, (err, data) => {
			if (err) {
				return res.send({
					status: 400,
					msg: err
				});
			}
			res.send({
				status: 200,
				result: {
					dataList: data,
				},
			});
		})
	})
}