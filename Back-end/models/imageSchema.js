const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema({
    image: { type: String }
})

const Image = mongoose.model('Image', imageSchema)
module.exports = Image