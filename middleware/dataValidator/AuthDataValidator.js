const Yup = require('yup');

class AuthDataValidator {
	/** ***** Auth data validator: Method to validate email & password present in login request ******/
	userLogin(req, res, next) {
		const schema = Yup.object().shape({
			email: Yup.string().required('Email is required'),
			password: Yup.string().trim().required('Password is required'),
		});
		schema.validate(req.body, {abortEarly: false}).then((response) => {
			const platform = req.headers['platform'].toLowerCase();
			if (platform == 'web') {
				next();
			} else {
				return res.status(400).json({status: false, message: 'Bad Request', errors: ['Platform not valid']});
			}
		}).catch((err) => {
			next(err);
		});
	}

	/** ***** Auth data validator: Method to validate the request ******/
	socialLogin(req, res, next) {
		const schema = Yup.object().shape({
			// email: Yup.string().required('Email is required'),
			socialId: Yup.string().trim().required('Social ID is required'),
		});
		schema.validate(req.body, {abortEarly: false}).then((response) => {
			const platform = req.headers['platform'].toLowerCase();
			if (platform == 'web') {
				next();
			} else {
				return res.status(400).json({status: false, message: 'Bad Request', errors: ['Platform not valid']});
			}
		}).catch((err) => {
			next(err);
		});
	}

	/** ***** Auth data validator: Method to validate email & password present in admin login request ******/
	adminLogin(req, res, next) {
		const schema = Yup.object().shape({
			email: Yup.string().required('Email is required'),
			password: Yup.string().trim().required('Password is required'),
		});
		schema.validate(req.body, {abortEarly: false}).then((response) => {
			const platform = req.headers['platform'].toLowerCase();
			if (platform == 'web') {
				next();
			} else {
				return res.status(400).json({status: false, message: 'Bad Request', errors: ['Platform not valid']});
			}
		}).catch((err) => {
			next(err);
		});
	}

	/** ***** Auth data validator: Method to validate the request ******/
	signupUser(req, res, next) {
		const schema = Yup.object().shape({
			firstName: Yup.string().trim().required('First name is required'),
			lastName: Yup.string().trim().required('Last name is required'),
			email: Yup.string().required('Email is required').email('Invalid email'),
			password: Yup.string().trim().required('Password is required').min(3, 'Password should be atleast 3 characters'),
			phone: Yup.string().required('Phone number is required'),
		});
		schema.validate(req.body, {abortEarly: false}).then((response) => {
			const platform = req.headers['platform'].toLowerCase();
			if (platform == 'web') {
				next();
			} else {
				return res.status(400).json({status: false, message: 'Bad Request', errors: ['Platform not valid']});
			}
		}).catch((err) => {
			next(err);
		});
	}

	/** ***** Auth data validator: Method to validate the request ******/
	sendForgotPasswordOtp(req, res, next) {
		const schema = Yup.object().shape({
			method: Yup.string().required('Method is required'),
		});
		schema.validate(req.body, {abortEarly: false}).then((response) => {
			const platform = req.headers['platform'].toLowerCase();
			if (platform == 'web') {
				next();
			} else {
				return res.status(400).json({status: false, message: 'Bad Request', errors: ['Platform not valid']});
			}
		}).catch((err) => {
			next(err);
		});
	}

	/** ***** Auth data validator: Method to validate the request ******/
	validateForgotPasswordOtp(req, res, next) {
		const schema = Yup.object().shape({
			method: Yup.string().required('Method is required'),
		});
		schema.validate(req.body, {abortEarly: false}).then((response) => {
			const platform = req.headers['platform'].toLowerCase();
			if (platform == 'web') {
				next();
			} else {
				return res.status(400).json({status: false, message: 'Bad Request', errors: ['Platform not valid']});
			}
		}).catch((err) => {
			next(err);
		});
	}
}

module.exports = new AuthDataValidator();
