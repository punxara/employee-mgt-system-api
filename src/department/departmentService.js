const departmentSchema = require('./departmentModel');
const employeeSchema = require('../employee/employeeModel');

module.exports.getAllDepartments = () => {
    return departmentSchema.find({})
        .then(departments => {
            return Promise.all(departments.map(department => {
                return employeeSchema.find({ department: department._id })
                    .then(employees => {
                        department.employees = employees;
                        return department;
                    });
            }));
        })
        .catch(error => { throw new Error(error.message); });
};

module.exports.createDepartment = (payload) => {
    let department = new departmentSchema({
        name: payload.name,
        description: payload.description,
    });
    return department.save()
        .then(result => result)
        .catch(error => { throw new Error(error.message); });
};

module.exports.updateDepartment = (id, payload) => {
    return departmentSchema.findByIdAndUpdate(id, payload)
        .then(result => result)
        .catch(error => { throw new Error(error.message); });
};

module.exports.removeDepartment = (id) => {
    return departmentSchema.findByIdAndDelete(id)
        .then(result => result)
        .catch(error => { throw new Error(error.message); });
};