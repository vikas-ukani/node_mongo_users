var mongoose = require('mongoose');
const Schema = mongoose.Schema;
// User Name, Mobile, Email, City
const UserSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date
    }
});
module.exports = mongoose.model('User', UserSchema);
