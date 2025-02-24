const express = require('express');
const employeeController = require('../src/employee/employeeController');
const departmentController = require('../src/department/departmentController');
const authController = require('../src/auth/authController');
const router = express.Router();

/**
 * @swagger
 * /employee/getAll:
 *   get:
 *     summary: Get all employees
 *     responses:
 *       200:
 *         description: A list of employees
 */
// router.route('/employee/getAll').get(employeeController.getAllEmployees);
router.route('/employee/getAll').post(employeeController.getAllEmployees);

/**
 * @swagger
 * /employee/create:
 *   post:
 *     summary: Create a new employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               departmentId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Employee created successfully
 */
router.route('/employee/create').post(employeeController.createEmployee);

/**
 * @swagger
 * /employee/update/{id}:
 *   patch:
 *     summary: Update an employee by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               departmentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee updated successfully
 */
router.route('/employee/update/:id').patch(employeeController.updateEmployee);

/**
 * @swagger
 * /employee/remove/{id}:
 *   delete:
 *     summary: Remove an employee by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee removed successfully
 */
router.route('/employee/remove/:id').delete(employeeController.removeEmployee);

/**
 * @swagger
 * /department/getAll:
 *   get:
 *     summary: Get all departments
 *     responses:
 *       200:
 *         description: A list of departments
 */
router.route('/department/getAll').get(departmentController.getAllDepartments);

/**
 * @swagger
 * /department/create:
 *   post:
 *     summary: Create a new department
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Department created successfully
 */
router.route('/department/create').post(departmentController.createDepartment);

/**
 * @swagger
 * /department/update/{id}:
 *   patch:
 *     summary: Update a department by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Department ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Department updated successfully
 */
router.route('/department/update/:id').patch(departmentController.updateDepartment);

/**
 * @swagger
 * /department/remove/{id}:
 *   delete:
 *     summary: Remove a department by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Department ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Department removed successfully
 */
router.route('/department/remove/:id').delete(departmentController.removeDepartment);

router.route('/auth').post(authController.authenticateUser);

module.exports = router;
