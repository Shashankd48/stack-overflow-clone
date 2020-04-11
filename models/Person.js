const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
    },
    profilepic: {
        type: String,
        default: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Person', PersonSchema);