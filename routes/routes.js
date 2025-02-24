const express = require('express');
const employeeController = require('../src/employee/employeeController');
const departmentController = require('../src/department/departmentController');
const authController = require('../src/auth/authController');
const activityLogController = require('../src/activity-log/activityLogController');
const router = express.Router();

/**
 * @swagger
 * /employee/getAll:
 *   get:
 *     summary: Get all employees
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   username:
 *                     type: string
 *                   position:
 *                     type: string
 *                   departmentName:
 *                     type: string
 *                   isActive:
 *                     type: boolean
 *                   imageUrl:
 *                     type: string
 */
router.route('/employee/getAll').get(employeeController.getAllEmployees);

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
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               position:
 *                 type: string
 *               departmentName:
 *                 type: string
 *               departmentId:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               imageUrl:
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
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               position:
 *                 type: string
 *               departmentName:
 *                 type: string
 *               departmentId:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               imageUrl:
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
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
 *               description:
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
 *               description:
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

/**
 * @swagger
 * /activity-log/getAll:
 *   get:
 *     summary: Retrieve all activity logs
 *     responses:
 *       200:
 *         description: A list of activity logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   action:
 *                     type: string
 *                   empName:
 *                     type: string
 *                   empUsername:
 *                     type: string
 *                   empDepartment:
 *                     type: string
 *                   empPosition:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 */
router.route('/activity-log/getAll').get(activityLogController.getAllActivityLogs);

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Authenticate login employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentication successful
 *       401:
 *         description: Invalid credentials
 */
router.route('/auth').post(authController.authenticateUser);

/**
 * @swagger
 * /employee/upload/{id}:
 *   post:
 *     summary: Upload employee image by ID
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       400:
 *         description: Bad request (e.g., invalid file format)
 *       404:
 *         description: Employee not found
 */
router.route('/employee/upload/:id').post(employeeController.uploadEmployeeImage);

module.exports = router;
