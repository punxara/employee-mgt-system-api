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

const updateEmployee = async (request, response) => {
    let employee = await employeeService.updateEmployee(request.params.id, request.body);
    if (employee) {
        response.send({"status": true, "data": employee, "message": 'Employee updated successfully.'})
    } else {
        response.send({"status": false, "data": null, "message": 'Employee updating failed.'})
    }
}

const removeEmployee = async (request, response) => {
    let employee = await employeeService.removeEmployee(request.params.id);
    if (employee) {
        response.send({"status": true, "data": employee, "message": 'Employee removed successfully.'})
    } else {
        response.send({"status": false, "data": null, "message": 'Employee removing failed.'})
    }
}

module.exports = {getAllEmployees, createEmployee, updateEmployee, removeEmployee};
