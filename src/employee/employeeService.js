const employeeSchema = require('./employeeModel');
const key = 'real secret keys should be long and random';
const encryptor = require('simple-encryptor')(key);

module.exports.getAllEmployees = () => {
    return new Promise(function checkUrl(resolve, reject) {
        employeeSchema.find({}, function returnData(error, result) {
            if (error) {
                reject(false);
            } else {
                resolve(result);
            }
        });
    });
}


module.exports.createEmployee = (employeePayload) => {
    let employee = new employeeSchema({
        name: employeePayload.name,
        username: employeePayload.username,
        password: encryptor.encrypt(employeePayload.password),
        position: employeePayload.position,
        department: employeePayload.department
    });

    return employee.save()
        .then(result => result) // ✅ Resolves if successful
        .catch(error => { throw new Error(error.message); }); // ✅ Rejects if there's an error
};
