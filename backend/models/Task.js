const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duedate: {
        type: Date,
        default: Date.now
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    },
    comments: [{
        type: String,
        user: mongoose.Schema.Types.ObjectId,
        date : Date
    }],
});

module.exports = mongoose.model('Task',taskSchema);