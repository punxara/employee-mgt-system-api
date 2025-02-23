const employeeService = require('./employeeService');

const getDataFromControllerFunction = async (request, response) => {
    let employee = await employeeService.getDataFromDbService();
    response.send({"status": true, "data": employee})
}

module.exports = { getDataFromControllerFunction };
