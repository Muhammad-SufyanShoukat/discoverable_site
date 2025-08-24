const errorModel = require('../models/errorLogs');

module.exports = {

	/** ***** Error Service: Method to print error ******/
	printError(methodName, error) {
		console.log('======================================');
		console.log('Method Name: '+methodName);
		console.log(error);
		console.log('======================================');
		errorModel.create({
			method: methodName,
			log: error.toString(),
			status: 1,
		});
	},

};
