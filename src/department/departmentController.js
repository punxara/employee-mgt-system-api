const departmentService = require('./departmentService');

const getAllDepartments = async (request, response) => {
    let department = await departmentService.getAllDepartments();
    response.send({"status": true, "data": department})
}

const createDepartment = async (request, response) => {
    let department = await departmentService.createDepartment(request.body);
    if (department) {
        response.send({"status": true, "data": department, "message": 'Department created successfully.'})
    } else {
        response.send({"status": false, "data": null, "message": 'Department creation failed.'})
    }
}

const updateDepartment = async (request, response) => {
    let department = await departmentService.updateDepartment(request.params.id, request.body);
    if (department) {
        response.send({"status": true, "data": department, "message": 'Department updated successfully.'})
    } else {
        response.send({"status": false, "data": null, "message": 'Department updating failed.'})
    }
}

const removeDepartment = async (request, response) => {
    let department = await departmentService.removeDepartment(request.params.id);
    if (department) {
        response.send({"status": true, "data": department, "message": 'Department removed successfully.'})
    } else {
        response.send({"status": false, "data": null, "message": 'Department removing failed.'})
    }
}

module.exports = {getAllDepartments, createDepartment, updateDepartment, removeDepartment};
