const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newRefreshToken = new Schema({
    user: String,
    token: String,
    // created: { type: Date, default: Date.now },
    // expires: Date,
    // createdByIp: String,
    // revoked: Date,
    // revokedByIp: String,
    // replacedByToken: String
});

newRefreshToken.virtual('isExpired').get(function () {
    return Date.now() >= this.expires;
});

newRefreshToken.virtual('isActive').get(function () {
    return !this.revoked && !this.isExpired;
});

newRefreshToken.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.id;
        delete ret.user;
    }
});

const NewRefreshToken = mongoose.model('NewRefreshToken', newRefreshToken);
module.exports = NewRefreshToken