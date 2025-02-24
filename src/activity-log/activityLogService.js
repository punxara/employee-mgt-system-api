const activityLogSchema = require("../activity-log/activityLogModel");

module.exports.createActivityLog = (data) => {
    let activityLog = new activityLogSchema({
        action: data.action,
        empName: data.empName,
        empUsername: data.empUsername,
        empDepartment: data.empDepartment,
        empPosition: data.empPosition,
        date: data.date
    });
    return activityLog.save()
        .then(result => result)
        .catch(error => {
            throw new Error(error.message);
        });
};

module.exports.getAllActivityLogs = () => {
    return activityLogSchema.find({})
        .then(result => result)
        .catch(error => {
            throw new Error(error.message);
        });
};