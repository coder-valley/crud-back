const userController = require('../controllers/userController');
const appConfig = require('./../../config/appConfig')
const auth = require('../middlewares/auth')

let setRoute = (app) => {
    let baseUrl = `${appConfig.apiVersion}/users`;

  /**signup api for Registering User.**/
    app.post(`${baseUrl}/signup`, userController.signUpFunction);
    
    /** Login api for Logging in User.**/
    app.post(`${baseUrl}/login`, userController.loginFunction);

    app.post(`${baseUrl}/adminlogin`, userController.adminloginFunction);
    
    /** Logout api for signing Out User.**/
    app.post(`${baseUrl}/logout/:userId`, userController.logout);
}

module.exports = {
    setRouter: setRoute
}