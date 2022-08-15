const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const journalSchema = new Schema({
    abstract: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    createTime: {
        type: String,
        required: true
    },
    updateTime: {
        type: String
    }
});

const JournalModel = mongoose.model('Journal', journalSchema);

module.exports = {
    JournalModel
}