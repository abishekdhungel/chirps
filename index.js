//index.js file contains the bare minimmum code to bootstrap the application
var express=require('express')
config=require('./config/config'),
logger = require('./config/logger')

var app = express(); //create express.js app
require('./config/express')(app,config); // require express.js and pass the app and config objects as arguments

console.log(config.port)

logger.log("Creating HTTP server on port: " + config.port);
require('http').createServer(app).listen(config.port, function(){
    logger.log("HTTP Server listening on port: " + config.port + ", in " + app.get('env') + " mode");
});

module.exports = app;
