const { Module } = require('module')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    bio: {
        type: String,
        required: false,
        default: ""
    },
    savedPets: {
        type: Array,
        default: []
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User