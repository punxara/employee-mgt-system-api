const employee = require('./employeeModel')

module.exports.getDataFromDbService = () => {
    return new Promise(function checkUrl(resolve, reject) {
        employee.find({}, function returnData(error, result) {
            if (error) {
                reject(false);
            } else {
                resolve(result);
            }
        });
    });
}