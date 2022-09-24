const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//init the contact schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: String,
        required: false
    }
}, {timestamps: true});

const userModel  = mongoose.model('User', userSchema);

module.exports = userModel;