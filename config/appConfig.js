let appConfig = []

appConfig.ports = 3000;
appConfig.allowedCorsOrigin = '*'
appConfig.env = "dev"
appConfig.db = {
    uri: 'mongodb://127.0.0.1:27017/crud-app'
  }
appConfig.apiVersion = '/api/v1';


module.exports = {
    port: appConfig.ports,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    environment: appConfig.env,
    db :appConfig.db,
    apiVersion : appConfig.apiVersion
};