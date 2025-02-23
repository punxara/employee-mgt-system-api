const employeeService = require('./employeeService');

const getAllEmployees = async (request, response) => {
    let employee = await employeeService.getAllEmployees();
    response.send({"status": true, "data": employee})
}

const createEmployee = async (request, response) => {
    let employee = await employeeService.createEmployee(request.body);
    if (employee) {
        response.send({"status": true, "data": employee, "message": 'Employee created successfully.'})
    } else {
        response.send({"status": false, "data": null, "message": 'Employee creation failed.'})
    }
}

module.exports = {getAllEmployees, createEmployee};
