'use strict';
var chalk = require('chalk');
var path = require('path');
var fs = require('fs');
var END_OF_LINE = require('os').EOL;
var PATH_SEPARATOR = path.sep;



/**
 *
 * @param options
 * @returns {{logWarning: logWarning, logError: logError, logInfo: logInfo, logSuccess: logSuccess}}
 * @constructor
 */
var LoggerService = function(options){
    var logsQueue = [];
    var logFilePath = path.dirname(require.main.filename)+PATH_SEPARATOR+'logs';
    var logFileCreatedAt = new Date();

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
        var text = (new Date())+' ['+title+']: '+message;
        logsQueue.push(text);
        console.log(colorFunction(text));
    }

    function flushLogs(){
        if (!fs.existsSync(logFilePath)) {
            fs.mkdirSync(logFilePath, '0744');
        }

        var logFileName = logFilePath+PATH_SEPARATOR+'log_'+logFileCreatedAt;
        var logsText = logsQueue.join(END_OF_LINE);

        fs.writeFile(logFileName, logsText, function(err) {
            if(err) {
                return console.log(err);
            }
            resetLogs();
        })
    }

    function resetLogs(){
        logsQueue = [];
    }

    return {
        'logWarning': logWarning,
        'logError': logError,
        'logInfo': logInfo,
        'logSuccess': logSuccess,
        'flushLogs': flushLogs
    };
};

module.exports = LoggerService;
