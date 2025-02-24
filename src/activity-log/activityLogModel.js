const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activityLogSchema = new Schema({
    action: {
        type: String,
        enum: ['create', 'update', 'delete'],
        required: true
    },
    details: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);
