var express = require('express'),
morgan = require('morgan'),
logger = require ('./logger'),
mongoose = require('mongoose'), //db connection
bodyParser = require('body-parser'),
glob = require('glob'),
cors = require('cors');



 mongoose.connect(config.db);
  mongoose.Promise = global.Promise;
  var db = mongoose.connection;
  db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
  });


module.exports = function (app, config) {
    app.use(morgan('dev'));
    
// //Creates a route for static files

app.use(cors());
    
    app.use(function (req, res, next) {
      logger.log('Request from ' + req.connection.remoteAddress, 'info');
      next();
    });

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());


if(process.env.NODE_ENV !=='test'){ //if statement enclosing the logging middleware checks wheter app is running. this will keep log messages interfering
    //with test results
    app.use(morgan('dev'));

//This will log all database accesses
    mongoose.set('debug', true);
    mongoose.connection.once('open', function callback() {
      logger.log("Mongoose connected to the database");
    });


    app.use(function(req,res,next){
        logger.log('Request from ' + req.connection.remoteAddress, 'info');
        next();
    });
}

app.use(express.static(config.root + '/public'));

  var models = glob.sync(config.root + '/app/models/*.js');
  models.forEach(function (model) {
    require(model);
  });


//Import controller files//
var controllers = glob.sync(config.root + '/app/Controllers/*.js');
controllers.forEach(function (controller) {
    require(controller)(app, config);
});

app.use(function(req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 Not Found');
});

app.use(function (err, req, res, next) {
    console.log(err)
    if (process.env.NODE_ENV !== 'test') logger.log(err.stack,'error');
    res.type('text/plan');
    if(err.status){

      res.status(err.status).send(err.message);
    } else {
      res.status(500).send('500 Sever Error');
    }
  });


logger.log("Starting application");
};