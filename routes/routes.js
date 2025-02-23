const express = require('express');
const employeeController = require('../src/employee/employeeController');

const router = express.Router();

router.route('/employee/getAll').get(employeeController.getAllEmployees);
router.route('/employee/create').post(employeeController.createEmployee);

module.exports = router;
