const activityLogService = require("../activity-log/activityLogService");

const getAllActivityLogs = async (request, response) => {
    let logs = await activityLogService.getAllActivityLogs();
    response.send({"status": true, "data": logs})
}

module.exports = {getAllActivityLogs};
