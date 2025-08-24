const Yup = require('yup');

class UserDataValidator {
	/** ***** User Data Validateor: Method to validate password present in request ******/
	validatePassword(req, res, next) {
		const schema = Yup.object().shape({
			password: Yup.string().trim().required('Password is required').min(3, 'Password should be atleast 3 characters'),
		});
		schema.validate(req.body, {abortEarly: false}).then((response) => {
			next();
		}).catch((err) => {
			next(err);
		});
	}

	/** ***** User Data Validateor: Method to validate email present in request ******/
	validateEmail(req, res, next) {
		const schema = Yup.object().shape({
			email: Yup.string().required('Email is required').email('Invalid Email'),
		});
		schema.validate(req.body, {abortEarly: false}).then((response) => {
			next();
		}).catch((err) => {
			next(err);
		});
	}

	/** ***** User Data Validateor: Method to validate the request ******/
	createSalesPerson(req, res, next) {
		const schema = Yup.object().shape({
			firstName: Yup.string().required('First name is required'),
			lastName: Yup.string().required('Last name is required'),
			phone: Yup.string().required('Phone number is required'),
			email: Yup.string().required('Email is required').email('Invalid Email'),
		});
		schema.validate(req.body, {abortEarly: false}).then((response) => {
			next();
		}).catch((err) => {
			next(err);
		});
	}

	/** ***** User Data Validateor: Method to validate the request ******/
	createPackage(req, res, next) {
		const schema = Yup.object().shape({
			packageTitle: Yup.string().required('Package title is required'),
		});
		schema.validate(req.body, {abortEarly: false}).then((response) => {
			next();
		}).catch((err) => {
			next(err);
		});
	}
}

module.exports = new UserDataValidator();
