const authService = require('./authService');

const authenticateUser = async (request, response) => {
    let validUser = await authService.authenticateUser(request.body);
    if (validUser) {
        response.send({"status": true, "data": validUser,"message": 'User logged in successfully.'})
    } else {
        response.send({"status": false, "data": null, "message": 'User log in failed.'})
    }
}
module.exports = {authenticateUser};
