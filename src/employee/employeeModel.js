const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    departmentName: {
        type: String,
        required: false
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: false
    },
    isActive: {
        type: Boolean,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Employee', employeeSchema)
