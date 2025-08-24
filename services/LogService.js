const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');

module.exports = {

	/** ***** File Service: Method to create and write log callback log file ******/
	writeReqLogFile(filePath, req, dirName) {
		const data = 'Routes: ' + req.protocol + ' ' + req.originalUrl +
					'||||||||||IP Address=' + req.connection.remoteAddress +
					'||||||||||Body: POST>>>>' + JSON.stringify(req.body) +
					'||||||||||Query: GET>>>>' + JSON.stringify(req.query) +
					'||||||||||Params: GET>>>>' + JSON.stringify(req.params) +
					'||||||||||Headers: >>>>' + req.headers.toString();

		const logDir = path.join(global.appRoot, `/logs/${dirName}`);
		if (!fs.existsSync(logDir)) {
			mkdirp.sync(logDir);
		}

		const logFile = path.join(logDir, filePath);
		const logMessage = ',\n' + (new Date()).toString() + '::' + JSON.stringify(data);
		fs.appendFile(
			logFile,
			logMessage,
			'utf8',
			(err)=>{
				if (err)console.error(err);
			},
		);
	},
};
