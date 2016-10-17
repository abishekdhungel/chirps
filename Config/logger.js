var winston = require('winston')
fs=require('fs');
var env=process.env.NODE_ENV|| 'development';
var logDir = 'log';
var tsFormat = ()=>(new Date()).toLocaleTimeString();
if (!fs.existsSync(logDir)) { fs.mkdirsync(logDir); }

var logger = new (winston.Logger)({
    //Define transports
    //adding timestamps to the log
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
    }),
     //rotating file
  new (require('winston-daily-rotate-file'))({
      filename: `${logDir}/-results.log`,
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      level: env === 'development' ? 'verbose' : 'info'
    })
  ]




});

log=function(message, level) {
    level=level|| 'info'; 
    logger.log(level,message);
}

exports.log=log;


