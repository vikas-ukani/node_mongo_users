var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Creating user Schema for saving User Name, Mobile, Email, City in the database.
var UserSchema = new  Schema({
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
