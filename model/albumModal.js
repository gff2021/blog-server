const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const albumSchema = new Schema({
    id: Schema.Types.ObjectId,
    albumName: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    coverImg: {
        type: String,
        required: true
    }
});

const AlbumModel = mongoose.model('Album', albumSchema);

module.exports = {
    AlbumModel
}