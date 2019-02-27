const DetailController = require('../controllers/detailController');
const appConfig = require('./../../config/appConfig');
const auth = require('../middlewares/auth');

let setRoute = (app) => {

  let baseUrl = `${appConfig.apiVersion}/details`;

  /* to add new Details starts here*/
  app.post(`${baseUrl}/createDetail/:userId`, DetailController.createNewDetail)
  /* to add new Details ends here*/

  /* Getting all details of partiular student */
  app.get(`${baseUrl}/getAllDetailsByStudent/:userId`, DetailController.getAllDetailsByStudent)
  /* Getting all details of partiular student ENDS HERE*/

  /* Getting single detail info for Editing  Starts Here */
  app.get(`${baseUrl}/getSingleDetails/:detailId`, auth.userAuthorized ,DetailController.getSelectedDetail)
  /* Getting single detail info for Editing  ENDS Here*/

  /* Updating single Info from By Student Starts Here */
  app.put(`${baseUrl}/updateDetail/:detailId`, auth.userAuthorized, DetailController.updateSelectedDetail);
  /* Updating single Info from By Student Starts Here */

  // to delete single Info of particular user
  app.delete(`${baseUrl}/delete/:detailId`, auth.userAuthorized, DetailController.deleteDetail)
  
  // to get detail of particular user acc to userId
  app.get(`${baseUrl}/getDetailsByStudent/:userId`, auth.userAuthorized, DetailController.getDetailsByStudent)
  
  // for admin 
  app.get(`${baseUrl}/getAllDetails`, auth.userAuthorized, DetailController.getAllDetails);


}

module.exports = {
  setRouter: setRoute
}