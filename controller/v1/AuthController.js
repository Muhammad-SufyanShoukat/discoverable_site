const {AuthService} = require('../../services');

class AuthController {
	/** ***** Auth Controller: Method to do user login ******/
	async userLogin(req, res, next) {
		try {
			await AuthService.userLogin(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Auth Controller: Method to do social login ******/
	async socialLogin(req, res, next) {
		try {
			await AuthService.socialLogin(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Auth Controller: Method to admin login ******/
	async adminLogin(req, res, next) {
		try {
			await AuthService.adminLogin(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Auth Controller: Method to generate new access token ******/
	async generateAccessToken(req, res, next) {
		try {
			await AuthService.generateAccessToken(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Auth Controller: Method to signup user ******/
	async signupUser(req, res, next) {
		try {
			await AuthService.signupUser(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Auth Controller: Method to signup user ******/
	async validateVerificationCode(req, res, next) {
		try {
			await AuthService.validateVerificationCode(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Auth Controller: Method to validate otp ******/
	async validateForgotPasswordOtp(req, res, next) {
		try {
			await AuthService.validateForgotPasswordOtp(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Auth Controller: Method to get coach primary goals list ******/
	async coachPrimaryGoalsList(req, res, next) {
		try {
			await AuthService.coachPrimaryGoalsList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Auth Controller: Method to get coach selections list ******/
	async coachSelectionsList(req, res, next) {
		try {
			await AuthService.coachSelectionsList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Auth Controller: Method to get player primary goals list ******/
	async playerPrimaryGoalsList(req, res, next) {
		try {
			await AuthService.playerPrimaryGoalsList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Auth Controller: Method to get player selections list ******/
	async playerSelectionsList(req, res, next) {
		try {
			await AuthService.playerSelectionsList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Auth Controller: Method to get splash screens list ******/
	async splashScreensList(req, res, next) {
		try {
			await AuthService.splashScreensList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Auth Controller: Method to send forgot password otp ******/
	async sendForgotPasswordOtp(req, res, next) {
		try {
			await AuthService.sendForgotPasswordOtp(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Auth Controller: Method to get schools list ******/
	async schoolsList(req, res, next) {
		try {
			await AuthService.schoolsList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}
}


module.exports = new AuthController();
