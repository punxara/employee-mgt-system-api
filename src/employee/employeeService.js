const employeeSchema = require('./employeeModel');
const bcrypt = require('bcrypt');
const activityLogService = require('../activity-log/activityLogService');

// module.exports.getAllEmployees = () => {
//     return employeeSchema.find({}).populate('department')
//         .then(result => result)
//         .catch(error => {
//             throw new Error(error.message);
//         });
// };

module.exports.getAllEmployees = (payload) => {
    const filters = {};
    payload.forEach(item => {
        for (const key in item) {
            if (item[key]) {
                filters[key] = { $regex: item[key], $options: 'i' };
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
            details: savedEmployee,
            date: new Date()
        };
        await activityLogService.createActivityLog(activityLogDetails);
        return savedEmployee;
    } catch (error) {
        throw new Error(error.message);
    }
};

// module.exports.updateEmployee = (id, payload) => {
//     return employeeSchema.findByIdAndUpdate(id, payload, {new: true}).populate('department')
//         .then(result => result)
//         .catch(error => {
//             throw new Error(error.message);
//         });
// };

module.exports.updateEmployee = async (id, payload) => {
    try {
        const updatedEmployee = await employeeSchema.findByIdAndUpdate(id, payload, { new: true }).populate('department');
        // to save activity log record
        const activityLogDetails = {
            action: 'update',
            details: updatedEmployee,
            date: new Date()
        };
        await activityLogService.createActivityLog(activityLogDetails);
        return updatedEmployee;
    } catch (error) {
        throw new Error(error.message);
    }
};

// module.exports.removeEmployee = (id) => {
//     return employeeSchema.findByIdAndDelete(id)
//         .then(result => result)
//         .catch(error => {
//             throw new Error(error.message);
//         });
// };

module.exports.removeEmployee = async (id) => {
    try {
        const deletedEmployee = await employeeSchema.findByIdAndDelete(id);
        // to save activity log record
        const activityLogDetails = {
            action: 'delete',
            details: deletedEmployee,
            date: new Date()
        };
        await activityLogService.createActivityLog(activityLogDetails);
        return deletedEmployee;
    } catch (error) {
        throw new Error(error.message);
    }
};
