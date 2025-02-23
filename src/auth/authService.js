const employeeSchema = require('../employee/employeeModel');
const bcrypt = require('bcrypt');

module.exports.authenticateUser = async (payload) => {
    const employee = await employeeSchema.findOne({username: payload.username});
    const isValid = await bcrypt.compareSync(payload.password.toString(), employee.password);
    if (isValid) {
        return true;
    } else {
        console.log('Invalid password for username : '+employee.username)
        return false;
    }
};