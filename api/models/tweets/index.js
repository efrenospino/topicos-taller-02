const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    comments: [{
        comment: {
            type: String,
            require: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('tweets', tweetSchema);