const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activityLogSchema = new Schema({
    action: {
        type: String,
        enum: ['create', 'update', 'delete'],
        required: true
    },
    empName: {
        type: String,
        required: true
    },
    empUsername: {
        type: String,
        required: true
    },
    empDepartment: {
        type: String,
        required: true
    },
    empPosition: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);
