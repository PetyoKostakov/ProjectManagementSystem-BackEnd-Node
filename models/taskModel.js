var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var taskModel = new Schema({
    title: {type: String},
    description: {type: String},
    todo: {type: Number},
    actual: {type: Number},
    estimate: {type: Number},
    done: {type: Boolean, default: false }
});

module.exports = mongoose.model('task', taskModel);