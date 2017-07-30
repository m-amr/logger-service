'use strict';
var chalk = require('chalk');

var LoggerService = function(options){

    function logWarning(title, message){
        log(title, message, chalk.yellow);
    }

    function logError(title, message){
        log(title, message, chalk.red);

    }

    function logInfo(title, message){
        log(title, message, chalk.blue);

    }

    function logSuccess(title, message){
        log(title, message, chalk.green);

    }

    function log(title, message, colorFunction){
        var text = '['+title+']: '+message;
        console.log(colorFunction(text));
    }

    return {
        'logWarning': logWarning,
        'logError': logError,
        'logInfo': logInfo,
        'logSuccess': logSuccess
    };
};

module.exports = LoggerService;
