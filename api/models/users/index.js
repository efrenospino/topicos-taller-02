const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telephones: {
        type: Array,
        required: false
    },
    birthdate: {    //YYYY-MM-DD
        type: String,
        required: true
    },
    role_ids: 
    [{
        role:{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'roles'
        } 
    }], 
}, {
    timestamps: true
});

module.exports = mongoose.model('users', userSchema);