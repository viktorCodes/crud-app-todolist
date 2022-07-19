const mongoose = require('mongoose');
const todotaskSchema = new mongoose.schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: string,
        required: true

    },
    date: {
        type: Date,
        default: Date.now

    }
})
module.exports = mongoose.model('Todotask'. todoTaskSchema, 'tasks')
