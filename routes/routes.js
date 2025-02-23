const express = require('express');
const employeeController = require('../src/employee/employeeController');
const departmentController = require('../src/department/departmentController');
const router = express.Router();

router.route('/employee/getAll').get(employeeController.getAllEmployees);
router.route('/employee/create').post(employeeController.createEmployee);
router.route('/employee/update/:id').patch(employeeController.updateEmployee);
router.route('/employee/remove/:id').delete(employeeController.removeEmployee);

router.route('/department/getAll').get(departmentController.getAllDepartments);
router.route('/department/create').post(departmentController.createDepartment);
router.route('/department/update/:id').patch(departmentController.updateDepartment);
router.route('/department/remove/:id').delete(departmentController.removeDepartment);

module.exports = router;
