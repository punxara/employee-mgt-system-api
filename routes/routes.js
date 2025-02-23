const express = require('express');
const employeeController = require('../src/employee/employeeController');
const router = express.Router();

router.route('/employee/getAll').get(employeeController.getAllEmployees);
router.route('/employee/create').post(employeeController.createEmployee);
router.route('/employee/update/:id').patch(employeeController.updateEmployee);
router.route('/employee/remove/:id').delete(employeeController.removeEmployee);

module.exports = router;
