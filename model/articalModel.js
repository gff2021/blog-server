const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articalSchema = new Schema({
	_id: Schema.Types.ObjectId,
	title: {
		type: String,
		required: true
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Tag',
		required: true
	},
	status: {
		type: String,
		required: true
	},
	content: {
		type: String,
	},
	createTime: {
		type: String,
		required: true
	},
	updateTime: {
		type: String
	},
});

const ArticalModel = mongoose.model('Artical', articalSchema);

module.exports = {
	ArticalModel
}