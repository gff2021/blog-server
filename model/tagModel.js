const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tagSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    articalCount: {
        type: Number,
        required: true
    },
    createTime: {
        type: String,
        required: true
    },
    updateTime: {
        type: String,
    }
});

const TagModel = mongoose.model('Tag', tagSchema);

module.exports = {
    TagModel
}