const employeeSchema = require('./employeeModel');
const bcrypt = require('bcrypt');
const multer = require('multer');
const activityLogService = require('../activity-log/activityLogService');
const {join} = require("node:path");
const {existsSync, mkdirSync} = require("node:fs");

module.exports.getAllEmployees = (payload) => {
    const filters = {};
    payload.forEach(item => {
        for (const key in item) {
            if (item[key]) {
                filters[key] = {$regex: item[key], $options: 'i'};
            }
        }
    });
    return employeeSchema.find(filters).populate('department')
        .then(result => result)
        .catch(error => {
            throw new Error(error.message);
        });
};

module.exports.createEmployee = async (payload) => {
    try {
        let employee = new employeeSchema({
            name: payload.name,
            username: payload.username,
            password: await bcrypt.hash(payload.password, 10),
            position: payload.position,
            department: payload.department,
            departmentName: payload.department.name,
            isActive: false,
            imageUrl: payload.imageUrl
        });
        let savedEmployee = await employee.save();
        savedEmployee = await savedEmployee.populate('department');
        // to save activity log record
        const activityLogDetails = {
            action: 'create',
            empName: savedEmployee.name,
            empUsername: savedEmployee.username,
            empDepartment: savedEmployee.departmentName,
            empPosition: savedEmployee.position,
            date: new Date()
        };
        await activityLogService.createActivityLog(activityLogDetails);
        return savedEmployee;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports.updateEmployee = async (id, payload) => {
    try {
        const updatedEmployee = await employeeSchema.findByIdAndUpdate(id, payload, {new: true}).populate('department');
        // to save activity log record
        if (updatedEmployee) {
            const activityLogDetails = {
                action: 'update',
                empName: updatedEmployee.name,
                empUsername: updatedEmployee.username,
                empDepartment: updatedEmployee.departmentName,
                empPosition: updatedEmployee.position,
                date: new Date()
            };
            await activityLogService.createActivityLog(activityLogDetails);
        }
        return updatedEmployee;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports.removeEmployee = async (id) => {
    try {
        const deletedEmployee = await employeeSchema.findByIdAndDelete(id);
        // to save activity log record
        const activityLogDetails = {
            action: 'delete',
            empName: deletedEmployee.name,
            empUsername: deletedEmployee.username,
            empDepartment: deletedEmployee.departmentName,
            empPosition: deletedEmployee.position,
            date: new Date()
        };
        await activityLogService.createActivityLog(activityLogDetails);
        return deletedEmployee;
    } catch (error) {
        throw new Error(error.message);
    }
};

// to upload and save image
const uploadDir = join(__dirname, '../assets/uploads');
if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, {recursive: true});
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({storage}).single('image');
module.exports.uploadEmployeeImage = (req, res) => {
    return new Promise((resolve, reject) => {
        upload(req, res, async (error) => {
            if (error) {
                return reject(new Error(error.message));
            }
            if (!req.file) {
                return reject(new Error('No file uploaded'));
            }
            const fileUrl = `/assets/uploads/${req.file.filename}`;
            const updatedEmployee = await employeeSchema.findByIdAndUpdate(req.params.id, {imageUrl : fileUrl}, {new: true}).populate('department');
            resolve(updatedEmployee);
        });
    });
};