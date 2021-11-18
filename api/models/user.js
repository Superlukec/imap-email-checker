const mongoose = require('mongoose');
const crypto = require('crypto');

const {
    Schema
} = mongoose;

const UserSchema = new Schema({
    email: String,
    first_name: String,
    last_name: String,
    full_name: String,   
    password: String,
    salt: String,
    role: String,
    date_created: {
        type: String,
        default: Date.now
    },
});

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.password === hash;
};


mongoose.model('User', UserSchema);