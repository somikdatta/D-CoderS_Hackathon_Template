const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/**
 * Authorization Levels -
    **0-HOD
    **1-TEACHER
    **2-STUDENT
**/

const userSchema = mongoose.Schema({
    name: {
        first: { type: String, required: true },
        last: { type: String, required: true }
    },
    uniqueid: { type: Number, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    authorization: { type: Number, default: 2 },
    career: {
        course: { type: Number },
        department: { type: Number },
        semester: { type: Number },
    },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);