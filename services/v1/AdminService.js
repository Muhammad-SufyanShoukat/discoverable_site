const adminsModel = require('../../models/admins');
const usersModel = require('../../models/users');
const errorService = require('../ErrorService');
const rolesModel = require('../../models/roles');
const kycsModel = require('../../models/kycs');
const logService = require('../LogService');
const moment = require('moment');
const commonConfig = require('../../config/common.config');
const generator = require('generate-password');
const Handlebars = require('handlebars');
const fs = require('fs');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(commonConfig.SENDGRID_API_KEY);

class AdminService {
	/** ***** Admin Service: Method to get admin profile info ******/
	async getAdminProfileInfo(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-admin_requests.log`;
			logService.writeReqLogFile(logFile, req, 'admin_requests');

			const result = await adminsModel.findOne({attributes: {exclude: ['password', 'createdAt', 'updatedAt']}, where: {id: req.decoded.id}, raw: true});
			if (result) {
				return res.status(200).json({status: true, message: 'Admin Profile', data: result});
			} else {
				return res.status(200).json({status: false, message: 'Admin details not found'});
			}
		} catch (error) {
			errorService.printError('Admin Service: getAdminProfileInfo', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Admin Service: Method to get roles list ******/
	async getRolesList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-admin_requests.log`;
			logService.writeReqLogFile(logFile, req, 'admin_requests');

			const result = await rolesModel.findAll({raw: true});
			if (result) {
				return res.status(200).json({status: true, message: 'Roles list', data: result});
			} else {
				return res.status(200).json({status: false, message: 'Roles list not found'});
			}
		} catch (error) {
			errorService.printError('Admin Service: getRolesList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Admin Service: Method to send create users email ******/
	async sendCreateUsersEmail(data) {
		const source = fs.readFileSync(commonConfig.FILE_LOCATION + '/templates/create_users_email.hbs', 'utf8');
		const template = Handlebars.compile(source);

		const locals = {
			email: data.email,
			firstName: data.firstName,
			password: data.password,
			url: commonConfig.EMAIL_SIGNIN_URL,
		};

		const msg = {
			to: data.email, // Change to your recipient
			from: commonConfig.SENDGRID_EMAIL_FROM, // Change to your verified sender
			subject: 'Undiscovered Recruits',
			html: template(locals),
		};

		sgMail.send(msg).then(() => {
			console.log('sendCreateUsersEmail Sent');
		});
	}

	/** ***** Admin Service: Method to create user ******/
	async createUsers(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-admin.log`;
			logService.writeReqLogFile(logFile, req, 'admin_requests');

			const userService = new UserService();
			const findUser = await usersModel.findOne({where: {id: req.decoded.id, roleId: 2}, raw: true});

			if (findUser) {
				const user = await usersModel.findOne({where: {email: req.body.email}});
				if (user) {
					return res.status(409).json({status: false, message: 'Email Already Exists!'});
				} else {
					const passwordGenerator = generator.generate({
						length: 10,
						numbers: true,
					});
					const ciphertext = SHA256(passwordGenerator, commonConfig.PWD_SECRET).toString();
					const dataToCreate = {
						UserId: req.decoded.id,
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						phone: req.body.phone,
						email: req.body.email,
						password: ciphertext,
						roleId: 3,
						status: 1,
						isDeleted: 0,
						createdAt: new Date(),
						updatedAt: new Date(),
					};

					const result = await usersModel.create(dataToCreate);
					console.log(result);
					if (result) {
						const data = {email: req.body.email, firstName: req.body.firstName, password: passwordGenerator};
						await userService.sendCreateSalesPersonEmail(data);
					} else {
						console.log(error);
						console.log('Mail Not Sent');
					}
					return res.status(200).json({status: true, message: 'User Added Successfully & Mail Sent'});
				}
			} else {
				return res.status(401).json({status: false, message: 'Unauthorized please contact admin'});
			}
		} catch (error) {
			errorService.printError('Admin Service: createUsers', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Admin Service: Method to get users list ******/
	async usersList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-admin_requests.log`;
			logService.writeReqLogFile(logFile, req, 'admin_requests');

			const findUser = await usersModel.findOne({where: {id: req.decoded.id, roleId: 2}, raw: true});

			if (findUser) {
				const result = await usersModel.findAll({attributes: {exclude: ['password']}, where: {UserId: req.decoded.id, roleId: 3, isDeleted: 0}, order: [['id', 'DESC']], raw: true});
				if (result) {
					return res.status(200).json({status: true, message: 'users list', data: result});
				} else {
					return res.status(200).json({status: false, message: 'users list not found!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'Unauthorized please contact admin'});
			}
		} catch (error) {
			errorService.printError('Admin Service: usersList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Admin Service: Method to get active users list ******/
	async activeUsersList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-admin_requests.log`;
			logService.writeReqLogFile(logFile, req, 'admin_requests');

			const findUser = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});
			if (findUser.roleId == 3) {
				const result = await usersModel.findOne({attributes: {exclude: ['password']}, where: {id: req.decoded.id, roleId: 3, isDeleted: 0, status: 1}, order: [['id', 'DESC']], raw: true});
				if (result) {
					return res.status(200).json({status: true, message: 'Active users list', data: result});
				} else {
					return res.status(200).json({status: false, message: 'Active users list not found!'});
				}
			} else {
				const findUser = await usersModel.findOne({where: {id: req.decoded.id, roleId: 2}, raw: true});
				if (findUser) {
					const result = await usersModel.findAll({attributes: {exclude: ['password']}, where: {UserId: req.decoded.id, roleId: 3, isDeleted: 0, status: 1}, order: [['id', 'DESC']], raw: true});
					if (result) {
						return res.status(200).json({status: true, message: 'Active users list', data: result});
					} else {
						return res.status(200).json({status: false, message: 'Active users list not found!'});
					}
				} else {
					return res.status(403).json({status: false, message: 'Unauthorized please contact admin'});
				}
			}
		} catch (error) {
			errorService.printError('Admin Service: activeUsersList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Admin Service: Method to get active users list by id ******/
	async usersListById(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-admin_requests.log`;
			logService.writeReqLogFile(logFile, req, 'admin_requests');

			const findUser = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});
			if (findUser.roleId == 3) {
				const result = await usersModel.findOne({attributes: {exclude: ['password']}, where: {id: req.decoded.id, roleId: 3, isDeleted: 0}, order: [['id', 'DESC']], raw: true});
				if (result) {
					return res.status(200).json({status: true, message: 'users list by id', data: result});
				} else {
					return res.status(200).json({status: false, message: 'users list by id not found!'});
				}
			} else {
				const findUser = await usersModel.findOne({where: {id: req.decoded.id, roleId: 2}, raw: true});
				if (findUser) {
					const result = await usersModel.findOne({attributes: {exclude: ['password']}, where: {id: req.params.id, UserId: req.decoded.id, roleId: 3, isDeleted: 0}, order: [['id', 'DESC']], raw: true});
					if (result) {
						return res.status(200).json({status: true, message: 'users list by id', data: result});
					} else {
						return res.status(200).json({status: false, message: 'users list by id not found!'});
					}
				} else {
					return res.status(403).json({status: false, message: 'Unauthorized please contact admin'});
				}
			}
		} catch (error) {
			errorService.printError('Admin Service: usersListById', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Admin Service: Method to update user ******/
	async updateUsers(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-admin_requests.log`;
			logService.writeReqLogFile(logFile, req, 'admin_requests');

			const findUser = await usersModel.findOne({where: {id: req.decoded.id, roleId: 2}, raw: true});

			if (findUser) {
				const dataToUpdate = {
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					phone: req.body.phone,
					status: req.body.status,
					updatedAt: new Date(),
				};

				const result = await usersModel.update(dataToUpdate, {where: {id: req.body.id}});
				if (result) {
					return res.status(200).json({status: true, message: 'User details updated successfully'});
				} else {
					return res.status(403).json({status: true, message: 'User details not updated!'});
				}
			} else {
				return res.status(401).json({status: false, message: 'Unauthorized please contact admin'});
			}
		} catch (error) {
			errorService.printError('Admin Service: updateUsers', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Admin Service: Method to get users list ******/
	async deleteUsers(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-admin_requests.log`;
			logService.writeReqLogFile(logFile, req, 'admin_requests');

			// const findUser = await usersModel.findOne({where: {id: req.decoded.id, roleId: 2}, raw: true});

			// if (findUser) {
			const result = await usersModel.update({isDeleted: 1, status: 0}, {where: {id: req.params.id, roleId: 3}, raw: true});
			if (result) {
				return res.status(200).json({status: true, message: 'user deleted successfully', data: result});
			} else {
				return res.status(200).json({status: false, message: 'user not deleted!'});
			}
			// } else {
			// 	return res.status(403).json({status: false, message: 'Unauthorized please contact admin'});
			// }
		} catch (error) {
			errorService.printError('Admin Service: deleteUsers', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Admin Service: Method to get users kyc details ******/
	async kycDetails(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-admin_requests.log`;
			logService.writeReqLogFile(logFile, req, 'admin_requests');

			const findKycDetails = await kycsModel.findOne({where: {UserId: req.params.id}, raw: true});
			if (findKycDetails) {
				return res.status(200).json({status: true, message: 'Kyc details', data: findKycDetails});
			} else {
				return res.status(403).json({status: false, message: 'Kyc details not found!'});
			}
		} catch (error) {
			errorService.printError('Admin Service: kycDetails', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Admin Service: Method to update user ******/
	async approveUnapproveKyc(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-admin_requests.log`;
			logService.writeReqLogFile(logFile, req, 'admin_requests');

			const result = await usersModel.update({isKycApproved: req.body.isKycApproved}, {where: {id: req.body.id}});
			if (req.body.isKycApproved == 1) {
				return res.status(200).json({status: true, message: 'Kyc approved'});
			} else {
				return res.status(403).json({status: true, message: 'Kyc not approved'});
			}
		} catch (error) {
			errorService.printError('Admin Service: approveUnapproveKyc', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}
}


module.exports = new AdminService();
