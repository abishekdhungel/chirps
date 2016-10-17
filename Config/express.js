var express = require('express'),
morgan = require('morgan')
logger = require ('./logger');
mongoose = require('mongoose'), //db connection

 mongoose.connect(config.db);
  mongoose.Promise = global.Promise;
  var db = mongoose.connection;
  db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
  });


module.exports = function (app, config) {
    app.use(morgan('dev'));

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
//Add this route to express.js above the 404 route. All this does is create an array of users and thenreturn the array for a request to /api/users
var users = [	{name: 'John', email: 'woo@hoo.com'},
		{name: 'Betty', email: 'loo@woo.com'},
		{name: 'Hal', email: 'boo@woo.com'}
];

app.get('/api/users', function (req, res) {
    res.status(200).json(users);
  });

//Import controller files//
var controllers = glob.sync(config.root + '/app/controllers/*.js');
    controllers.forEach(function (controller) {
      require(controller)(app, config);
  });


//Creates a route for static files
app.use(express.static(config.root + '/public'));

app.use(function(req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 Not Found');
});

app.use(function(err,req,res,next){
    console.error(err.stack);
res.type('text/plain');
res.status(500);
res.send('500 Server Error');
})

logger.log("Starting application");

};

