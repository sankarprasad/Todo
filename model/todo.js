var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let titleLengthChecker = (title) => {
    if (!title) {
        return false;
    } else {
        if (title.length < 5 || title.length > 20) {
            return false;
        } else {
            return true;
        }
    }
}
let bodyLengthChecker = (body) => {
    if (!body) {
        return false;
    } else {
        if (body.length < 5 || body.length > 20) {
            return false;
        } else {
            return true;
        }
    }
}

const titleValidator = [
    {
        validator: titleLengthChecker,
        message: 'Ensure Title to have between 5 to 20 characters'
    }
]
const bodyValidator = [
    {
        validator: bodyLengthChecker,
        message: 'Ensure Body to have between 5 to 20 characters'
    }
]
var DoSchema = new Schema({
    title: { type: String, required: true, unique: true, lowercase: true, validate: titleValidator },
    author: { type: String, required: true, lowercase: true, validate: bodyValidator },
    body: { type: String, required: true, lowercase: true },

});

module.exports = mongoose.model('Todo', DoSchema)