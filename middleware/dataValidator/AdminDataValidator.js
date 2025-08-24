const Yup = require('yup');

class AdminDataValidator {
/** ***** User Data Validateor: Method to validate required fields present in request ******/
	createUsers(req, res, next) {
		const schema = Yup.object().shape({
			firstName: Yup.string().trim().required('First Name is required'),
			lastName: Yup.string().trim().required('Last Name is required'),
			email: Yup.string().required('Email is required').email('Invalid Email'),
			password: Yup.string().trim().required('Password is required').min(3, 'Password should be atleast 3 characters'),
		});
		schema.validate(req.body, {abortEarly: false}).then((response) => {
			next();
		}).catch((err) => {
			next(err);
		});
	}
}

module.exports = new AdminDataValidator();
