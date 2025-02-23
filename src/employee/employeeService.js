const employeeSchema = require('./employeeModel');
const key = 'real secret keys should be long and random';
const encryptor = require('simple-encryptor')(key);

module.exports.getAllEmployees = () => {
    return employeeSchema.find({})
        .then(result => result)
        .catch(error => { throw new Error(error.message); });
};

module.exports.createEmployee = (employeePayload) => {
    let employee = new employeeSchema({
        name: employeePayload.name,
        username: employeePayload.username,
        password: encryptor.encrypt(employeePayload.password),
        position: employeePayload.position,
        department: employeePayload.department,
        isActive: false
    });
    return employee.save()
        .then(result => result)
        .catch(error => { throw new Error(error.message); });
};
