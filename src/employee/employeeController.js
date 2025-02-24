const employeeService = require('./employeeService');

const getAllEmployees = async (request, response) => {
    let employee = await employeeService.getAllEmployees(request.body);
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

const uploadEmployeeImage = async (request, response) => {
    let employeeImageUrl = await employeeService.uploadEmployeeImage(request, response);
    if (employeeImageUrl){
        response.send({"status": true, "data": employeeImageUrl, "message": 'Employee image uploaded successfully.'});
    } else {
        response.send({"status": false, "data": null, "message": 'Employee image uploading failed.'});
    }
};

module.exports = {getAllEmployees, createEmployee, updateEmployee, removeEmployee, uploadEmployeeImage};