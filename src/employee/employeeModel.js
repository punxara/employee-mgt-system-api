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
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true
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

// employeeSchema.statics.authenticateUser = async (payload) => {
//     const employee = await mongoose.model('Employee', employeeSchema).findOne(payload.name);
//     const isValid = await bcrypt.compare(payload.password, employee.password);
//     if (isValid){
//         return employee;
//     } else {
//         throw new Error('Invalid password.');
//     }
// }