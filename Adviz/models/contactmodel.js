const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//init the contact schema
const contactSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    postcode: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    isPrivate: {
        type: Boolean,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng:{
        type: Number,
        required: true
    }
}, {timestamps: true})

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;