const employeeSchema = require('./employeeModel');
const key = 'real secret keys should be long and random';
const encryptor = require('simple-encryptor')(key);

module.exports.getAllEmployees = () => {
    return employeeSchema.find({}).populate('department')
        .then(result => result)
        .catch(error => { throw new Error(error.message); });
};

module.exports.createEmployee = (payload) => {
    let employee = new employeeSchema({
        name: payload.name,
        username: payload.username,
        password: encryptor.encrypt(payload.password),
        position: payload.position,
        department: payload.department,
        isActive: false
    });
    return employee.save()
        .then(result => result)
        .catch(error => { throw new Error(error.message); });
};

module.exports.updateEmployee = (id, payload) => {
    return employeeSchema.findByIdAndUpdate(id, payload)
        .then(result => result)
        .catch(error => { throw new Error(error.message); });
};

module.exports.removeEmployee = (id) => {
    return employeeSchema.findByIdAndDelete(id)
        .then(result => result)
        .catch(error => { throw new Error(error.message); });
};