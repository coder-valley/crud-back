const express = require('express');
const path = require ('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const http = require('http');
const mongoose = require('mongoose');
const morgan = require('morgan');
const appConfig = require('./config/appConfig');
const time = require('./core/libs/timeLib');

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());

const controllersPath = './core/controllers';

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE,OPTION")
  next();
});

const modelsPath = './core/models';

  fs.readdirSync(modelsPath).forEach(function (file) {
    if (~file.indexOf('.js')) require(modelsPath + '/' + file)
  });

  let routesPath = './core/routes';
  fs.readdirSync(routesPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
      let routes = require(routesPath + '/' + file)
      routes.setRouter(app);
    }
  })


    const server = http.createServer(app);
    // start listening to http server
    console.log(appConfig);
    server.listen(appConfig.port);
    server.on('error', onError);
    server.on('listening', onListening);

    function onError(error) {
        if (error.syscall !== 'listen') {
          throw error;
        }
        // handle specific listen errors with friendly messages
        switch (error.code) {
          case 'EACCES':
            process.exit(1);
            break;
          case 'EADDRINUSE':
            process.exit(1);
            break;
          default:
            throw error;
        }
      }

    function onListening() {

    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    ('Listening on ' + bind);
    let db = mongoose.connect(appConfig.db.uri, {
        useNewUrlParser: true
    });
    }
    
    process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
    });

    mongoose.connection.on('error', function (err) {
        console.log('database connection error');
        console.log(err)
        //process.exit(1)
      }); // end mongoose connection error
      
      mongoose.connection.on('open', function (err) {
        if (err) {
          console.log("database error");
          console.log(err);
        } else {
          console.log("Database Connection Successfull");
        }
        //process.exit(1)
      }); // enr mongoose connection open handler
      
      
      var x = time.getLocalTime()
      console.log(x)
      
      
      module.exports = app;