const mongoose = require('mongoose')
const Schema = mongoose.Schema

const petSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    hypoallergenic: {
        type: Boolean,
        required: true
    },
    dietaryRestrictions: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    petStatus: {
        type: String,
        required: true
    },
    ownerId: {
        type: String,
        required: false,
        default: undefined
    }
})

const Pet = mongoose.model('Pet', petSchema)
module.exports = Pet