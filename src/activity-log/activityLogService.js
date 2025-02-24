const activityLogSchema = require("../activity-log/activityLogModel");

module.exports.createActivityLog = (data) => {
    let activityLog = new activityLogSchema({
        action: data.action,
        details: data.detailsAfter,
        date: data.date
    });
    return activityLog.save()
        .then(result => result)
        .catch(error => {
            throw new Error(error.message);
        });
};