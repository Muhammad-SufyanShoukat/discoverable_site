const SHA256 = require('crypto-js/sha256');
const commonConfig = require('../../config/common.config');
const adminsModel = require('../../models/admins');
const usersModel = require('../../models/users');
const playerPrimaryGoalsModel = require('../../models/playerPrimaryGoals');
const playerSelectionsModel = require('../../models/playerSelections');
const coachPrimaryGoalsModel = require('../../models/coachPrimaryGoals');
const coachSelectionsModel = require('../../models/coachSelections');
const splashScreensModel = require('../../models/splashScreens');
const otpsModel = require('../../models/otps');
const schoolsModel = require('../../models/schools');
const tokenService = require('../TokenService');
const errorService = require('../ErrorService');
const logService = require('../LogService');
const moment = require('moment');
const {Op} = require('sequelize');
const generator = require('generate-password');
const Handlebars = require('handlebars');
const fs = require('fs');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(commonConfig.SENDGRID_API_KEY);

const accountSid = commonConfig.TWILIO_SID;
const authToken = commonConfig.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

class AuthService {
	/** ***** Auth Service: Method to send verification email ******/
	async sendVerificationEmail(data) {
		console.log(commonConfig.VERIFICATION_URL + data.verificationCode, 'sendVerificationEmail data', data);

		const source = fs.readFileSync(commonConfig.FILE_LOCATION + '/templates/verification_link_email.hbs', 'utf8');
		const template = Handlebars.compile(source);

		const locals = {
			email: data.email,
			firstName: data.firstName,
			// otp: data.otp,
			verificationUrl: commonConfig.VERIFICATION_URL + data.verificationCode,
		};

		const msg = {
			to: data.email, // Change to your recipient
			from: commonConfig.SENDGRID_EMAIL_FROM, // Change to your verified sender
			subject: 'Undiscovered Recruits',
			html: template(locals),
		};

		sgMail.send(msg).then(() => {
			console.log('sendVerificationEmail Sent');
		});
	}

	/** ***** Auth Service: Method to signup user ******/
	async signupUser(req, res, next) {
		try {
			const authService = new AuthService();
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-auth_requests.log`;
			logService.writeReqLogFile(logFile, req, 'auth_requests');

			const checkEmail = await usersModel.findOne({where:
				{
					[Op.or]: [
						{
							phone: req.body.phone,
						},
						{
							email: req.body.email.toLowerCase(),
						},
					],
				}, raw: true,
			});
			if (checkEmail) {
				return res.status(403).json({status: false, message: 'Email or phone already exists!'});
			} else {
				const ciphertext = SHA256(req.body.password, commonConfig.PWD_SECRET).toString();
				const dataToCreate = {
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					countryCode: req.body.countryCode,
					phone: req.body.phone,
					email: req.body.email.toLowerCase(),
					password: ciphertext,
					registrationType: 'email',
					platformType: req.body.platformType,
					deviceId: req.body.deviceId,
					fcmToken: req.body.fcmToken ? req.body.fcmToken : '',
					isKycCompleted: 0,
					isRegistrationCompleted: 0,
					status: 1,
					isVerified: 0,
					isDeleted: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				const result = await usersModel.create(dataToCreate);
				if (result) {
					const timestamp = Date.now();
					const verificationCodeGenerator = generator.generate({
						length: 50,
						numbers: true,
					});
					const createVerificationCode = verificationCodeGenerator + timestamp + result.id;
					const addVerificationCode = await usersModel.update({verificationCode: createVerificationCode}, {where: {id: result.id}});

					// const generatedOtp = Math.floor(1000 + Math.random() * 9000);
					// console.log('generatedOtp====', generatedOtp);
					// const otpData = {
					// 	userId: result.id,
					// 	otp: generatedOtp,
					// 	expiryTime: moment().utc().add(5, 'minutes').format('YYYY-MM-DD HH:mm'),
					// 	status: 1,
					// };
					// const addOtp = await otpsModel.create(otpData);
					const data = {email: req.body.email.toLowerCase(), firstName: req.body.firstName, verificationCode: createVerificationCode};
					await authService.sendVerificationEmail(data);

					const tokens = await tokenService.generateTokens({id: result.id, email: result.email});
					const tokenExpiry = await tokenService.getTokenExpiry(tokens.accessToken);
					const response = {
						id: result.id,
						roleId: result?.roleId,
						token: tokens,
						accessTokenExpiry: tokenExpiry.exp,
					};
					return res.status(200).json({status: true, message: 'Signup successful', data: response});
				} else {
					return res.status(403).json({status: false, message: 'Signup failed'});
				}
			}
		} catch (error) {
			errorService.printError('Auth Service: signupUser', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Auth Service: Method to verify created account verification code using link ******/
	async validateVerificationCode(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-auth_requests.log`;
			logService.writeReqLogFile(logFile, req, 'auth_requests');

			const user = await usersModel.findOne({where: {verificationCode: req.params.verificationCode, isVerified: 0}, raw: true});
			if (user) {
				await usersModel.update({isVerified: 1}, {where: {id: user.id}});
				return res.status(200).json({status: true, message: 'Account verified successfully'});
			} else {
				return res.status(403).json({status: false, message: 'Incorrect verification code'});
			}
		} catch (error) {
			errorService.printError('Auth Service: validateVerificationCode', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Auth Service: Method to validate forgot password otp ******/
	async validateForgotPasswordOtp(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-auth_requests.log`;
			logService.writeReqLogFile(logFile, req, 'auth_requests');

			if (req.body.method == 'email') {
				console.log('email validate otp');
				const user = await usersModel.findOne({where: {email: req.body.email.toLowerCase()}, raw: true});
				if (user) {
					const result = await otpsModel.findOne(
						{
							where: {userId: user.id, otp: req.body.otp},
							order: [
								['id', 'ASC'],
							], raw: true,
						});
					const tokens = await tokenService.generateTokens({id: user.id, email: user.email, username: user.username, role_id: user.role_id});
					const tokenExpiry = await tokenService.getTokenExpiry(tokens.accessToken);
					if (result) {
						const now = moment().utc();
						const exp = moment.utc(result.expiryTime);
						if (now.isAfter(exp)) {
							return res.status(401).json({status: false, message: 'Verification code expired'});
						} else {
							const data = {
								token: tokens,
								accessTokenExpiry: tokenExpiry.exp,
							};
							return res.status(200).json({status: true, message: 'Verification code is correct', data: data});
						}
					} else {
						return res.status(403).json({status: false, message: 'Incorrect verification code'});
					}
				} else {
					return res.status(403).json({status: false, message: 'Email does not exist!'});
				}
			} else if (req.body.method == 'phone') {
				console.log('phone validate otp');
				const user = await usersModel.findOne({where: {phone: req.body.phone}, raw: true});
				if (user) {
					const result = await otpsModel.findOne(
						{
							where: {userId: user.id, otp: req.body.otp},
							order: [
								['id', 'ASC'],
							], raw: true,
						});
					const tokens = await tokenService.generateTokens({id: user.id, email: user.email, username: user.username, role_id: user.role_id});
					const tokenExpiry = await tokenService.getTokenExpiry(tokens.accessToken);
					if (result) {
						const now = moment().utc();
						const exp = moment.utc(result.expiryTime);
						if (now.isAfter(exp)) {
							return res.status(401).json({status: false, message: 'Verification code expired'});
						} else {
							const data = {
								token: tokens,
								accessTokenExpiry: tokenExpiry.exp,
							};
							return res.status(200).json({status: true, message: 'Verification code is correct', data: data});
						}
					} else {
						return res.status(403).json({status: false, message: 'Incorrect verification code'});
					}
				} else {
					return res.status(403).json({status: false, message: 'Phone number does not exist!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'Wrong method!'});
			}
		} catch (error) {
			errorService.printError('Auth Service: validateForgotPasswordOtp', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Auth Service: Method to coach login ******/
	async coachLogin(result) {
		try {
			console.log('coach login');

			const tokens = await tokenService.generateTokens({id: result.id, email: result.email});
			const tokenExpiry = await tokenService.getTokenExpiry(tokens.accessToken);
			const data = {
				id: result.id,
				firstName: result.firstName,
				lastName: result?.lastName,
				email: result?.email,
				phone: result?.phone,
				roleId: result?.roleId,
				isVerified: result.isVerified,
				platformType: result?.platformType,
				platformVersion: result?.platformVersion,
				deviceId: result?.deviceId,
				profilePictureUrl: result?.profilePictureUrl,
				playingPosition: result?.playingPosition,
				type: result?.type,
				primaryGoalIds: result?.primaryGoalIds,
				selectionIds: result?.selectionIds,
				isKycApproved: result.isKycApproved,
				isKycCompleted: result.isKycCompleted,
				isRegistrationCompleted: result.isRegistrationCompleted,
				status: result.status,
				token: tokens,
				accessTokenExpiry: tokenExpiry.exp,
			};
			return data;
		} catch (error) {
			errorService.printError('Auth Service: coachLogin', error);
			console.log('coachLogin error', error);
		}
	}

	/** ***** Auth Service: Method to player login ******/
	async playerLogin(result) {
		try {
			console.log('player login');

			const tokens = await tokenService.generateTokens({id: result.id, email: result.email});
			const tokenExpiry = await tokenService.getTokenExpiry(tokens.accessToken);
			const data = {
				id: result.id,
				firstName: result.firstName,
				lastName: result?.lastName,
				email: result?.email,
				phone: result?.phone,
				roleId: result?.roleId,
				isVerified: result.isVerified,
				platformType: result?.platformType,
				platformVersion: result?.platformVersion,
				deviceId: result?.deviceId,
				profilePictureUrl: result?.profilePictureUrl,
				playingPosition: result?.playingPosition,
				type: result?.type,
				primaryGoalIds: result?.primaryGoalIds,
				selectionIds: result?.selectionIds,
				isKycApproved: result.isKycApproved,
				isKycCompleted: result.isKycCompleted,
				isRegistrationCompleted: result.isRegistrationCompleted,
				status: result.status,
				token: tokens,
				accessTokenExpiry: tokenExpiry.exp,
			};
			return data;
		} catch (error) {
			errorService.printError('Auth Service: playerLogin', error);
			console.log('playerLogin error', error);
		}
	}

	/** ***** Auth Service: Method to user login ******/
	async userLogin(req, res, next) {
		try {
			const authService = new AuthService();
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-auth_requests.log`;
			logService.writeReqLogFile(logFile, req, 'auth_requests');

			const ciphertext = SHA256(req.body.password, commonConfig.PWD_SECRET).toString();
			const result = await usersModel.findOne({
				where:
				{
					email: req.body.email.toLowerCase(),
					password: ciphertext,
					isDeleted: 0,
				},
			});

			if (result) {
				if (result.isVerified == 1) {
					if (result.status == 1) {
						if (result?.roleId == 3) {
							const updateFcm = await authService.updateFcmToken(result.id, req.body.fcmToken ? req.body.fcmToken : '');
							if (updateFcm) {
								const coachLogin = await authService.coachLogin(result);
								coachLogin.fcmToken = req.body.fcmToken ? req.body.fcmToken : '';
								return res.status(200).json({status: true, message: 'Login Successfully', data: coachLogin});
							} else {
								return res.status(403).json({status: false, message: 'Email or password is incorrect'});
							}
						} else if (result?.roleId == 4) {
							const updateFcm = await authService.updateFcmToken(result.id, req.body.fcmToken ? req.body.fcmToken : '');
							if (updateFcm) {
								const playerLogin = await authService.playerLogin(result);
								playerLogin.fcmToken = req.body.fcmToken ? req.body.fcmToken : '';
								return res.status(200).json({status: true, message: 'Login Successfully', data: playerLogin});
							} else {
								return res.status(403).json({status: false, message: 'Email or password is incorrect'});
							}
						} else {
							const updateFcm = await authService.updateFcmToken(result.id, req.body.fcmToken ? req.body.fcmToken : '');
							if (updateFcm) {
								const tokens = await tokenService.generateTokens({id: result.id, email: result.email});
								const tokenExpiry = await tokenService.getTokenExpiry(tokens.accessToken);
								const data = {
									id: result.id,
									firstName: result.firstName,
									lastName: result?.lastName,
									email: result?.email.toLowerCase(),
									phone: result?.phone,
									roleId: result?.roleId,
									isVerified: result.isVerified,
									platformType: result?.platformType,
									platformVersion: result?.platformVersion,
									deviceId: result?.deviceId,
									fcmToken: req.body.fcmToken,
									profilePictureUrl: result?.profilePictureUrl,
									playingPosition: result?.playingPosition,
									type: result?.type,
									primaryGoalIds: result?.primaryGoalIds,
									selectionIds: result?.selectionIds,
									isKycApproved: result.isKycApproved,
									isKycCompleted: result.isKycCompleted,
									isRegistrationCompleted: result.isRegistrationCompleted,
									status: result.status,
									token: tokens,
									accessTokenExpiry: tokenExpiry.exp,
								};
								return res.status(200).json({status: true, message: 'Login Successfully', data: data});
							} else {
								return res.status(403).json({status: false, message: 'Email or password is incorrect'});
							}
						}
					} else {
						return res.status(401).json({status: false, message: 'Your account is deactivated please contact admin'});
					}
				} else {
					return res.status(401).json({status: false, message: 'Your account is not verified!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'Email or password is incorrect'});
			}
		} catch (error) {
			errorService.printError('Auth Service: userLogin', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Auth Service: Method to users social login ******/
	async socialLogin(req, res, next) {
		try {
			const authService = new AuthService();
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-auth_requests.log`;
			logService.writeReqLogFile(logFile, req, 'auth_requests');

			const checkEmail = await usersModel.findOne({where:{email: req.body.email, [Op.or]: [{socialId: {[Op.not]: req.body.socialId}},{socialId: null}], isDeleted: 0}});

			if(checkEmail){
				return res.status(403).json({status: false, message: 'Email already exists! Please try another method to login.'});
			} else{

			const result = await usersModel.findOne({
				where:
				{
					socialId: req.body.socialId,
					isDeleted: 0,
				},
			});
			if (result) {
				if (result.isVerified == 1) {
					if (result.status == 1) {
						console.log('Social login');
						if (result?.roleId == 3) {
							const updateFcm = await authService.updateFcmToken(result.id, req.body.fcmToken ? req.body.fcmToken : '');
							if (updateFcm) {
								const coachLogin = await authService.coachLogin(result);
								coachLogin.fcmToken = req.body.fcmToken ? req.body.fcmToken : '';
								return res.status(200).json({status: true, message: 'Login Successfully', data: coachLogin});
							} else {
								return res.status(403).json({status: false, message: 'Social Login Failed!'});
							}
						} else if (result?.roleId == 4) {
							const updateFcm = await authService.updateFcmToken(result.id, req.body.fcmToken ? req.body.fcmToken : '');
							if (updateFcm) {
								const playerLogin = await authService.playerLogin(result);
								playerLogin.fcmToken = req.body.fcmToken ? req.body.fcmToken : '';
								return res.status(200).json({status: true, message: 'Login Successfully', data: playerLogin});
							} else {
								return res.status(403).json({status: false, message: 'Social Login Failed!'});
							}
						} else {
							const updateFcm = await authService.updateFcmToken(result.id, req.body.fcmToken ? req.body.fcmToken : '');
							if (updateFcm) {
								const tokens = await tokenService.generateTokens({id: result.id, email: result.email});
								const tokenExpiry = await tokenService.getTokenExpiry(tokens.accessToken);
								const data = {
									id: result.id,
									firstName: result.firstName,
									lastName: result?.lastName,
									email: result?.email.toLowerCase(),
									phone: result?.phone,
									roleId: result?.roleId,
									isVerified: result.isVerified,
									platformType: result?.platformType,
									platformVersion: result?.platformVersion,
									deviceId: result?.deviceId,
									fcmToken: req.body.fcmToken ? req.body.fcmToken : '',
									profilePictureUrl: result?.profilePictureUrl,
									playingPosition: result?.playingPosition,
									type: result?.type,
									primaryGoalIds: result?.primaryGoalIds,
									selectionIds: result?.selectionIds,
									isKycApproved: result.isKycApproved,
									isKycCompleted: result.isKycCompleted,
									isRegistrationCompleted: result.isRegistrationCompleted,
									status: result.status,
									token: tokens,
									accessTokenExpiry: tokenExpiry.exp,
								};
								return res.status(200).json({status: true, message: 'Login Successfully', data: data});
							} else {
								return res.status(403).json({status: false, message: 'Social Login Failed!'});
							}
						}
					} else {
						return res.status(401).json({status: false, message: 'Your account is deactivated please contact admin'});
					}
				} else {
					return res.status(401).json({status: false, message: 'Your account is not verified!'});
				}
			} else {
				console.log('Social signup');
				const dataToCreate = {
					firstName: req.body.firstName,
					lastName: req.body?.lastName || null,
					email: req.body?.email.toLowerCase() || null,
					countryCode: req.body?.countryCode || null,
					phone: req.body?.phone || null,
					socialId: req.body.socialId,
					registrationType: req.body?.registrationType || null,
					platformType: req.body?.platformType || null,
					platformVersion: req.body?.platformVersion || null,
					deviceId: req.body?.deviceId || null,
					fcmToken: req.body.fcmToken ? req.body.fcmToken : '',
					isKycCompleted: 0,
					isKycApproved: 0,
					isRegistrationCompleted: 0,
					status: 1,
					isVerified: 1,
					isDeleted: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				const createUser = await usersModel.create(dataToCreate);
				if (createUser) {
					const tokens = await tokenService.generateTokens({id: createUser.id, email: createUser?.email});
					const tokenExpiry = await tokenService.getTokenExpiry(tokens.accessToken);
					const findUser = await usersModel.findOne({where: {id: createUser.id}, raw: true});
					const data = {
						id: createUser.id,
						firstName: findUser.firstName,
						lastName: findUser?.lastName,
						email: findUser?.email.toLowerCase(),
						phone: findUser?.phone,
						roleId: findUser?.roleId || null,
						isVerified: findUser.isVerified,
						platformType: findUser?.platformType,
						platformVersion: findUser?.platformVersion,
						deviceId: findUser?.deviceId,
						fcmToken: findUser?.fcmToken,
						profilePictureUrl: findUser?.profilePictureUrl,
						playingPosition: findUser?.playingPosition,
						type: findUser?.type,
						primaryGoalIds: findUser?.primaryGoalIds,
						selectionIds: findUser?.selectionIds,
						isKycApproved: findUser.isKycApproved,
						isKycCompleted: findUser.isKycCompleted,
						isRegistrationCompleted: findUser.isRegistrationCompleted,
						status: findUser.status,
						token: tokens,
						accessTokenExpiry: tokenExpiry.exp,
					};
					return res.status(200).json({status: true, message: 'Login Successfully', data: data});
				} else {
					return res.status(403).json({status: false, message: 'Social Login Failed!'});
				}
			}
		}
		} catch (error) {
			errorService.printError('Auth Service: socialLogin', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Auth Service: Method to admin login ******/
	async adminLogin(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-auth_requests.log`;
			logService.writeReqLogFile(logFile, req, 'auth_requests');

			const ciphertext = SHA256(req.body.password, commonConfig.PWD_SECRET).toString();
			const result = await adminsModel.findOne({
				where:
				{
					email: req.body.email.toLowerCase(),
					password: ciphertext,
					isDeleted: 0,
					roleId: 1,
				},
			});
			if (result) {
				if (result.status == 1) {
					const tokens = await tokenService.generateTokens({id: result.id, email: result.email, roleId: result.roleId});
					const tokenExpiry = await tokenService.getTokenExpiry(tokens.accessToken);
					const data = {
						id: result.id,
						firstName: result.firstName,
						lastName: result.lastName,
						email: result.email,
						phone: result.phone,
						roleId: result.roleId,
						status: result.status,
						isDeleted: result.isDeleted,
						token: tokens,
						accessTokenExpiry: tokenExpiry.exp,
					};
					return res.status(200).json({status: true, message: 'Login Successfully', data: data});
				} else {
					return res.status(401).json({status: false, message: 'Your account is deactivated please contact admin'});
				}
			} else {
				return res.status(403).json({status: false, message: 'Unauthorized please contact admin'});
			}
		} catch (error) {
			errorService.printError('Auth Service: adminLogin', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Auth Service: Method to generate access token ******/
	async generateAccessToken(req, res, next) {
		let token;
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-auth_requests.log`;
			logService.writeReqLogFile(logFile, req, 'auth_requests');

			token = await tokenService.generateAccessTokens({email: req.decoded.email, id: req.decoded.id, roleId: req.decoded.roleId});
			const tokenExpiry = await tokenService.getTokenExpiry(token.accessToken);
			token.accessTokenExpiry = tokenExpiry.exp;
			return res.status(200).json({status: true, message: 'New token generated', token: token});
		} catch (error) {
			errorService.printError('Auth Service: generateAccessToken', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Auth Service: Method to get coach primary goals list ******/
	async coachPrimaryGoalsList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-auth_requests.log`;
			logService.writeReqLogFile(logFile, req, 'auth_requests');

			const result = await coachPrimaryGoalsModel.findAll({raw: true});
			if (result) {
				return res.status(200).json({status: true, message: 'Coach Primary goals list', data: result});
			} else {
				return res.status(200).json({status: false, message: 'Coach Primary goals list not found!'});
			}
		} catch (error) {
			errorService.printError('Auth Service: coachPrimaryGoalsList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Auth Service: Method to get coach selections list ******/
	async coachSelectionsList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-auth_requests.log`;
			logService.writeReqLogFile(logFile, req, 'auth_requests');

			const result = await coachSelectionsModel.findAll({raw: true});
			if (result) {
				return res.status(200).json({status: true, message: 'Coach selections list', data: result});
			} else {
				return res.status(200).json({status: false, message: 'Coach selections list not found!'});
			}
		} catch (error) {
			errorService.printError('Auth Service: coachSelectionsList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Auth Service: Method to get player primary goals list ******/
	async playerPrimaryGoalsList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-auth_requests.log`;
			logService.writeReqLogFile(logFile, req, 'auth_requests');

			const result = await playerPrimaryGoalsModel.findAll({raw: true});
			if (result) {
				return res.status(200).json({status: true, message: 'Player Primary goals list', data: result});
			} else {
				return res.status(200).json({status: false, message: 'Player Primary goals list not found!'});
			}
		} catch (error) {
			errorService.printError('Auth Service: playerPrimaryGoalsList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Auth Service: Method to get player selections list ******/
	async playerSelectionsList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-auth_requests.log`;
			logService.writeReqLogFile(logFile, req, 'auth_requests');

			const result = await playerSelectionsModel.findAll({raw: true});
			if (result) {
				return res.status(200).json({status: true, message: 'Player selections list', data: result});
			} else {
				return res.status(200).json({status: false, message: 'Player selections list not found!'});
			}
		} catch (error) {
			errorService.printError('Auth Service: playerSelectionsList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Auth Service: Method to splash screens list ******/
	async splashScreensList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-auth_requests.log`;
			logService.writeReqLogFile(logFile, req, 'auth_requests');

			const result = await splashScreensModel.findAll({raw: true});
			if (result) {
				return res.status(200).json({status: true, message: 'Splash screens list', data: result});
			} else {
				return res.status(200).json({status: false, message: 'Splash screens list not found!'});
			}
		} catch (error) {
			errorService.printError('Auth Service: splashScreensList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Auth Service: Method to send forgot password otp on phone number ******/
	async sendForgotPasswordOtpOnPhone(data) {
		const phoneNumber = data.countryCode + data.phone;
		console.log(data, 'phoneNumber=====', phoneNumber);

		client.messages.create({
			body: `Your verification code for Undiscovered Recruits: ${data.otp}`,
			from: commonConfig.TWILIO_SMS_MUMBER,
			to: phoneNumber,
		})
			.then((message) => console.log(`Message SID: ${message.sid}`))
			.catch((error) => console.error(error));
	}

	/** ***** Auth Service: Method to send verification code on email ******/
	async sendForgotPasswordOtpOnEmail(data) {
		const source = fs.readFileSync(commonConfig.FILE_LOCATION + '/templates/verification_otp_email.hbs', 'utf8');
		const template = Handlebars.compile(source);

		const locals = {
			email: data.email,
			firstName: data.firstName,
			otp: data.otp,
		};

		const msg = {
			to: data.email, // Change to your recipient
			from: commonConfig.SENDGRID_EMAIL_FROM, // Change to your verified sender
			subject: 'Undiscovered Recruits',
			html: template(locals),
		};

		sgMail.send(msg).then(() => {
			console.log('sendForgotPasswordOtpOnEmail Sent');
		});
	}

	/** ***** Auth Service: Method to send forgot password Verification code on phone or email ******/
	async sendForgotPasswordOtp(req, res, next) {
		try {
			const authService = new AuthService();

			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-auth_requests.log`;
			logService.writeReqLogFile(logFile, req, 'auth_requests');

			console.log(req.body.method == 'phone', 'phone====', req.body.method);
			if (req.body.method == 'email') {
				const result = await usersModel.findOne({where: {email: req.body.email}, raw: true});
				if (result) {
					const otp = Math.floor(1000 + Math.random() * 9000);
					console.log('email generatedOtp====', otp);
					const otpData = {
						userId: result.id,
						otp: otp,
						expiryTime: moment().utc().add(5, 'minutes').format('YYYY-MM-DD HH:mm'),
						status: 1,
					};
					const otpResult = otpsModel.create(otpData);
					if (otpResult) {
						const data = {email: result.email, firstName: result.firstName, otp: otp};
						await authService.sendForgotPasswordOtpOnEmail(data);
						return res.status(200).json({status: true, message: 'Verification code sent successfully on your registered email', data: data.email});
					} else {
						return res.status(401).json({status: false, message: 'Verification code not sent!'});
					}
				} else {
					return res.status(403).json({status: false, message: 'Email does not exist!', data: req.body.email.toLowerCase()});
				}
			} else if (req.body.method == 'phone') {
				const result = await usersModel.findOne({where: {phone: req.body.phone}, raw: true});
				if (result) {
					const otp = Math.floor(1000 + Math.random() * 9000);
					console.log('phone generatedOtp====', otp);
					const otpData = {
						userId: result.id,
						otp: otp,
						expiryTime: moment().utc().add(5, 'minutes').format('YYYY-MM-DD HH:mm'),
						status: 1,
					};
					const otpResult = otpsModel.create(otpData);
					if (otpResult) {
						const data = {countryCode: result.countryCode, phone: result.phone, firstName: result.firstName, otp: otp};
						await authService.sendForgotPasswordOtpOnPhone(data);
						return res.status(200).json({status: true, message: 'Verification code sent successfully on your registered phone number', data: data.email});
					} else {
						return res.status(401).json({status: false, message: 'Verification code not sent!'});
					}
				} else {
					return res.status(403).json({status: false, message: 'Phone number does not exist!', data: req.body.phone});
				}
			} else {
				return res.status(403).json({status: false, message: 'Wrong method!'});
			}
		} catch (error) {
			errorService.printError('Auth Service: sendForgotPasswordOtp', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Auth Service: Method to verify fcm token and userid ******/
	async updateFcmToken(userId, fcmToken) {
		try {
			const getUser = await usersModel.findOne({where: {id: userId, fcmToken: fcmToken}, raw: true});
			if (getUser) {
				console.log('getUser======', getUser);
				return true;
			} else {
				const getUserByToken = await usersModel.findOne({where: {fcmToken: fcmToken}, raw: true});
				if (getUserByToken) {
					const updateFcm = await usersModel.update({fcmToken: ''}, {where: {id: getUserByToken.id}});
					if (updateFcm[0]) {
						const update = await usersModel.update({fcmToken: fcmToken}, {where: {id: userId}});
						if (update[0]) {
							return true;
						} else {
							return false;
						}
					} else {
						return false;
					}
				} else {
					const updateFcm = await usersModel.update({fcmToken: fcmToken}, {where: {id: userId}});
					if (updateFcm[0]) {
						console.log(updateFcm, 'updateFcm======', updateFcm[0]);
						return true;
					} else {
						return false;
					}
				}
			}
		} catch (error) {
			return false;
		}
	}

	/** ***** Auth Service: Method to get schools list ******/
	async schoolsList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-auth_requests.log`;
			logService.writeReqLogFile(logFile, req, 'auth_requests');

			if (!req.body.sportsCode) {
				const result = await schoolsModel.findAll({where: {status: 1, isDeleted: 0}, raw: true});
				if (result) {
					return res.status(200).json({status: true, message: 'Schools list', data: result});
				} else {
					return res.status(403).json({status: false, message: 'Schools list not found!'});
				}
			} else {
				let sportsCode = 'Men\'s Basketball';

				if (req.body.sportsCode == 'Women\'s Basketball') {
					sportsCode = 'Women\'s Basketball';
				} else {
					sportsCode = 'Men\'s Basketball';
				}

				const result = await schoolsModel.findAll({where: {sportsCode: sportsCode, status: 1, isDeleted: 0}, raw: true});
				if (result) {
					return res.status(200).json({status: true, message: 'Schools list', data: result});
				} else {
					return res.status(403).json({status: false, message: 'Schools list not found!'});
				}
			}
		} catch (error) {
			errorService.printError('Auth Service: schoolsList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}
}

module.exports = new AuthService();
