const SHA256 = require('crypto-js/sha256');
const usersModel = require('../../models/users');
const kycsModel = require('../../models/kycs');
const userPhotosModel = require('../../models/userPhotos');
const favouritePlayersCoachesModels = require('../../models/favouritePlayersCoaches');
const playerPersonalInformationsModels = require('../../models/playerPersonalInformations');
const playerPersonalityDetailsModels = require('../../models/playerPersonalityDetails');
const playerPersonalityQuestionsModels = require('../../models/playerPersonalityQuestions');
const playerStatsModels = require('../../models/playerStats');
const playersCoachInformationsModels = require('../../models/playersCoachInformations');
const playerGuardianDetailsModels = require('../../models/playerGuardianDetails');
const newsFeedsModels = require('../../models/newsFeeds');
const errorService = require('../ErrorService');
const logService = require('../LogService');
const {dirname} = require('path');
const moment = require('moment');
const {Op, where} = require('sequelize');
const commonConfig = require('../../config/common.config');
const Handlebars = require('handlebars');
const fs = require('fs');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(commonConfig.SENDGRID_API_KEY);
const aws = require('aws-sdk');
const s3 = new aws.S3({
	accessKeyId: commonConfig.AWS_ACCESS_KEY_ID,
	secretAccessKey: commonConfig.AWS_ACCESS_KEY,
	Bucket: commonConfig.AWS_BUCKET_NAME,
});
const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
const {Readable} = require('stream');
const {re} = require('semver');
const coachPersonalInformationsModels = require('../../models/coachPersonalInformations');
const coachCoachingDetailsModels = require('../../models/coachCoachingDetails');
const favouriteNewsFeedsModels = require('../../models/favouriteNewsFeeds');
const guardiansModels = require('../../models/guardians');
const coachRolesModels = require('../../models/coachRoles');
const specializingRolesModels = require('../../models/specializingRoles');
const programTypesModels = require('../../models/programTypes');
const coachPreviousTeamsModels = require('../../models/coachPreviousTeams');
const coachCareerTablesModels = require('../../models/coachCareerTables');
const coachPlayingHistoriesModels = require('../../models/coachPlayingHistories');
const schoolsModel = require('../../models/schools');
const statesModel = require('../../models/states');
const rostersModel = require('../../models/rosters');
const favouriteProgramsModel = require('../../models/favouritePrograms');
const offersModel = require('../../models/offers');
const {usersList} = require('./AdminService');
const followersModel = require('../../models/followers');
const userVideoReelsModel = require('../../models/userVideoReels');
const likedVideoReelsModel = require('../../models/likedVideoReels');
const reportedVideoReelsModel = require('../../models/reportedVideoReels');
const reportedNewsFeedsModel = require('../../models/reportedNewsFeeds');
const accountDeletionRequestsModel = require('../../models/accountDeletionRequests');
const notificationsModel = require('../../models/notifications');
const matchStylesModel = require('../../models/matchStyles');
const e = require('express');
const firebaseAdmin = require('../../firebase/firebaseAdmin');

// newsFeedsModels.hasOne(usersModel, {as: 'user', foreignKey: 'id', sourceKey: 'userId'});
usersModel.hasMany(newsFeedsModels, {as: 'user', foreignKey: 'UserId'});
newsFeedsModels.belongsTo(usersModel, {as: 'user', foreignKey: 'UserId'});

// Players
usersModel.hasOne(playerPersonalInformationsModels, {as: 'playerPersonalInformations', foreignKey: 'userId', sourceKey: 'id'});
usersModel.hasOne(playerStatsModels, {as: 'playerStats', foreignKey: 'userId', sourceKey: 'id'});
usersModel.hasOne(playersCoachInformationsModels, {as: 'playersCoachInformations', foreignKey: 'userId', sourceKey: 'id'});

// Coaches
coachPersonalInformationsModels.hasMany(programTypesModels, {as: 'programTypes', foreignKey: 'id', sourceKey: 'currentProgramId'});
coachPersonalInformationsModels.hasMany(coachRolesModels, {as: 'coachRoles', foreignKey: 'id', sourceKey: 'coachRoleId'});
coachCoachingDetailsModels.hasMany(specializingRolesModels, {as: 'specializingRoles', foreignKey: 'id', sourceKey: 'specializingRoleId'});
coachCareerTablesModels.hasMany(coachRolesModels, {as: 'coachRoles', foreignKey: 'id', sourceKey: 'coachRoleId'});
coachPlayingHistoriesModels.hasMany(programTypesModels, {as: 'programTypes', foreignKey: 'id', sourceKey: 'programTypeId'});

usersModel.hasOne(coachPersonalInformationsModels, {as: 'coachPersonalInformations', foreignKey: 'userId', sourceKey: 'id'});
usersModel.hasOne(coachCoachingDetailsModels, {as: 'coachCoachingDetails', foreignKey: 'userId', sourceKey: 'id'});
usersModel.hasOne(coachPreviousTeamsModels, {as: 'coachPreviousTeams', foreignKey: 'userId', sourceKey: 'id'});
usersModel.hasOne(coachCareerTablesModels, {as: 'coachCareerTables', foreignKey: 'userId', sourceKey: 'id'});
usersModel.hasOne(coachPlayingHistoriesModels, {as: 'coachPlayingHistories', foreignKey: 'userId', sourceKey: 'id'});

usersModel.hasOne(kycsModel, {as: 'kycDetails', foreignKey: 'userId', sourceKey: 'id'});

rostersModel.hasOne(schoolsModel, {as: 'programs', foreignKey: 'id', sourceKey: 'programId'});

coachPersonalInformationsModels.hasMany(schoolsModel, {as: 'programs', foreignKey: 'id', sourceKey: 'currentProgramId'});

offersModel.hasMany(usersModel, {as: 'users', foreignKey: 'id', sourceKey: 'userId'});
offersModel.hasMany(playerPersonalInformationsModels, {as: 'playerPersonalInformations', foreignKey: 'userId', sourceKey: 'userId'});
offersModel.hasMany(playerStatsModels, {as: 'playerStats', foreignKey: 'userId', sourceKey: 'userId'});
offersModel.hasMany(usersModel, {as: 'coaches', foreignKey: 'id', sourceKey: 'coachId'});
offersModel.hasMany(coachPersonalInformationsModels, {as: 'coachPersonalInformations', foreignKey: 'userId', sourceKey: 'coachId'});

schoolsModel.hasMany(coachPersonalInformationsModels, {as: 'coachPersonalInformations', foreignKey: 'currentProgramId', sourceKey: 'id'});
coachPersonalInformationsModels.hasOne(usersModel, {as: 'coach', foreignKey: 'id', sourceKey: 'userId'});

// Photos & Video Reels
userVideoReelsModel.belongsTo(usersModel, {as: 'user', foreignKey: 'UserId'});
usersModel.hasMany(userVideoReelsModel, {as: 'userVideoReels', foreignKey: 'userId', sourceKey: 'id'});
usersModel.hasMany(userPhotosModel, {as: 'userPhotos', foreignKey: 'userId', sourceKey: 'id'});


class UserService {
	/** ***** User Service: Method to get user profile info ******/
	async getUserProfileInfo(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findUser = await usersModel.findOne({attributes: ['roleId'], where: {id: req.decoded.id, status: 1, isDeleted: 0}, raw: true});
			if (findUser?.roleId == 3) {
				const result = await usersModel.findOne({attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
					where: {id: req.decoded.id, roleId: 3, status: 1, isDeleted: 0},
					include: [
						{
							model: kycsModel,
							as: 'kycDetails',
							required: false,
							where: {status: 1, isDeleted: 0},
						},
						{
							model: userPhotosModel,
							as: 'userPhotos',
							required: false,
							where: {status: 1, isDeleted: 0},
						},
					],
				});
				if (result) {
					return res.status(200).json({status: true, message: 'User profile details', data: result});
				} else {
					return res.status(403).json({status: false, message: 'User profile details not found!'});
				}
			} else if (findUser?.roleId == 4) {
				const result = await usersModel.findOne({attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
					where: {id: req.decoded.id, roleId: 4, status: 1, isDeleted: 0},
					include: [
						{
							model: userPhotosModel,
							as: 'userPhotos',
							required: false,
							where: {status: 1, isDeleted: 0},
						},
					],
				});
				if (result) {
					return res.status(200).json({status: true, message: 'User profile details', data: result});
				} else {
					return res.status(403).json({status: false, message: 'User profile details not found!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'User profile details not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: getUserProfileInfo', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to update user profile info ******/
	async updateUserProfileInfo(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const checkPhoneNumber = await usersModel.findOne({
				attributes: ['id', 'phone', 'roleId'],
				where:
				{
					phone: req.body.phone,
					id: {
						[Op.ne]: req.decoded.id,
					},
				}, raw: true,
			});
			if (checkPhoneNumber) {
				return res.status(403).json({status: false, message: 'Phone number already exists!'});
			} else {
				const dataToUpdate = {
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					countryCode: req.body.countryCode,
					phone: req.body.phone,

				};
				const result = await usersModel.update(dataToUpdate, {where: {id: req.decoded.id}});
				if (result) {
					return res.status(200).json({status: true, message: 'User profile details updated successfully'});
				} else {
					return res.status(403).json({status: false, message: 'User profile details not updated!'});
				}
			}
		} catch (error) {
			errorService.printError('User Service: getUserProfileInfo', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to complete user registration ******/
	async completeRegistration(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');
			console.log('type: req.body.type,', req.body.type);

			const dataToUpdate = {
				primaryGoalIds: req.body.primaryGoalIds,
				selectionIds: req.body.selectionIds,
				isRegistrationCompleted: req.body.isRegistrationCompleted,
				roleId: req.body.roleId,
				type: req.body.type,
			};
			const result = await usersModel.update(dataToUpdate, {where: {id: req.decoded.id}});
			if (result) {
				return res.status(200).json({status: true, message: 'Registration details added successfully', data: dataToUpdate});
			} else {
				return res.status(200).json({status: false, message: 'Registration details not added!'});
			}
		} catch (error) {
			errorService.printError('User Service: completeRegistration', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to reset password ******/
	async resetPassword(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const ciphertext = SHA256(req.body.password, commonConfig.PWD_SECRET).toString();
			const dataToUpdate = {
				password: ciphertext,
			};
			const result = await usersModel.update(dataToUpdate, {where: {id: req.decoded.id}});
			if (result) {
				return res.status(200).json({status: true, message: 'Password changed successfully', data: result});
			} else {
				return res.status(200).json({status: false, message: 'Password not changed!'});
			}
		} catch (error) {
			errorService.printError('User Service: resetPassword', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to upload on s3 bucket ******/
	async uploadOnS3Bucket(key, fileBody) {
		try {
			// Set up S3 client
			const s3Client = new S3Client({
				region: commonConfig.AWS_REGION,
				credentials: {
					accessKeyId: commonConfig.AWS_ACCESS_KEY_ID,
					secretAccessKey: commonConfig.AWS_ACCESS_KEY,
				},
			});

			// Create a stream from the image body
			// const stream = Readable.from(fileBody.data);
			// console.log("stream====", stream);
			const params = {
				Bucket: commonConfig.AWS_BUCKET_NAME,
				Key: key,
				Body: fileBody.data,
				ACL: commonConfig.AWS_FILE_PERMISSION,
				ContentType: fileBody.mimetype,
				// contentLength: contentLength,
			};
			console.log('params====', params);

			// Upload image to S3
			const command = new PutObjectCommand(params);
			console.log('command====', command);
			const response = await s3Client.send(command);
			console.log('Image uploaded successfully:', response);
			if (response.$metadata.httpStatusCode == 200) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.log('uploadOnS3Bucket error:', error);
			errorService.printError('User Service: uploadOnS3Bucket', error);
		}
	}

	/** ***** User Service: Method to upload profile picture ******/
	async uploadProfilePicture(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const userService = new UserService();
			// Set up S3 client
			const s3Client = new S3Client({
				region: commonConfig.AWS_REGION,
				credentials: {
					accessKeyId: commonConfig.AWS_ACCESS_KEY_ID,
					secretAccessKey: commonConfig.AWS_ACCESS_KEY,
				},
			});
			const timestamp = Date.now();
			const result = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});
			if (!req.files || Object.keys(req.files).length === 0) {
				return res.status(403).json({status: false, message: 'Please select atleast one picture to upload!'});
			} else {
				const filename = result.id +'-'+ timestamp +'-'+ req.files.file.name;
				const fileBody = req.files.file;
				// const contentLength = Buffer.byteLength(fileBody.data);
				const key = commonConfig.AWS_PROFILE_PICTURES_FOLDER + '/' + filename;

				// Upload on s3 bucket
				const upload = await userService.uploadOnS3Bucket(key, fileBody);
				console.log('upload=======', upload);
				if (upload) {
					const profilePictureUrl = commonConfig.AWS_END_POINT + key;
					const result = await usersModel.update({profilePictureUrl: profilePictureUrl}, {where: {id: req.decoded.id}});
					return res.status(200).json({status: true, message: 'Profile picture uploaded successfully'});
				} else {
					return res.status(500).json({status: false, message: 'Something went wrong!'});
				}
			}
		} catch (error) {
			errorService.printError('User Service: uploadProfilePicture', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get users kyc details ******/
	async userKycDetails(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findKycDetails = await kycsModel.findOne({where: {UserId: req.decoded.id}, raw: true});
			if (findKycDetails) {
				const findUser = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});
				findKycDetails.isKycCompleted = findUser?.isKycCompleted;
				findKycDetails.isKycApproved = findUser?.isKycApproved;
				return res.status(200).json({status: true, message: 'Kyc details', data: findKycDetails});
			} else {
				return res.status(403).json({status: false, message: 'Kyc details not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: userKycDetails', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to upload selfie ******/
	async uploadSelfie(req, res, next) {
		try {
			const userService = new UserService();
			// Set up S3 client
			const s3Client = new S3Client({
				region: commonConfig.AWS_REGION,
				credentials: {
					accessKeyId: commonConfig.AWS_ACCESS_KEY_ID,
					secretAccessKey: commonConfig.AWS_ACCESS_KEY,
				},
			});
			const timestamp = Date.now();
			const result = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});
			if (!req.files || Object.keys(req.files).length === 0) {
				return res.status(403).json({status: false, message: 'Please select atleast one picture to upload!'});
			} else {
				const filename = result.id +'-selfie-'+ timestamp +'-'+ req.files.front.name;
				const fileBody = req.files.front;
				// const contentLength = Buffer.byteLength(fileBody.data);
				const key = commonConfig.AWS_KYC_DOCUMENTS_FOLDER + '/' + filename;

				// Upload on s3 bucket
				const upload = await userService.uploadOnS3Bucket(key, fileBody);
				console.log('upload=======', upload);
				if (upload) {
					// const SelfieUrl = [{front: commonConfig.AWS_END_POINT + key}];
					const SelfieUrl = commonConfig.AWS_END_POINT + key;
					const checkKycDetails = await kycsModel.findOne({where: {userId: req.decoded.id}, raw: true});

					if (checkKycDetails) {
						const dataToUpdate = {
							issuingCountry: req.body.issuingCountry,
							selfieUrl: SelfieUrl,
							isSelfieVerified: 'Pending',
							updatedAt: new Date(),
						};
						await kycsModel.update(dataToUpdate, {where: {userId: req.decoded.id}});
						return res.status(200).json({status: true, message: 'Selfie uploaded successfully'});
					} else {
						const dataToCreate = {
							userId: req.decoded.id,
							issuingCountry: req.body.issuingCountry,
							selfieUrl: SelfieUrl,
							isSelfieVerified: 'Pending',
							createdAt: new Date(),
							updatedAt: new Date(),
						};
						await kycsModel.create(dataToCreate);
						return res.status(200).json({status: true, message: 'Selfie uploaded successfully'});
					}
				} else {
					return res.status(500).json({status: false, message: 'Something went wrong!'});
				}
			}
		} catch (error) {
			errorService.printError('User Service: uploadSelfie', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to upload ID Card ******/
	async uploadIdCard(req, res, next) {
		try {
			const userService = new UserService();
			// Set up S3 client
			const s3Client = new S3Client({
				region: commonConfig.AWS_REGION,
				credentials: {
					accessKeyId: commonConfig.AWS_ACCESS_KEY_ID,
					secretAccessKey: commonConfig.AWS_ACCESS_KEY,
				},
			});
			const timestamp = Date.now();
			const result = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});
			if (!req.files || Object.keys(req.files).length === 0) {
				return res.status(403).json({status: false, message: 'Please select atleast one picture to upload!'});
			} else {
				// front
				const frontFilename = result.id +'-frontIdCard-'+ timestamp +'-'+ req.files.front.name;
				const frontFileBody = req.files.front;
				const frontKey = commonConfig.AWS_KYC_DOCUMENTS_FOLDER + '/' + frontFilename;

				// back
				const backFilename = result.id +'-backIdCard-'+ timestamp +'-'+ req.files.back.name;
				const backFileBody = req.files.back;
				const backKey = commonConfig.AWS_KYC_DOCUMENTS_FOLDER + '/' + backFilename;

				// Upload on s3 bucket
				const frontUpload = await userService.uploadOnS3Bucket(frontKey, frontFileBody);
				const backUpload = await userService.uploadOnS3Bucket(backKey, backFileBody);
				console.log(frontUpload, 'upload=======', backUpload);
				if (frontUpload && backUpload) {
					const frontUrl = commonConfig.AWS_END_POINT + frontKey;
					const backUrl = commonConfig.AWS_END_POINT + backKey;

					const idCardUrl = [{front: frontUrl, back: backUrl}];
					const checkKycDetails = await kycsModel.findOne({where: {userId: req.decoded.id}, raw: true});

					if (checkKycDetails) {
						const dataToUpdate = {
							issuingCountry: req.body.issuingCountry,
							idCardFrontUrl: frontUrl,
							idCardBackUrl: backUrl,
							isIdCardVerified: 'Pending',
							updatedAt: new Date(),
						};
						await kycsModel.update(dataToUpdate, {where: {userId: req.decoded.id}});
						return res.status(200).json({status: true, message: 'ID card uploaded successfully'});
					} else {
						const dataToCreate = {
							userId: req.decoded.id,
							issuingCountry: req.body.issuingCountry,
							idCardFrontUrl: frontUrl,
							idCardBackUrl: backUrl,
							isIdCardVerified: 'Pending',
							createdAt: new Date(),
							updatedAt: new Date(),
						};
						await kycsModel.create(dataToCreate);
						return res.status(200).json({status: true, message: 'ID card uploaded successfully'});
					}
				} else {
					return res.status(500).json({status: false, message: 'Something went wrong!'});
				}
			}
		} catch (error) {
			errorService.printError('User Service: uploadIdCard', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to upload driving license ******/
	async uploadDrivingLicense(req, res, next) {
		try {
			const userService = new UserService();
			// Set up S3 client
			const s3Client = new S3Client({
				region: commonConfig.AWS_REGION,
				credentials: {
					accessKeyId: commonConfig.AWS_ACCESS_KEY_ID,
					secretAccessKey: commonConfig.AWS_ACCESS_KEY,
				},
			});
			const timestamp = Date.now();
			const result = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});
			if (!req.files || Object.keys(req.files).length === 0) {
				return res.status(403).json({status: false, message: 'Please select atleast one picture to upload!'});
			} else {
				// front
				const frontFilename = result.id +'-frontDrivingLicense-'+ timestamp +'-'+ req.files.front.name;
				const frontFileBody = req.files.front;
				const frontKey = commonConfig.AWS_KYC_DOCUMENTS_FOLDER + '/' + frontFilename;

				// back
				const backFilename = result.id +'-backDrivingLicense-'+ timestamp +'-'+ req.files.back.name;
				const backFileBody = req.files.back;
				const backKey = commonConfig.AWS_KYC_DOCUMENTS_FOLDER + '/' + backFilename;

				// Upload on s3 bucket
				const frontUpload = await userService.uploadOnS3Bucket(frontKey, frontFileBody);
				const backUpload = await userService.uploadOnS3Bucket(backKey, backFileBody);
				console.log(frontUpload, 'upload=======', backUpload);
				if (frontUpload && backUpload) {
					const frontUrl = commonConfig.AWS_END_POINT + frontKey;
					const backUrl = commonConfig.AWS_END_POINT + backKey;

					const drivingLicenseUrl = [{front: frontUrl, back: backUrl}];
					const checkKycDetails = await kycsModel.findOne({where: {userId: req.decoded.id}, raw: true});

					if (checkKycDetails) {
						const dataToUpdate = {
							issuingCountry: req.body.issuingCountry,
							drivingLicenseFrontUrl: frontUrl,
							drivingLicenseBackUrl: backUrl,
							isDrivingLicenseVerified: 'Pending',
							updatedAt: new Date(),
						};
						await kycsModel.update(dataToUpdate, {where: {userId: req.decoded.id}});
						return res.status(200).json({status: true, message: 'Driving license uploaded successfully'});
					} else {
						const dataToCreate = {
							userId: req.decoded.id,
							issuingCountry: req.body.issuingCountry,
							drivingLicenseFrontUrl: frontUrl,
							drivingLicenseBackUrl: backUrl,
							isDrivingLicenseVerified: 'Pending',
							createdAt: new Date(),
							updatedAt: new Date(),
						};
						await kycsModel.create(dataToCreate);
						return res.status(200).json({status: true, message: 'Driving license uploaded successfully'});
					}
				} else {
					return res.status(500).json({status: false, message: 'Something went wrong!'});
				}
			}
		} catch (error) {
			errorService.printError('User Service: uploadDrivingLicense', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to upload passport ******/
	async uploadPassport(req, res, next) {
		try {
			const userService = new UserService();
			// Set up S3 client
			const s3Client = new S3Client({
				region: commonConfig.AWS_REGION,
				credentials: {
					accessKeyId: commonConfig.AWS_ACCESS_KEY_ID,
					secretAccessKey: commonConfig.AWS_ACCESS_KEY,
				},
			});
			const timestamp = Date.now();
			const result = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});
			if (!req.files || Object.keys(req.files).length === 0) {
				return res.status(403).json({status: false, message: 'Please select atleast one picture to upload!'});
			} else {
				// front
				const frontFilename = result.id +'-frontPassport-'+ timestamp +'-'+ req.files.front.name;
				const frontFileBody = req.files.front;
				const frontKey = commonConfig.AWS_KYC_DOCUMENTS_FOLDER + '/' + frontFilename;

				// back
				const backFilename = result.id +'-backPassport-'+ timestamp +'-'+ req.files.back.name;
				const backFileBody = req.files.back;
				const backKey = commonConfig.AWS_KYC_DOCUMENTS_FOLDER + '/' + backFilename;

				// Upload on s3 bucket
				const frontUpload = await userService.uploadOnS3Bucket(frontKey, frontFileBody);
				const backUpload = await userService.uploadOnS3Bucket(backKey, backFileBody);
				console.log(frontUpload, 'upload=======', backUpload);
				if (frontUpload && backUpload) {
					const frontUrl = commonConfig.AWS_END_POINT + frontKey;
					const backUrl = commonConfig.AWS_END_POINT + backKey;

					const passportUrl = [{front: frontUrl, back: backUrl}];
					const checkKycDetails = await kycsModel.findOne({where: {userId: req.decoded.id}, raw: true});

					if (checkKycDetails) {
						const dataToUpdate = {
							issuingCountry: req.body.issuingCountry,
							passportFrontUrl: frontUrl,
							passportBackUrl: backUrl,
							isPassportVerified: 'Pending',
							updatedAt: new Date(),
						};
						await kycsModel.update(dataToUpdate, {where: {userId: req.decoded.id}});
						return res.status(200).json({status: true, message: 'Passport uploaded successfully'});
					} else {
						const dataToCreate = {
							userId: req.decoded.id,
							issuingCountry: req.body.issuingCountry,
							passportFrontUrl: frontUrl,
							passportBackUrl: backUrl,
							isPassportVerified: 'Pending',
							createdAt: new Date(),
							updatedAt: new Date(),
						};
						await kycsModel.create(dataToCreate);
						return res.status(200).json({status: true, message: 'Passport uploaded successfully'});
					}
				} else {
					return res.status(500).json({status: false, message: 'Something went wrong!'});
				}
			}
		} catch (error) {
			errorService.printError('User Service: uploadPassport', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get users photos list ******/
	async userPhotosList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await userPhotosModel.findAll({where: {UserId: req.decoded.id, status: 1, isDeleted: 0}, raw: true});
			if (result) {
				return res.status(200).json({status: true, message: 'User photos list', data: result});
			} else {
				return res.status(403).json({status: false, message: 'User photos list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: userPhotosList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get users photos list ******/
	async uploadUserPhotos(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const photos = req.body.photos;
			const photosArr = [];
			for (let i = 0; i<photos.length; i++) {
				photosArr.push({userId: req.decoded.id, photosUrl: [photos[i]]});
			}
			const result = await userPhotosModel.bulkCreate(photosArr);
			if (result) {
				return res.status(200).json({status: true, message: 'Photos uploaded successfully'});
			} else {
				return res.status(403).json({status: false, message: 'Photos not uploaded!'});
			}
		} catch (error) {
			errorService.printError('User Service: uploadUserPhotos', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get users favourite players or coaches list ******/
	async favouritePlayersCoachesList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await favouritePlayersCoachesModels.findAll({where: {UserId: req.decoded.id, status: 1, isDeleted: 0}, raw: true});
			if (result) {
				return res.status(200).json({status: true, message: 'Favourites list', data: result});
			} else {
				return res.status(403).json({status: false, message: 'Favourites list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: favouritePlayersCoachesList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to mark player or coach as favourite ******/
	async markUserAsFavourite(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const dataToCreate = {
				userId: req.decoded.id,
				playerOrCoachId: req.body.playerOrCoachId,
				status: 1,
				isDeleted: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
			};
			const result = await favouritePlayersCoachesModels.create(dataToCreate);
			if (result) {
				const findUser = await usersModel.findOne({where: {id: req.body.playerOrCoachId}, raw: true});
				const fullName = findUser?.firstName +' '+ findUser?.lastName;
				const activityToCreate = {
					userId: req.decoded.id,
					content: `added ${fullName} to the favorites list`,
					isActivity: 1,
					status: 1,
					isDeleted: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				};

				await newsFeedsModels.create(activityToCreate);

				// Send Notification
				if (findUser?.fcmToken) {
					const findViewer = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});
					const fullViewerName = findViewer?.firstName +' '+ findViewer?.lastName;

					const notificationToCreate = {
						userId: findUser.id,
						title: 'Notification!',
						body: `${fullViewerName} added you in the favorites list`,
						notificationType: 'markUserAsFavourite',
						data: {
							userId: `${req.decoded.id}`,
							roleId: `${findViewer.roleId}`,
							notificationType: 'markUserAsFavourite',
						},
						viewStatus: 0,
						status: 1,
						isDeleted: 0,
						createdAt: new Date(),
						updatedAt: new Date(),
					};

					const createNotification = await notificationsModel.create(notificationToCreate);

					if (createNotification) {
						const message = {
							token: findUser?.fcmToken,
							notification: {
								title: notificationToCreate.title,
								body: notificationToCreate.body,
							},
							data: {
								userId: `${notificationToCreate.data.userId}`,
								roleId: `${notificationToCreate.data.roleId}`,
								notificationId: `${createNotification.id}`,
								notificationType: notificationToCreate.data.notificationType,
							},
						};

						firebaseAdmin.messaging().send(message)
							.then((response) => {
								console.log('Successfully sent message:', response);
							})
							.catch((error) => {
								console.log('Error sending message:', error);
							});
					}
				}

				return res.status(200).json({status: true, message: 'Marked as favourite'});
			} else {
				return res.status(403).json({status: false, message: 'Not marked as favourite!'});
			}
		} catch (error) {
			errorService.printError('User Service: markUserAsFavourite', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to unmark favourite ******/
	async unmarkUserAsFavourite(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await favouritePlayersCoachesModels.destroy({where: {userId: req.decoded.id, playerOrCoachId: req.body.playerOrCoachId}});
			if (result) {
				return res.status(200).json({status: true, message: 'Unmarked as favourite'});
			} else {
				return res.status(403).json({status: false, message: 'Unmark failed!'});
			}
		} catch (error) {
			errorService.printError('User Service: unmarkUserAsFavourite', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to add/update player personal information ******/
	async updatePlayerPersonalInformation(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await playerPersonalInformationsModels.findOne({where: {userId: req.decoded.id}, raw: true});
			if (result) {
				const dataToUpdate = {
					school: req.body?.school,
					division: req.body?.division,
					height: req.body?.height,
					weight: req.body?.weight,
					position: req.body?.position,
					birthplace: req.body?.birthplace,
					class: req.body?.class,
					gpa: req.body?.gpa,
					saatScore: req.body?.saatScore,
					actScore: req.body?.actScore,
					ncaaId: req.body?.ncaaId,
					countryCode: req.body?.countryCode,
					phoneNumber: req.body?.phoneNumber,
					email: req.body?.email.toLowerCase(),
					twitterSocialProfile: req.body?.twitterSocialProfile,
					instagramSocialProfile: req.body?.instagramSocialProfile,
					facebookSocialProfile: req.body?.facebookSocialProfile,
					youtubeProfile: req.body?.youtubeProfile,
					currentLocation: req.body?.currentLocation,
					latitude: req.body?.latitude,
					longitude: req.body?.longitude,
					aboutMe: req.body?.aboutMe,
					videoUrl: req.body?.videoUrl,
					updatedAt: new Date(),
				};
				await playerPersonalInformationsModels.update(dataToUpdate, {where: {userId: req.decoded.id}});
				return res.status(200).json({status: true, message: 'Player personal information has been updated successfully'});
			} else {
				const dataToCreate = {
					userId: req.decoded?.id,
					school: req.body?.school,
					division: req.body?.division,
					height: req.body?.height,
					weight: req.body?.weight,
					position: req.body?.position,
					birthplace: req.body?.birthplace,
					class: req.body?.class,
					gpa: req.body?.gpa,
					saatScore: req.body?.saatScore,
					actScore: req.body?.actScore,
					ncaaId: req.body?.ncaaId,
					countryCode: req.body?.countryCode,
					phoneNumber: req.body?.phoneNumber,
					email: req.body?.email.toLowerCase(),
					twitterSocialProfile: req.body?.twitterSocialProfile,
					instagramSocialProfile: req.body?.instagramSocialProfile,
					facebookSocialProfile: req.body?.facebookSocialProfile,
					youtubeProfile: req.body?.youtubeProfile,
					currentLocation: req.body?.currentLocation,
					latitude: req.body?.latitude,
					longitude: req.body?.longitude,
					aboutMe: req.body?.aboutMe,
					videoUrl: req.body?.videoUrl,
					status: 1,
					isDeleted: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				await playerPersonalInformationsModels.create(dataToCreate);
				return res.status(200).json({status: true, message: 'Player personal information has been updated successfully'});
			}
		} catch (error) {
			errorService.printError('User Service: updatePlayerPersonalInformation', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to add/update player stats ******/
	async updatePlayerStats(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await playerStatsModels.findOne({where: {userId: req.decoded.id}, raw: true});
			if (result) {
				const dataToUpdate = {
					year: req.body?.year,
					ppg: req.body?.ppg,
					fgPercentage: req.body?.fgPercentage,
					rpg: req.body?.rpg,
					apg: req.body?.apg,
					updatedAt: new Date(),
				};
				await playerStatsModels.update(dataToUpdate, {where: {userId: req.decoded.id}});
				return res.status(200).json({status: true, message: 'Player stats has been updated successfully'});
			} else {
				const dataToCreate = {
					userId: req.decoded.id,
					year: req.body?.year,
					ppg: req.body?.ppg,
					fgPercentage: req.body?.fgPercentage,
					rpg: req.body?.rpg,
					apg: req.body?.apg,
					status: 1,
					isDeleted: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				await playerStatsModels.create(dataToCreate);
				return res.status(200).json({status: true, message: 'Player stats has been updated successfully'});
			}
		} catch (error) {
			errorService.printError('User Service: updatePlayerStats', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to add/update player personality details ******/
	async updatePlayerPersonalityDetails(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const personalityDetails = req.body.personalityDetails;
			for (let i=0; i< personalityDetails.length; i++) {
				const result = await playerPersonalityDetailsModels.findOne({where: {userId: req.decoded.id, questionId: personalityDetails[i].questionId}, raw: true});
				if (result) {
					const dataToUpdate = {
						answer: personalityDetails[i]?.answer,
						updatedAt: new Date(),
					};

					await playerPersonalityDetailsModels.update(dataToUpdate, {where: {id: result.id}});
				} else {
					const dataToCreate = {
						userId: req.decoded.id,
						questionId: personalityDetails[i].questionId,
						answer: personalityDetails[i]?.answer,
						status: 1,
						isDeleted: 0,
						createdAt: new Date(),
						updatedAt: new Date(),
					};
					await playerPersonalityDetailsModels.create(dataToCreate);
				}
			}
			return res.status(200).json({status: true, message: 'Player personality details has been updated successfully'});
		} catch (error) {
			errorService.printError('User Service: updatePlayerPersonalityDetails', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to add/update players coach information ******/
	async updatePlayersCoachInformation(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await playersCoachInformationsModels.findOne({where: {userId: req.decoded.id}, raw: true});
			if (result) {
				const dataToUpdate = {
					data: req.body.data,
					updatedAt: new Date(),
				};
				await playersCoachInformationsModels.update(dataToUpdate, {where: {userId: req.decoded.id}});
				return res.status(200).json({status: true, message: 'Players coach information has been updated successfully'});
			} else {
				const dataToCreate = {
					userId: req.decoded.id,
					data: req.body.data,
					status: 1,
					isDeleted: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				await playersCoachInformationsModels.create(dataToCreate);
				return res.status(200).json({status: true, message: 'Players coach information has been updated successfully'});
			}
		} catch (error) {
			errorService.printError('User Service: updatePlayersCoachInformation', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to add/update player guardian details ******/
	async updatePlayerGuardianDetails(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await playerGuardianDetailsModels.findOne({where: {userId: req.decoded.id}, raw: true});
			if (result) {
				const dataToUpdate = {
					data: req.body.data,
					updatedAt: new Date(),
				};
				await playerGuardianDetailsModels.update(dataToUpdate, {where: {userId: req.decoded.id}});
				return res.status(200).json({status: true, message: 'Player guardian details has been updated successfully'});
			} else {
				const dataToCreate = {
					userId: req.decoded.id,
					data: req.body.data,
					status: 1,
					isDeleted: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				await playerGuardianDetailsModels.create(dataToCreate);
				return res.status(200).json({status: true, message: 'Player guardian details has been updated successfully'});
			}
		} catch (error) {
			errorService.printError('User Service: updatePlayerGuardianDetails', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get personal information ******/
	async playerPersonalInformation(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findUser = await usersModel.findOne({attributes: ['email', 'countryCode', 'phone', 'firstName', 'lastName', 'profilePictureUrl'], where: {id: req.decoded.id}, raw: true});
			const playerStats = await playerStatsModels.findOne({where: {userId: req.decoded.id}, raw: true});
			const playerPersonalityDetails = await playerPersonalityDetailsModels.findOne({raw: true});
			const playersCoachInformations = await playersCoachInformationsModels.findOne({where: {userId: req.decoded.id}, raw: true});
			const playerGuardianDetails = await playerGuardianDetailsModels.findOne({where: {userId: req.decoded.id}, raw: true});
			const result = await playerPersonalInformationsModels.findOne({where: {userId: req.decoded.id}, raw: true});

			// Calculate profile completion percentage
			let completionCount = 0;
			const totalSections = 6;

			if (playerStats) completionCount++;
			if (playerPersonalityDetails) completionCount++;
			if (playersCoachInformations) completionCount++;
			if (playerGuardianDetails) completionCount++;
			if (findUser?.profilePictureUrl) completionCount++;
			if (result) completionCount++;
			const completionPercentage = Math.round((completionCount / totalSections) * 100);

			if (result) {
				result.profilePictureUrl = findUser?.profilePictureUrl;
				result.firstName = findUser?.firstName;
				result.lastName = findUser?.lastName;
				result.profileCompletion = completionPercentage;
				result.usersEmail = findUser?.email;
				result.usersCountryCode = findUser?.countryCode;
				result.usersPhone = findUser?.phone;
				return res.status(200).json({status: true, message: 'Player Personal information', data: result});
			} else {
				const dataToSend = {
					userId: req.decoded.id,
					school: null,
					height: null,
					weight: null,
					position: null,
					birthplace: null,
					class: null,
					gpa: null,
					saatScore: null,
					actScore: null,
					ncaaId: null,
					countryCode: null,
					phoneNumber: null,
					email: null,
					twitterSocialProfile: null,
					instagramSocialProfile: null,
					facebookSocialProfile: null,
					youtubeProfile: null,
					videoUrl: null,
					profilePictureUrl: findUser?.profilePictureUrl,
					firstName: findUser?.firstName,
					lastName: findUser?.lastName,
					profileCompletion: completionPercentage,
					usersEmail: findUser?.email,
					usersCountryCode: findUser?.countryCode,
					usersPhone: findUser?.phone,
					status: 1,
					isDeleted: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				return res.status(200).json({status: true, message: 'Player personal information', data: dataToSend});
			}
		} catch (error) {
			errorService.printError('User Service: playerPersonalInformation', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get player stats ******/
	async playerStats(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await playerStatsModels.findOne({where: {userId: req.decoded.id}, raw: true});
			if (result) {
				return res.status(200).json({status: true, message: 'Player stats', data: result});
			} else {
				return res.status(403).json({status: false, message: 'Player stats not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: playerStats', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get personality questions ******/
	async playerPersonalityQuestions(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await playerPersonalityQuestionsModels.findAll({raw: true});
			if (result) {
				return res.status(200).json({status: true, message: 'Player personality questions', data: result});
			} else {
				return res.status(403).json({status: false, message: 'Player personality questions not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: playerPersonalityQuestions', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get player personality details ******/
	async playerPersonalityDetails(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const personalityDetails = await playerPersonalityQuestionsModels.findAll({raw: true});
			const personalityDetailsArr = [];
			for (let i=0; i < personalityDetails.length; i++) {
				const result = await playerPersonalityDetailsModels.findOne({where: {userId: req.decoded.id, questionId: personalityDetails[i].id}, raw: true});
				if (result) {
					personalityDetailsArr.push({questionId: personalityDetails[i]?.id, question: personalityDetails[i]?.questions, choices: personalityDetails[i]?.choices, answer: result?.answer});
				} else {
					personalityDetailsArr.push({questionId: personalityDetails[i]?.id, question: personalityDetails[i]?.questions, choices: personalityDetails[i]?.choices, answer: null});
				}
			}
			return res.status(200).json({status: true, message: 'Player personality details', data: personalityDetailsArr});
		} catch (error) {
			errorService.printError('User Service: playerPersonalityDetails', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get address ******/
	async playersCoachInformation(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await playersCoachInformationsModels.findOne({where: {userId: req.decoded.id}, raw: true});
			if (result) {
				return res.status(200).json({status: true, message: 'Players coach information', data: result});
			} else {
				return res.status(403).json({status: false, message: 'Players coach information not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: playersCoachInformation', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get address ******/
	async playerGuardianDetails(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await playerGuardianDetailsModels.findOne({where: {userId: req.decoded.id}, raw: true});
			if (result) {
				return res.status(200).json({status: true, message: 'Player guardian details', data: result});
			} else {
				return res.status(403).json({status: false, message: 'Player guardian details not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: playerGuardianDetails', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get users news feeds list ******/
	async newsFeedsList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await newsFeedsModels.findAll({where: {UserId: req.decoded.id, status: 1, isDeleted: 0},
				include: [{
					model: usersModel,
					as: 'user',
					attributes: ['profilePictureUrl', 'firstName', 'lastName', 'roleId'],
				}],
				order: [['id', 'DESC']],
				raw: true});
			if (result) {
				// Fetch likes count for each feed
				const feedIds = result.map((feed) => feed.id);
				const likesCounts = await favouriteNewsFeedsModels.findAll({
					attributes: ['feedId', [sequelize.fn('COUNT', '*'), 'count']],
					where: {feedId: feedIds},
					group: ['feedId'],
					raw: true,
				});

				const checkUserLikes = await favouriteNewsFeedsModels.findAll({
					where: {feedId: feedIds, userId: req.decoded.id},
					raw: true,
				});

				// Map likes count to the result
				const resultWithLikesCount = await Promise.all(result.map(async (feed) => {
					const likesCount = likesCounts.find((item) => item.feedId === feed.id);
					const checkLike = checkUserLikes?.find((item) => item?.feedId === feed?.id);
					const findFollowing = await followersModel.findOne({where: {userId: feed?.userId, followedById: req.decoded.id}, raw: true});

					return {...feed, likesCount: likesCount ? likesCount.count : 0,
						isLiked: checkLike ? true:false,
						isFollowing: findFollowing ? 1:0,
						profilePictureUrl: feed['user.profilePictureUrl'],
						firstName: feed['user.firstName'],
						lastName: feed['user.lastName'],
						roleId: feed['user.roleId'],
					};
				}));
				return res.status(200).json({status: true, message: 'News feeds list', data: resultWithLikesCount});
			} else {
				return res.status(403).json({status: false, message: 'News feeds list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: newsFeedsList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to create news feeds ******/
	async createNewsFeeds(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const dataToCreate = {
				userId: req.decoded.id,
				content: req.body?.content,
				imagesVideosUrl: req.body?.imagesVideosUrl,
				latitude: req.body?.latitude,
				longitude: req.body?.longitude,
				address: req.body?.address,
				isVideo: req.body?.isVideo,
				status: 1,
				isDeleted: 0,
				isActivity: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			const result = await newsFeedsModels.create(dataToCreate);
			if (result) {
				return res.status(200).json({status: true, message: 'News feed created successfully'});
			} else {
				return res.status(403).json({status: false, message: 'News feed not created!'});
			}
		} catch (error) {
			errorService.printError('User Service: createNewsFeeds', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to update news feeds ******/
	async updateNewsFeeds(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const dataToUpdate = {
				content: req.body?.content,
				latitude: req.body?.latitude,
				longitude: req.body?.longitude,
				address: req.body?.address,
				updatedAt: new Date(),
			};

			const result = await newsFeedsModels.update(dataToUpdate, {where: {userId: req.decoded.id, id: req.body.id}});
			if (result) {
				return res.status(200).json({status: true, message: 'News feed updated successfully'});
			} else {
				return res.status(403).json({status: false, message: 'News feed not updated!'});
			}
		} catch (error) {
			errorService.printError('User Service: updateNewsFeeds', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to create news feeds ******/
	async deleteNewsFeeds(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await newsFeedsModels.update({status: 0, isDeleted: 1}, {where: {userId: req.decoded.id, id: req.body.id}});
			if (result) {
				return res.status(200).json({status: true, message: 'News feed deleted successfully'});
			} else {
				return res.status(403).json({status: false, message: 'News feed not deleted!'});
			}
		} catch (error) {
			errorService.printError('User Service: deleteNewsFeeds', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get coach personal information ******/
	async coachPersonalInformation(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findUser = await usersModel.findOne({attributes: ['email', 'countryCode', 'phone', 'firstName', 'lastName', 'profilePictureUrl'], where: {id: req.decoded.id}, raw: true});
			const coachCoachingDetails = await coachCoachingDetailsModels.findOne({where: {UserId: req.decoded.id, status: 1, isDeleted: 0}, raw: true});
			const coachPreviousTeams = await coachPreviousTeamsModels.findOne({where: {UserId: req.decoded.id, status: 1, isDeleted: 0}, raw: true});
			const coachCareerTables = await coachCareerTablesModels.findOne({where: {UserId: req.decoded.id, status: 1, isDeleted: 0}, raw: true});
			const coachPlayingHistories = await coachPlayingHistoriesModels.findOne({where: {UserId: req.decoded.id, status: 1, isDeleted: 0}, raw: true});
			const result = await coachPersonalInformationsModels.findOne({where: {UserId: req.decoded.id, status: 1, isDeleted: 0}, raw: true});

			// Calculate profile completion percentage
			let completionCount = 0;
			const totalSections = 6;

			if (coachCoachingDetails) completionCount++;
			if (coachPreviousTeams) completionCount++;
			if (coachCareerTables) completionCount++;
			if (coachPlayingHistories) completionCount++;
			if (findUser?.profilePictureUrl) completionCount++;
			if (result) completionCount++;
			const completionPercentage = Math.round((completionCount / totalSections) * 100);

			if (result) {
				result.profilePictureUrl = findUser?.profilePictureUrl;
				result.firstName = findUser?.firstName;
				result.lastName = findUser?.lastName;
				result.profileCompletion = completionPercentage;

				const findCoachRole = await coachRolesModels.findOne({where: {id: result?.coachRoleId}, raw: true});
				const findProgram = await schoolsModel.findOne({where: {id: result?.currentProgramId}, raw: true});

				result.coachRole = findCoachRole ? findCoachRole.name:null;
				result.currentProgram = findProgram ? findProgram.name:null;
				// result.division = findProgram ? findProgram?.division:null;

				result.usersEmail = findUser?.email;
				result.usersCountryCode = findUser?.countryCode;
				result.usersPhone = findUser?.phone;

				return res.status(200).json({status: true, message: 'Coach personal information', data: result});
			} else {
				const dataToSend = {
					userId: req.decoded.id,
					currentProgramId: null,
					coachRoleId: null,
					educationSchool: null,
					educationYear: null,
					educationHistory: null,
					email: null,
					birthplace: null,
					dob: null,
					currentLocation: null,
					twitterSocialProfile: null,
					instagramSocialProfile: null,
					facebookSocialProfile: null,
					youtubeProfile: null,
					videoUrl: null,
					profilePictureUrl: findUser?.profilePictureUrl,
					firstName: findUser?.firstName,
					lastName: findUser?.lastName,
					profileCompletion: completionPercentage,
					coachRole: null,
					currentProgram: null,
					usersEmail: findUser?.email,
					usersCountryCode: findUser?.countryCode,
					usersPhone: findUser?.phone,
					status: 1,
					isDeleted: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				return res.status(200).json({status: true, message: 'Coach personal information', data: dataToSend});
			}
		} catch (error) {
			errorService.printError('User Service: coachPersonalInformation', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to add/update coach personal information ******/
	async updateCoachPersonalInformation(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await coachPersonalInformationsModels.findOne({where: {userId: req.decoded.id}, raw: true});
			if (result) {
				const dataToUpdate = {
					currentProgramId: req.body?.currentProgramId,
					coachRoleId: req.body?.coachRoleId,
					educationSchool: req.body?.educationSchool,
					educationYear: req.body?.educationYear,
					educationHistory: req.body?.educationHistory,
					email: req.body?.email.toLowerCase(),
					birthplace: req.body?.birthplace,
					dob: req.body?.dob,
					currentLocation: req.body?.currentLocation,
					latitude: req.body?.latitude,
					longitude: req.body?.longitude,
					twitterSocialProfile: req.body?.twitterSocialProfile,
					instagramSocialProfile: req.body?.instagramSocialProfile,
					facebookSocialProfile: req.body?.facebookSocialProfile,
					youtubeProfile: req.body?.youtubeProfile,
					videoUrl: req.body?.videoUrl,
					updatedAt: new Date(),
				};
				await coachPersonalInformationsModels.update(dataToUpdate, {where: {userId: req.decoded.id}});
				return res.status(200).json({status: true, message: 'Coach personal information has been updated successfully'});
			} else {
				const dataToCreate = {
					userId: req.decoded.id,
					currentProgramId: req.body?.currentProgramId,
					coachRoleId: req.body?.coachRoleId,
					educationSchool: req.body?.educationSchool,
					educationYear: req.body?.educationYear,
					educationHistory: req.body?.educationHistory,
					email: req.body?.email.toLowerCase(),
					birthplace: req.body?.birthplace,
					dob: req.body?.dob,
					currentLocation: req.body?.currentLocation,
					latitude: req.body?.latitude,
					longitude: req.body?.longitude,
					twitterSocialProfile: req.body?.twitterSocialProfile,
					instagramSocialProfile: req.body?.instagramSocialProfile,
					facebookSocialProfile: req.body?.facebookSocialProfile,
					youtubeProfile: req.body?.youtubeProfile,
					videoUrl: req.body?.videoUrl,
					status: 1,
					isDeleted: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				await coachPersonalInformationsModels.create(dataToCreate);
				return res.status(200).json({status: true, message: 'Coach personal information has been updated successfully'});
			}
		} catch (error) {
			errorService.printError('User Service: updateCoachPersonalInformation', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get coach coaching details ******/
	async coachCoachingDetails(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await coachCoachingDetailsModels.findOne({where: {UserId: req.decoded.id, status: 1, isDeleted: 0}, raw: true});
			if (result) {
				const findSpecializingRole = await specializingRolesModels.findOne({where: {id: result?.specializingRoleId}, raw: true});
				result.specializingRole = findSpecializingRole ? findSpecializingRole.name:null;
				return res.status(200).json({status: true, message: 'Coaching details', data: result});
			} else {
				return res.status(403).json({status: false, message: 'Coaching details not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: coachCoachingDetails', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to add/update coach personal information ******/
	async updateCoachCoachingDetails(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await coachCoachingDetailsModels.findOne({where: {userId: req.decoded.id}, raw: true});
			if (result) {
				const dataToUpdate = {
					aboutMe: req.body?.aboutMe,
					numberOfWins: req.body?.numberOfWins,
					winPercentage: req.body?.winPercentage,
					coachingExperience: req.body?.coachingExperience,
					playerDeveRate: req.body?.playerDeveRate,
					specializingRoleId: req.body?.specializingRoleId,
					coachingHistory: req.body?.coachingHistory,
					updatedAt: new Date(),
				};
				await coachCoachingDetailsModels.update(dataToUpdate, {where: {userId: req.decoded.id}});
				return res.status(200).json({status: true, message: 'Coaching details has been updated successfully'});
			} else {
				const dataToCreate = {
					userId: req.decoded.id,
					aboutMe: req.body?.aboutMe,
					numberOfWins: req.body?.numberOfWins,
					winPercentage: req.body?.winPercentage,
					coachingExperience: req.body?.coachingExperience,
					playerDeveRate: req.body?.playerDeveRate,
					specializingRoleId: req.body?.specializingRoleId,
					coachingHistory: req.body?.coachingHistory,
					status: 1,
					isDeleted: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				await coachCoachingDetailsModels.create(dataToCreate);
				return res.status(200).json({status: true, message: 'Coaching details has been updated successfully'});
			}
		} catch (error) {
			errorService.printError('User Service: updateCoachCoachingDetails', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get coach previous teams ******/
	async coachPreviousTeams(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await coachPreviousTeamsModels.findOne({where: {UserId: req.decoded.id, status: 1, isDeleted: 0}, raw: true});
			if (result) {
				return res.status(200).json({status: true, message: 'Coach previous teams', data: result});
			} else {
				return res.status(403).json({status: false, message: 'Coach previous teams found!'});
			}
		} catch (error) {
			errorService.printError('User Service: coachPreviousTeams', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to add/update coach personal information ******/
	async updateCoachPreviousTeams(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await coachPreviousTeamsModels.findOne({where: {userId: req.decoded.id}, raw: true});
			if (result) {
				const dataToUpdate = {
					data: req.body.data,
					updatedAt: new Date(),
				};
				await coachPreviousTeamsModels.update(dataToUpdate, {where: {userId: req.decoded.id}});
				return res.status(200).json({status: true, message: 'Coach previous teams has been updated successfully'});
			} else {
				const dataToCreate = {
					userId: req.decoded.id,
					data: req.body.data,
					status: 1,
					isDeleted: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				await coachPreviousTeamsModels.create(dataToCreate);
				return res.status(200).json({status: true, message: 'Coach previous teams has been updated successfully'});
			}
		} catch (error) {
			errorService.printError('User Service: updateCoachPreviousTeams', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get coach career table ******/
	async coachCareerTables(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await coachCareerTablesModels.findOne({where: {UserId: req.decoded.id, status: 1, isDeleted: 0}, raw: true});
			if (result) {
				const findCoachRole = await coachRolesModels.findOne({where: {id: result?.coachRoleId}, raw: true});
				result.coachRole = findCoachRole ? findCoachRole.name:null;
				return res.status(200).json({status: true, message: 'Coach career table', data: result});
			} else {
				return res.status(403).json({status: false, message: 'Coach career table not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: coachCareerTables', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to add/update coach career table ******/
	async updateCoachCareerTables(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await coachCareerTablesModels.findOne({where: {userId: req.decoded.id}, raw: true});
			if (result) {
				const dataToUpdate = {
					year: req.body?.year,
					coachRoleId: req.body?.coachRoleId,
					team: req.body?.team,
					division: req.body?.division,
					result: req.body?.result,
					updatedAt: new Date(),
				};
				await coachCareerTablesModels.update(dataToUpdate, {where: {userId: req.decoded.id}});
				return res.status(200).json({status: true, message: 'Coach career table has been updated successfully'});
			} else {
				const dataToCreate = {
					userId: req.decoded.id,
					year: req.body?.year,
					coachRoleId: req.body?.coachRoleId,
					team: req.body?.team,
					division: req.body?.division,
					result: req.body?.result,
					status: 1,
					isDeleted: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				await coachCareerTablesModels.create(dataToCreate);
				return res.status(200).json({status: true, message: 'Coach career table has been updated successfully'});
			}
		} catch (error) {
			errorService.printError('User Service: coachCareerTables', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get coach coaching details ******/
	async coachPlayingHistories(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await coachPlayingHistoriesModels.findOne({where: {UserId: req.decoded.id, status: 1, isDeleted: 0}, raw: true});
			if (result) {
				const findProgramType = await programTypesModels.findOne({where: {id: result?.programTypeId}, raw: true});
				result.programType = findProgramType ? findProgramType.name:null;
				return res.status(200).json({status: true, message: 'Coach playing history', data: result});
			} else {
				return res.status(403).json({status: false, message: 'Coach playing history not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: coachPlayingHistories', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to add/update coach playing history ******/
	async updateCoachPlayingHistories(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await coachPlayingHistoriesModels.findOne({where: {userId: req.decoded.id}, raw: true});
			if (result) {
				const dataToUpdate = {
					year: req.body?.year,
					programTypeId: req.body?.programTypeId,
					updatedAt: new Date(),
				};
				await coachPlayingHistoriesModels.update(dataToUpdate, {where: {userId: req.decoded.id}});
				return res.status(200).json({status: true, message: 'Coach playing history has been updated successfully'});
			} else {
				const dataToCreate = {
					userId: req.decoded.id,
					year: req.body?.year,
					programTypeId: req.body?.programTypeId,
					status: 1,
					isDeleted: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				await coachPlayingHistoriesModels.create(dataToCreate);
				return res.status(200).json({status: true, message: 'Coach playing history has been updated successfully'});
			}
		} catch (error) {
			errorService.printError('User Service: updateCoachPlayingHistories', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}


	/** ***** User Service: Method to mark kyc as complete ******/
	async markKycAsComplete(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const dataToUpdate = {
				isKycCompleted: 1,
				updatedAt: new Date(),
			};

			const result = await usersModel.update(dataToUpdate, {where: {id: req.decoded.id}});
			if (result) {
				return res.status(200).json({status: true, message: 'KYC completed'});
			} else {
				return res.status(403).json({status: false, message: 'KYC not completed!'});
			}
		} catch (error) {
			errorService.printError('User Service: markKycAsComplete', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to mark news feed as favourite ******/
	async markNewsFeedAsFavourite(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const dataToCreate = {
				userId: req.decoded.id,
				feedId: req.body.feedId,
				status: 1,
				isDeleted: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
			};
			const result = await favouriteNewsFeedsModels.create(dataToCreate);
			if (result) {
				return res.status(200).json({status: true, message: 'Marked as favourite'});
			} else {
				return res.status(403).json({status: false, message: 'Not marked as favourite!'});
			}
		} catch (error) {
			errorService.printError('User Service: markNewsFeedAsFavourite', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to unmark news feed as favourite ******/
	async unmarkNewsFeedAsFavourite(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await favouriteNewsFeedsModels.destroy({where: {userId: req.decoded.id, feedId: req.body.feedId}});
			if (result) {
				return res.status(200).json({status: true, message: 'Unmarked as favourite'});
			} else {
				return res.status(403).json({status: false, message: 'Unmark failed!'});
			}
		} catch (error) {
			errorService.printError('User Service: unmarkNewsFeedAsFavourite', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get guardians list ******/
	async guardiansList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await guardiansModels.findAll({where: {status: 1, isDeleted: 0}, raw: true});
			if (result) {
				return res.status(200).json({status: true, message: 'Guardians list', data: result});
			} else {
				return res.status(403).json({status: false, message: 'Guardians list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: guardiansList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get coach roles list ******/
	async coachRolesList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await coachRolesModels.findAll({where: {status: 1, isDeleted: 0}, raw: true});
			if (result) {
				return res.status(200).json({status: true, message: 'Coach roles list', data: result});
			} else {
				return res.status(403).json({status: false, message: 'Coach roles list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: coachRolesList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get specializing roles list ******/
	async specializingRolesList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await specializingRolesModels.findAll({where: {status: 1, isDeleted: 0}, raw: true});
			if (result) {
				return res.status(200).json({status: true, message: 'Specializing roles list', data: result});
			} else {
				return res.status(403).json({status: false, message: 'Specializing roles list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: specializingRolesList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get program types list ******/
	async programTypesList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await programTypesModels.findAll({where: {status: 1, isDeleted: 0}, raw: true});
			if (result) {
				return res.status(200).json({status: true, message: 'Program types list', data: result});
			} else {
				return res.status(403).json({status: false, message: 'Program types list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: programTypesList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get player profile complete details ******/
	async playersCompleteProfileDetails(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await usersModel.findOne({attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
				where: {id: req.decoded.id, roleId: 4, status: 1, isDeleted: 0},
				include: [
					{
						model: playerPersonalInformationsModels,
						as: 'playerPersonalInformations',
						required: false,
					},
					{
						model: playerStatsModels,
						as: 'playerStats',
						required: false,
					},
					{
						model: playersCoachInformationsModels,
						as: 'playersCoachInformations',
						required: false,
					},
				],
			});

			if (result) {
				return res.status(200).json({status: true, message: 'Player profile details', data: result});
			} else {
				return res.status(403).json({status: false, message: 'Player profile details not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: playersCompleteProfileDetails', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get player profile complete details by id ******/
	async playersCompleteProfileDetailsById(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await usersModel.findOne({attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
				where: {id: req.params.id, roleId: 4, status: 1, isDeleted: 0},
				include: [
					{
						model: playerPersonalInformationsModels,
						as: 'playerPersonalInformations',
						required: false,
					},
					{
						model: playerStatsModels,
						as: 'playerStats',
						required: false,
					},
					{
						model: playersCoachInformationsModels,
						as: 'playersCoachInformations',
						required: false,
					},
				],
			});

			if (result) {
				const findFollowing = await followersModel.findOne({where: {userId: req.params.id, followedById: req.decoded.id}, raw: true});
				if (findFollowing) {
					result.dataValues.isFollowing = 1;
				} else {
					result.dataValues.isFollowing = 0;
				}

				const findFavourites = await favouritePlayersCoachesModels.findOne({where: {userId: req.decoded.id, playerOrCoachId: req.params.id}, raw: true});
				if (findFavourites) {
					result.dataValues.isFavourite = true;
				} else {
					result.dataValues.isFavourite = false;
				}

				const findCoachPersonalInformations = await coachPersonalInformationsModels.findOne({where: {userId: req.decoded.id}, raw: true});
				if (findCoachPersonalInformations?.currentProgramId) {
					const findOffers = await offersModel.findOne({where: {userId: req.params.id, programId: findCoachPersonalInformations?.currentProgramId}, raw: true});
					console.log(findCoachPersonalInformations?.currentProgramId, 'findOffers========', findOffers);
					if (findOffers?.requestStatus == 'Offered') {
						result.dataValues.offersStatus = 1;
					} else if (findOffers?.requestStatus == 'Committed' || findOffers?.requestStatus == 'Requested') {
						result.dataValues.offersStatus = 2;
					} else {
						result.dataValues.offersStatus = 0;
					}
				} else {
					result.dataValues.offersStatus = 0;
				}

				return res.status(200).json({status: true, message: 'Player profile details', data: result});
			} else {
				return res.status(403).json({status: false, message: 'Player profile details not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: playersCompleteProfileDetailsById', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get coach profile complete details ******/
	async coachesCompleteProfileDetails(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await usersModel.findOne({attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
				where: {id: req.decoded.id, roleId: 3, status: 1, isDeleted: 0},
				include: [
					{
						model: coachPersonalInformationsModels,
						as: 'coachPersonalInformations',
						required: false,
						include: [
							{
								model: programTypesModels,
								as: 'programTypes',
								required: false,
							},
							{
								model: coachRolesModels,
								as: 'coachRoles',
								required: false,
							},
						],
					},
					{
						model: coachCoachingDetailsModels,
						as: 'coachCoachingDetails',
						required: false,
						include: [
							{
								model: specializingRolesModels,
								as: 'specializingRoles',
								required: false,
							},
						],
					},
					{
						model: coachPreviousTeamsModels,
						as: 'coachPreviousTeams',
						required: false,
					},
					{
						model: coachCareerTablesModels,
						as: 'coachCareerTables',
						required: false,
						include: [
							{
								model: coachRolesModels,
								as: 'coachRoles',
								required: false,
							},
						],
					},
					{
						model: coachPlayingHistoriesModels,
						as: 'coachPlayingHistories',
						required: false,

					},
				],
			});

			const findOffers = await offersModel.findOne({where: {userId: req.decoded.id, requestedById: req.decoded.id, coachId: req.params.id, requestStatus: 'Requested'}, raw: true});
			if (findOffers) {
				result.dataValues.offersStatus = true;
			} else {
				result.dataValues.offersStatus = false;
			}

			if (result) {
				return res.status(200).json({status: true, message: 'Coach profile details', data: result});
			} else {
				return res.status(403).json({status: false, message: 'Coach profile details not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: coachesCompleteProfileDetails', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get coach profile complete details ******/
	async coachesCompleteProfileDetailsById(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await usersModel.findOne({attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
				where: {id: req.params.id, roleId: 3, status: 1, isDeleted: 0},
				include: [
					{
						model: coachPersonalInformationsModels,
						as: 'coachPersonalInformations',
						required: false,
						include: [
							{
								model: programTypesModels,
								as: 'programTypes',
								required: false,
							},
							{
								model: coachRolesModels,
								as: 'coachRoles',
								required: false,
							},
						],
					},
					{
						model: coachCoachingDetailsModels,
						as: 'coachCoachingDetails',
						required: false,
						include: [
							{
								model: specializingRolesModels,
								as: 'specializingRoles',
								required: false,
							},
						],
					},
					{
						model: coachPreviousTeamsModels,
						as: 'coachPreviousTeams',
						required: false,
					},
					{
						model: coachCareerTablesModels,
						as: 'coachCareerTables',
						required: false,
						include: [
							{
								model: coachRolesModels,
								as: 'coachRoles',
								required: false,
							},
						],
					},
					{
						model: coachPlayingHistoriesModels,
						as: 'coachPlayingHistories',
						required: false,

					},
				],
			});

			if (result) {
				const findFollowing = await followersModel.findOne({where: {userId: req.params.id, followedById: req.decoded.id}, raw: true});
				if (findFollowing) {
					result.dataValues.isFollowing = 1;
				} else {
					result.dataValues.isFollowing = 0;
				}

				const findFavourites = await favouritePlayersCoachesModels.findOne({where: {userId: req.decoded.id, playerOrCoachId: req.params.id}, raw: true});
				if (findFavourites) {
					result.dataValues.isFavourite = true;
				} else {
					result.dataValues.isFavourite = false;
				}

				const findCoachPersonalInformations = await coachPersonalInformationsModels.findOne({where: {userId: req.params.id}, raw: true});

				if (findCoachPersonalInformations?.currentProgramId) {
					const findOffers = await offersModel.findOne({where: {userId: req.decoded.id, programId: findCoachPersonalInformations?.currentProgramId}, raw: true});
					if (findOffers?.requestStatus == 'Requested') {
						result.dataValues.offersStatus = 1;
					} else if (findOffers?.requestStatus == 'Committed' || findOffers?.requestStatus == 'Offered') {
						result.dataValues.offersStatus = 2;
					} else {
						result.dataValues.offersStatus = 0;
					}
				} else {
					result.dataValues.offersStatus = 0;
				}

				return res.status(200).json({status: true, message: 'Coach profile details', data: result});
			} else {
				return res.status(403).json({status: false, message: 'Coach profile details not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: coachesCompleteProfileDetailsById', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get users photos list by id ******/
	async userPhotosListById(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await userPhotosModel.findAll({where: {UserId: req.params.id, status: 1, isDeleted: 0}, raw: true});
			if (result) {
				return res.status(200).json({status: true, message: 'User photos list', data: result});
			} else {
				return res.status(403).json({status: false, message: 'User photos list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: userPhotosList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get users news feeds list by id ******/
	async newsFeedsListById(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findreportedNewsFeeds = await reportedNewsFeedsModel.findAll({where: {userId: req.decoded.id}, raw: true});
			let reportedNewsFeedsArr = [];
			if (findreportedNewsFeeds.length === 0) {
				reportedNewsFeedsArr = [];
			} else {
				reportedNewsFeedsArr = findreportedNewsFeeds.map((feeds) => feeds.feedId);
			}

			console.log('reportedNewsFeedsArr=======', reportedNewsFeedsArr);

			const findUser = await usersModel.findOne({where: {id: req.params.id}, raw: true});
			if (findUser?.roleId == 3) {
				const result = await newsFeedsModels.findAll({
					where: {
						id: {
							[Op.notIn]: reportedNewsFeedsArr,
						},
						UserId: req.params.id,
						status: 1,
						isDeleted: 0},
					include: [{
						model: usersModel,
						as: 'user',
						attributes: ['profilePictureUrl', 'firstName', 'lastName', 'roleId'],
						include: [{
							model: coachPersonalInformationsModels,
							as: 'coachPersonalInformations',
							required: false,
							include: [{
								model: schoolsModel,
								as: 'programs',
								required: false,
							}],
						}],
					}],
					order: [['id', 'DESC']],
					raw: true});
				if (result) {
					// Fetch likes count for each feed
					const feedIds = result.map((feed) => feed.id);
					const likesCounts = await favouriteNewsFeedsModels.findAll({
						attributes: ['feedId', [sequelize.fn('COUNT', '*'), 'count']],
						where: {feedId: feedIds},
						group: ['feedId'],
						raw: true,
					});

					const checkUserLikes = await favouriteNewsFeedsModels.findAll({
						where: {feedId: feedIds, userId: req.decoded.id},
						raw: true,
					});


					// Map likes count to the results
					const resultWithLikesCount = await Promise.all(result.map(async (feed) => {
						const divisionLogo = await programTypesModels.findOne({
							where: {name: feed['user.coachPersonalInformations.programs.division']},
							raw: true,
						});

						const likesCount = likesCounts.find((item) => item.feedId === feed.id);
						const checkLike = checkUserLikes?.find((item) => item?.feedId === feed?.id);
						const findFollowing = await followersModel.findOne({where: {userId: feed?.userId, followedById: req.decoded.id}, raw: true});

						return {...feed, likesCount: likesCount ? likesCount.count : 0,
							isLiked: checkLike ? true:false,
							isFollowing: findFollowing ? 1:0,
							profilePictureUrl: feed['user.profilePictureUrl'],
							firstName: feed['user.firstName'],
							lastName: feed['user.lastName'],
							roleId: feed['user.roleId'],
							divisionLogo: divisionLogo ? divisionLogo?.logo:null,
							colorCode: divisionLogo ? divisionLogo?.colorCode:null,
						};
					}));

					// // Map likes count to the result
					// const resultWithLikesCount = result.map((feed) => {
					// 	const likesCount = likesCounts.find((item) => item.feedId === feed.id);
					// 	const checkLike = checkUserLikes?.find((item) => item?.feedId === feed?.id);
					// 	return {...feed, likesCount: likesCount ? likesCount.count : 0,
					// 		isLiked: checkLike ? true:false,
					// 		profilePictureUrl: feed['user.profilePictureUrl'],
					// 		firstName: feed['user.firstName'],
					// 		lastName: feed['user.lastName'],
					// 		roleId: feed['user.roleId'],
					// 	};
					// });
					return res.status(200).json({status: true, message: 'News feeds list', data: resultWithLikesCount});
				} else {
					return res.status(403).json({status: false, message: 'News feeds list not found!'});
				}
			} else if (findUser?.roleId == 4) {
				const result = await newsFeedsModels.findAll({
					where: {
						id: {
							[Op.notIn]: reportedNewsFeedsArr,
						},
						UserId: req.params.id,
						status: 1,
						isDeleted: 0},
					include: [{
						model: usersModel,
						as: 'user',
						attributes: ['profilePictureUrl', 'firstName', 'lastName', 'roleId'],
					}],
					order: [['id', 'DESC']],
					raw: true});
				if (result) {
					// Fetch likes count for each feed
					const feedIds = result.map((feed) => feed.id);
					const likesCounts = await favouriteNewsFeedsModels.findAll({
						attributes: ['feedId', [sequelize.fn('COUNT', '*'), 'count']],
						where: {feedId: feedIds},
						group: ['feedId'],
						raw: true,
					});

					const checkUserLikes = await favouriteNewsFeedsModels.findAll({
						where: {feedId: feedIds, userId: req.decoded.id},
						raw: true,
					});

					// Map likes count to the result
					const resultWithLikesCount =  await Promise.all(result.map(async (feed) => {
						const likesCount = likesCounts.find((item) => item.feedId === feed.id);
						const checkLike = checkUserLikes?.find((item) => item?.feedId === feed?.id);
						const findFollowing = await followersModel.findOne({where: {userId: feed?.userId, followedById: req.decoded.id}, raw: true});

						return {...feed, likesCount: likesCount ? likesCount.count : 0,
							isLiked: checkLike ? true:false,
							isFollowing: findFollowing ? 1:0,
							profilePictureUrl: feed['user.profilePictureUrl'],
							firstName: feed['user.firstName'],
							lastName: feed['user.lastName'],
							roleId: feed['user.roleId'],
						};
					}));
					return res.status(200).json({status: true, message: 'News feeds list', data: resultWithLikesCount});
				} else {
					return res.status(403).json({status: false, message: 'News feeds list not found!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'News feeds list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: newsFeedsList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to search players ******/
	async searchPlayersWithFilters(playerFilters, playerPersonalInformationsFilters, playerPersonalInformationStatus, offset, limit) {
		try {
			console.log('searchPlayersWithFilters======================', playerFilters, playerPersonalInformationsFilters, playerPersonalInformationStatus, offset, limit);
			if (playerFilters.firstname !== undefined || playerPersonalInformationStatus == 1) {
				console.log('searchPlayersWithFilters - if condition starts============');
				const {count, rows} = await usersModel.findAndCountAll({
					attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
					where: playerFilters,
					include: [{
						model: playerPersonalInformationsModels,
						as: 'playerPersonalInformations',
						where: playerPersonalInformationsFilters,
					}, 
					{
						model: playerStatsModels,
						as: 'playerStats',
						required: false,
					}],
					offset: offset,
					limit: limit,
					raw: true,
				});
				return {
					totalUsers: count,
					users: rows,
				};
			} else {

			console.log('searchPlayersWithFilters - else condition starts============');
			const {count, rows} = await usersModel.findAndCountAll({
				attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
				where: playerFilters,
				include: [{
					model: playerPersonalInformationsModels,
					as: 'playerPersonalInformations',
					where: playerPersonalInformationsFilters,
					required: false,
				}, 
				{
					model: playerStatsModels,
					as: 'playerStats',
					required: false,
				}],

				offset: offset,
				limit: limit,
				raw: true,
			});

			return {
				totalUsers: count,
				users: rows,
			};
			}
		} catch (error) {
			errorService.printError('User Service: searchPlayersWithFilters', error);
			console.log('searchPlayersWithFilters error: ', error);
		}
	}

	/** ***** User Service: Method to search players ******/
	async searchPlayers(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const userService = new UserService();

			console.log('searchPlayers======================', req.body);

			// Define your filters with conditional logic
			const playerFilters = {
				roleId: 4,
				status: 1,
				isDeleted: 0,
			};
			if (req.body.name) {
				playerFilters.firstname = {
					[Op.like]: `%${req.body.name}%`,
				};
			}

			const playerPersonalInformationsFilters = {};
			let playerPersonalInformationStatus = 0;

			if (req.body.position) {
				playerPersonalInformationsFilters.position = req.body.position;
				playerPersonalInformationStatus = 1;
			}
			if (req.body.height) {
				playerPersonalInformationsFilters.height = req.body.height;
				playerPersonalInformationStatus = 1;
			}
			if (req.body.gpaFrom && req.body.gpaTo) {
				playerPersonalInformationsFilters.gpa = {
					[Op.between]: [req.body.gpaFrom, req.body.gpaTo],
				};
				playerPersonalInformationStatus = 1;
			}
			if (req.body.year) {
				playerPersonalInformationsFilters.class = req.body.year;
				playerPersonalInformationStatus = 1;
			}

			const result = await userService.searchPlayersWithFilters(playerFilters, playerPersonalInformationsFilters, playerPersonalInformationStatus, req.body.offset, req.body.limit);
			if (result) {
				// Fetch likes count
				const usersArr = result.users;
				const userIds = usersArr.map((users) => users.id);

				const checkFavoriteUsers = await favouritePlayersCoachesModels.findAll({
					where: {playerOrCoachId: userIds, userId: req.decoded.id},
					raw: true,
				});

				console.log(userIds, 'usersArr========', usersArr);

				// Map likes count to the result
				const resultWithLikesCount = await Promise.all(usersArr.map(async (user) => {
					const findFollowing = await followersModel.findOne({where: {userId: user?.id, followedById: req.decoded.id}, raw: true});
					const checkFavourite = checkFavoriteUsers?.find((item) => item?.playerOrCoachId === user?.id);
					return {...user,
						isFavourite: checkFavourite ? true:false,
						isFollowing: findFollowing ? 1:0,
					};
				}));

				const finalData = {
					totalUsers: result.totalUsers,
					users: resultWithLikesCount,
				};

				return res.status(200).json({status: true, message: 'Players search list', data: finalData});
			} else {
				return res.status(403).json({status: false, message: 'Player search list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: searchPlayers', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to search players ******/
	async searchCoachesWithFilters(coachFilters, coachPersonalInformationsFilters, coachPersonalInformationStatus, offset, limit) {
		try {
			console.log('searchCoachesWithFilters======================', coachFilters, coachPersonalInformationsFilters, coachPersonalInformationStatus, offset, limit);
			if (coachFilters.firstname !== undefined || coachPersonalInformationStatus == 1) {
				console.log('searchCoachesWithFilters - if condition starts============');
				const {count, rows} = await usersModel.findAndCountAll({
					attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
					where: coachFilters,
					include: [{
						model: coachPersonalInformationsModels,
						as: 'coachPersonalInformations',
						where: coachPersonalInformationsFilters,
						include: [{
							model: schoolsModel,
							as: 'programs',
							required: false,
						}],
					},
					{
						model: coachCoachingDetailsModels,
						as: 'coachCoachingDetails',
						required: false,
					}],
					offset: offset,
					limit: limit,
					raw: true,
				});
				return {
					totalUsers: count,
					users: rows,
				};
			} else {
			console.log('searchCoachesWithFilters - else condition starts============');
			const {count, rows} = await usersModel.findAndCountAll({
				attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
				where: coachFilters,
				include: [{
					model: coachPersonalInformationsModels,
					as: 'coachPersonalInformations',
					where: coachPersonalInformationsFilters,
					required: false,
					include: [{
						model: schoolsModel,
						as: 'programs',
						required: false,
					}],
				},
				{
					model: coachCoachingDetailsModels,
					as: 'coachCoachingDetails',
					required: false,
				}],
				offset: offset,
				limit: limit,
				raw: true,
			});
			return {
				totalUsers: count,
				users: rows,
			};
			}
		} catch (error) {
			errorService.printError('User Service: searchCoachesWithFilters', error);
			console.log('searchCoachesWithFilters error: ', error);
		}
	}

	/** ***** User Service: Method to search coaches ******/
	async searchCoaches(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const userService = new UserService();

			console.log('searchCoaches======================', req.body);

			// Define your filters with conditional logic
			const coachFilters = {
				roleId: 3,
				status: 1,
				isDeleted: 0,
			};
			if (req.body.name) {
				coachFilters.firstname = {
					[Op.like]: `%${req.body.name}%`,
				};
			}

			const coachPersonalInformationsFilters = {};
			let coachPersonalInformationStatus = 0;

			if (req.body.isKycApproved) {
				coachFilters.isKycApproved = req.body.isKycApproved;
				coachPersonalInformationStatus = 1;
			}

			// if (req.body.currentProgramId) {
			// 	coachPersonalInformationsFilters.currentProgramId = req.body.currentProgramId;
			// 	coachPersonalInformationStatus = 1;
			// }

			const result = await userService.searchCoachesWithFilters(coachFilters, coachPersonalInformationsFilters, coachPersonalInformationStatus, req.body.offset, req.body.limit);
			if (result) {
				// Fetch likes count
				const usersArr = result.users;
				const userIds = usersArr.map((users) => users.id);

				const checkFavoriteUsers = await favouritePlayersCoachesModels.findAll({
					where: {playerOrCoachId: userIds, userId: req.decoded.id},
					raw: true,
				});

				let filteredUsers = [];
				if (req.body.division || req.body.state || req.body.tuitionFeesFrom || req.body.tuitionFeesTo) {
					console.log('if================');

					filteredUsers = usersArr.filter((users) => {
						if (req.body.division) {
							return users['coachPersonalInformations.programs.division'] === req.body.division;
						}

						if (req.body.state) {
							return users['coachPersonalInformations.programs.state'] === req.body.state;
						}

						if (req.body.tuitionFeesFrom) {
							return users['coachPersonalInformations.programs.tuitionFees'] >= req.body.tuitionFeesFrom && users['coachPersonalInformations.programs.tuitionFees'] <= req.body.tuitionFeesTo;
						}

						return false;
					},

						// users['coachPersonalInformations.programs.division'] === req.body.division || users['coachPersonalInformations.programs.state'] === req.body.state || (users['coachPersonalInformations.programs.tuitionFees'] >= req.body.tuitionFeesFrom && users['coachPersonalInformations.programs.tuitionFees'] <= req.body.tuitionFeesTo)
					);
				} else {
					console.log('else================');
					filteredUsers = usersArr;
				}

				console.log('filteredUsers==================', filteredUsers);

				// Map likes count to the result
				const resultWithLikesCount = await Promise.all(filteredUsers.map(async (user) => {
					const divisionLogo = await programTypesModels.findOne({
						where: {name: user['coachPersonalInformations.programs.division']},
						raw: true,
					});

					const checkFavourite = checkFavoriteUsers?.find((item) => item?.playerOrCoachId === user?.id);
					return {...user,
						isFavourite: checkFavourite ? true:false,
						divisionLogo: divisionLogo ? divisionLogo?.logo:null,
						colorCode: divisionLogo ? divisionLogo?.colorCode:null,
					};
				}));

				const finalData = {
					totalUsers: filteredUsers.length,
					users: resultWithLikesCount,
				};

				return res.status(200).json({status: true, message: 'Coaches search list', data: finalData});
			} else {
				return res.status(403).json({status: false, message: 'Coaches search list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: searchCoaches', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to delete users photos list ******/
	async deleteUserPhotos(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const dataToUpdate = {
				status: 0,
				isDeleted: 1,
			};
			const result = await userPhotosModel.update(dataToUpdate, {where: {id: req.params.id, UserId: req.decoded.id}, raw: true});
			if (result) {
				return res.status(200).json({status: true, message: 'Photo deleted successfully'});
			} else {
				return res.status(403).json({status: false, message: 'Photo not deleted!'});
			}
		} catch (error) {
			errorService.printError('User Service: deleteUserPhotos', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get schools list ******/
	async schoolsList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');
			const findUser = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});

			let sportsCode = 'Men\'s Basketball';

			if (findUser?.type == 'WBB') {
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
		} catch (error) {
			errorService.printError('User Service: schoolsList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get states list ******/
	async statesList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await statesModel.findAll({where: {status: 1, isDeleted: 0}, raw: true});
			if (result) {
				return res.status(200).json({status: true, message: 'States list', data: result});
			} else {
				return res.status(403).json({status: false, message: 'States list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: statesList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to search programs ******/
	async searchProgramsWithFilters(programFilters, offset, limit) {
		try {
			console.log('searchProgramsWithFilters======================', programFilters, offset, limit);
			const {count, rows} = await schoolsModel.findAndCountAll({
				// attributes: {exclude: ['phone']},
				where: programFilters,
				offset: offset,
				limit: limit,
				raw: true,
			});
			return {
				totalPrograms: count,
				programs: rows,
			};
		} catch (error) {
			errorService.printError('User Service: searchProgramsWithFilters', error);
			console.log('searchProgramsWithFilters error: ', error);
		}
	}

	/** ***** User Service: Method to search programs ******/
	async searchPrograms(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const userService = new UserService();

			console.log('searchPrograms======================', req.body);

			// Define your filters with conditional logic
			const programFilters = {
				status: 1,
				isDeleted: 0,
			};
			if (req.body.name) {
				programFilters.name = {
					[Op.like]: `%${req.body.name}%`,
				};
			}

			if (req.body.division) {
				programFilters.division = req.body.division;
			}

			if (req.body.state) {
				programFilters.state = req.body.state;
			}

			const findUser = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});

			if (findUser?.type == 'WBB') {
				programFilters.sportsCode = 'Women\'s Basketball';
			} else {
				programFilters.sportsCode = 'Men\'s Basketball';
			}

			if (req.body.tuitionFeesFrom && req.body.tuitionFeesTo) {
				programFilters.tuitionFees = {
					[Op.between]: [req.body.tuitionFeesFrom, req.body.tuitionFeesTo],
				};
			}

			const result = await userService.searchProgramsWithFilters(programFilters, req.body.offset, req.body.limit);
			if (result) {
				// Fetch likes count for each program
				const programsArr = result.programs;
				const programIds = programsArr.map((program) => program.id);
				const rosterPlayersCount = await rostersModel.findAll({
					attributes: ['programId', [sequelize.fn('COUNT', '*'), 'count']],
					where: {programId: programIds, status: 1, isDeleted: 0},
					group: ['programId'],
					raw: true,
				});

				const checkFavoritePrograms = await favouriteProgramsModel.findAll({
					where: {programId: programIds, userId: req.decoded.id},
					raw: true,
				});

				// Map likes count to the result
				const resultWithLikesCount = await Promise.all(programsArr.map( async (program) => {
					const calculateOpenings = await rostersModel.findAll({
						attributes: [
							[sequelize.fn('SUM', sequelize.col('openings')), 'total'],
						],
						where: {programId: program.id},
						raw: true,
					});

					const divisionLogo = await programTypesModels.findOne({
						where: {name: program.division},
						raw: true,
					});

					const totalOpenings = calculateOpenings[0]?.total ? calculateOpenings[0]?.total:0;
					const rosterPlayersTotalCount = rosterPlayersCount.find((item) => item.programId === program.id);
					const checkFavourite = checkFavoritePrograms?.find((item) => item?.programId === program?.id);
					return {...program,
						playersCount: rosterPlayersTotalCount ? rosterPlayersTotalCount.count : 0,
						isFavourite: checkFavourite ? true:false,
						totalOpenings: parseInt(totalOpenings),
						divisionLogo: divisionLogo ? divisionLogo?.logo:null,
						colorCode: divisionLogo ? divisionLogo?.colorCode:null,
					};
				}));

				const finalData = {
					totalPrograms: result.totalPrograms,
					programs: resultWithLikesCount,
				};

				return res.status(200).json({status: true, message: 'Programs search list', data: finalData});
			} else {
				return res.status(403).json({status: false, message: 'Programs search list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: searchPrograms', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to mark program as favourite or unfavourite ******/
	async markProgramsAsFavouriteOrUnfavourite(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			if (req.body.isFavourite == 0) {
				const result = await favouriteProgramsModel.destroy({where: {userId: req.decoded.id, programId: req.body.programId}});
				if (result) {
					return res.status(200).json({status: true, message: 'Unmarked as favourite'});
				} else {
					return res.status(403).json({status: false, message: 'Unmarked failed!'});
				}
			} else {
				const findFavouriteProgram = await favouriteProgramsModel.findOne({where: {userId: req.decoded.id, programId: req.body.programId}, raw: true});
				if (findFavouriteProgram) {
					return res.status(200).json({status: true, message: 'Marked as favourite'});
				} else {
					const dataToCreate = {
						userId: req.decoded.id,
						programId: req.body.programId,
						status: 1,
						isDeleted: 0,
						createdAt: new Date(),
						updatedAt: new Date(),
					};
					const result = await favouriteProgramsModel.create(dataToCreate);
					if (result) {
						return res.status(200).json({status: true, message: 'Marked as favourite'});
					} else {
						return res.status(403).json({status: false, message: 'Not marked as favourite!'});
					}
				}
			}
		} catch (error) {
			errorService.printError('User Service: markProgramsAsFavouriteOrUnfavourite', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to add roster ******/
	async addRoster(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const userService = new UserService();
			// Set up S3 client
			const s3Client = new S3Client({
				region: commonConfig.AWS_REGION,
				credentials: {
					accessKeyId: commonConfig.AWS_ACCESS_KEY_ID,
					secretAccessKey: commonConfig.AWS_ACCESS_KEY,
				},
			});
			const timestamp = Date.now();
			const result = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});
			const findCoachPersonalInformations = await coachPersonalInformationsModels.findOne({where: {userId: req.decoded.id}, raw: true});
			if (findCoachPersonalInformations) {
				if (!req.files || Object.keys(req.files).length === 0) {
					return res.status(403).json({status: false, message: 'Please select atleast one picture to upload!'});
				} else {
					const filename = result.id +req.body.name+'-roster-profile-'+ timestamp +'-'+ req.files.file.name;
					const fileBody = req.files.file;
					// const contentLength = Buffer.byteLength(fileBody.data);
					const key = commonConfig.AWS_PROFILE_PICTURES_FOLDER + '/' + filename;

					// Upload on s3 bucket
					const upload = await userService.uploadOnS3Bucket(key, fileBody);
					console.log('upload=======', upload);
					if (upload) {
						const profilePictureUrl = commonConfig.AWS_END_POINT + key;
						const dataToCreate = {
							coachId: req.decoded.id,
							programId: findCoachPersonalInformations.currentProgramId,
							profilePictureUrl: profilePictureUrl,
							firstName: req.body.firstName,
							lastName: req.body.lastName,
							class: req.body.class,
							position: req.body.position,
							height: req.body.height,
							openings: req.body.openings ? req.body.openings : 0,
							isOfficial: 1,
							status: 1,
							isDeleted: 0,
							createdAt: new Date(),
							updatedAt: new Date(),
						};
						const result = await rostersModel.create(dataToCreate);
						if (result) {
							if (dataToCreate?.openings > 0) {
								const activityToCreate = {
									userId: req.decoded.id,
									content: `added ${req.body.openings} openings`,
									isActivity: 1,
									status: 1,
									isDeleted: 0,
									createdAt: new Date(),
									updatedAt: new Date(),
								};
								const createNewsFeed = await newsFeedsModels.create(activityToCreate);

								console.log(activityToCreate, 'createNewsFeed======', createNewsFeed);

								const findFollowers = await followersModel.findAll({where: {userId: req.decoded.id, status: 1, isDeleted: 0}, raw: true});
								for (let i = 0; i < findFollowers.length; i++) {
									const findUser = await usersModel.findOne({where: {id: findFollowers[i].followedById}, raw: true});

									// Send Notification
									if (findUser?.fcmToken) {
										const findViewer = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});
										const fullViewerName = findViewer?.firstName +' '+ findViewer?.lastName;

										const notificationToCreate = {
											userId: findUser.id,
											title: 'Notification!',
											body: `${fullViewerName} added ${req.body.openings} openings`,
											notificationType: 'addRosterOpenings',
											data: {
												userId: `${req.decoded.id}`,
												roleId: `${findViewer.roleId}`,
												notificationType: 'addRosterOpenings',
											},
											viewStatus: 0,
											status: 1,
											isDeleted: 0,
											createdAt: new Date(),
											updatedAt: new Date(),
										};

										const createNotification = await notificationsModel.create(notificationToCreate);

										if (createNotification) {
											const message = {
												token: findUser?.fcmToken,
												notification: {
													title: notificationToCreate.title,
													body: notificationToCreate.body,
												},
												data: {
													userId: `${notificationToCreate.data.userId}`,
													roleId: `${notificationToCreate.data.roleId}`,
													notificationId: `${createNotification.id}`,
													notificationType: notificationToCreate.data.notificationType,
												},
											};

											console.log('message=======', message);

											firebaseAdmin.messaging().send(message)
												.then((response) => {
													console.log('Successfully sent message:', response);
												})
												.catch((error) => {
													console.log('Error sending message:', error);
												});
										}
									}
								}
							}

							return res.status(200).json({status: true, message: 'Roster added successfully'});
						} else {
							return res.status(403).json({status: false, message: 'Roster not added!'});
						}
					} else {
						return res.status(500).json({status: false, message: 'Something went wrong!'});
					}
				}
			} else {
				return res.status(403).json({status: false, message: 'Please first select the current program in profile data under settings!'});
			}
		} catch (error) {
			errorService.printError('User Service: addRoster', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to update roster ******/
	async updateRoster(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const userService = new UserService();
			// Set up S3 client
			const s3Client = new S3Client({
				region: commonConfig.AWS_REGION,
				credentials: {
					accessKeyId: commonConfig.AWS_ACCESS_KEY_ID,
					secretAccessKey: commonConfig.AWS_ACCESS_KEY,
				},
			});
			const timestamp = Date.now();
			const result = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});
			const findRoster = await rostersModel.findOne({where: {id: req.body.id}, raw: true});
			if (!req.files || Object.keys(req.files).length === 0) {
				const dataToUpdate = {
					// coachId: req.decoded.id,
					// programId: req.body.programId,
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					class: req.body.class,
					position: req.body.position,
					height: req.body.height,
					openings: req.body.openings,
					// isOfficial: 1,
					// status: 1,
					// isDeleted: 0,
					// createdAt: new Date(),
					updatedAt: new Date(),
				};
				const result = await rostersModel.update(dataToUpdate, {where: {id: req.body.id}});
				if (result) {
					return res.status(200).json({status: true, message: 'Roster updated successfully'});
				} else {
					return res.status(403).json({status: false, message: 'Roster not updated!'});
				}
			} else {
				const filename = result.id +findRoster?.name+'-roster-profile-'+ timestamp +'-'+ req.files.file.name;
				const fileBody = req.files.file;
				// const contentLength = Buffer.byteLength(fileBody.data);
				const key = commonConfig.AWS_PROFILE_PICTURES_FOLDER + '/' + filename;

				// Upload on s3 bucket
				const upload = await userService.uploadOnS3Bucket(key, fileBody);
				console.log('update upload=======', upload);
				if (upload) {
					const profilePictureUrl = commonConfig.AWS_END_POINT + key;
					const dataToUpdate = {
						// coachId: req.decoded.id,
						// programId: req.body.programId,
						profilePictureUrl: profilePictureUrl,
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						class: req.body.class,
						position: req.body.position,
						height: req.body.height,
						openings: req.body.openings,
						// isOfficial: 1,
						// status: 1,
						// isDeleted: 0,
						// createdAt: new Date(),
						updatedAt: new Date(),
					};
					const result = await rostersModel.update(dataToUpdate, {where: {id: req.body.id}});
					if (result) {
						return res.status(200).json({status: true, message: 'Roster updated successfully'});
					} else {
						return res.status(403).json({status: false, message: 'Roster not updated!'});
					}
				} else {
					return res.status(500).json({status: false, message: 'Something went wrong!'});
				}
			}
		} catch (error) {
			errorService.printError('User Service: updateRoster', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to delete roster ******/
	async deleteRoster(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findRoster = await rostersModel.findOne({where: {id: req.params.id}, raw: true});
			if (findRoster) {
				const dataToUpdate = {
					status: 0,
					isDeleted: 1,
					updatedAt: new Date(),
				};
				const result = await rostersModel.update(dataToUpdate, {where: {id: req.params.id}});
				if (result) {
					if (findRoster?.userId) {
						// Delete offers
						await offersModel.destroy({where: {userId: findRoster?.userId, programId: findRoster?.programId}});
					}
					return res.status(200).json({status: true, message: 'Roster deleted successfully'});
				} else {
					return res.status(403).json({status: false, message: 'Roster not deleted!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'Roster not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: deleteRoster', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get roster list ******/
	async rostersList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findcoachPersonalInformations = await coachPersonalInformationsModels.findOne({where: {userId: req.decoded.id}, raw: true});

			if (findcoachPersonalInformations) {
				const result = await rostersModel.findAll({
					where: {status: 1, isDeleted: 0, coachId: req.decoded.id, programId: findcoachPersonalInformations.currentProgramId},
					include: [
						{
							model: schoolsModel,
							as: 'programs',
							required: false,
						},
					],
				});
				if (result) {
					const resultArr = [];
					let data = {};
					for (let i = 0; i<result.length; i++) {
						if (result[i]?.userId) {
							const findPlayerData = await usersModel.findOne({
								where: {
									id: result[i].userId,
								},
								include: [
									{
										model: playerPersonalInformationsModels,
										as: 'playerPersonalInformations',
										required: false,
									},
								],
								raw: true,
							});

							const playerPersonalInformationsData = findPlayerData?.playerPersonalInformations;
							data = {
								id: result[i].id,
								coachId: req.decoded.id,
								programId: findcoachPersonalInformations.currentProgramId,
								userId: result[i].userId,
								profilePictureUrl: findPlayerData?.profilePictureUrl,
								firstName: findPlayerData?.firstName,
								lastName: findPlayerData?.lastName,
								class: playerPersonalInformationsData?.class,
								position: playerPersonalInformationsData?.position,
								height: playerPersonalInformationsData?.height,
								description: result[i]?.description,
								openings: result[i]?.openings,
								isOfficial: result[i]?.isOfficial,
								status: result[i]?.status,
								isDeleted: result[i]?.isDeleted,
								createdAt: result[i]?.createdAt,
								updatedAt: result[i]?.updatedAt,
								programs: result[i].programs,
							};
							resultArr.push(data);
						} else {
							data = result[i];
							resultArr.push(data);
						}
					}
					return res.status(200).json({status: true, message: 'Rosters list', data: resultArr});
				} else {
					return res.status(403).json({status: false, message: 'Rosters list not found!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'Please first select the current program in profile data under settings!'});
			}
		} catch (error) {
			errorService.printError('User Service: rostersList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get roster list ******/
	async rostersListByCoachId(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findcoachPersonalInformations = await coachPersonalInformationsModels.findOne({where: {userId: req.params.id}, raw: true});

			if (findcoachPersonalInformations) {
				const result = await rostersModel.findAll({
					where: {status: 1, isDeleted: 0, programId: findcoachPersonalInformations.currentProgramId},
					include: [
						{
							model: schoolsModel,
							as: 'programs',
							required: false,
						},
					],
				});
				if (result) {
					const resultArr = [];
					let data = {};
					for (let i = 0; i<result.length; i++) {
						if (result[i]?.userId) {
							const findPlayerData = await usersModel.findOne({
								where: {
									id: result[i].userId,
								},
								raw: true,
							});

							const playerPersonalInformationsData =	await playerPersonalInformationsModels.findOne({
								where: {
									userId: result[i].userId,
								},
								raw: true,
							});

							data = {
								id: result[i].id,
								coachId: parseInt(req.params.id),
								programId: parseInt(findcoachPersonalInformations.currentProgramId),
								userId: result[i].userId,
								profilePictureUrl: findPlayerData?.profilePictureUrl,
								firstName: findPlayerData?.firstName,
								lastName: findPlayerData?.lastName,
								class: playerPersonalInformationsData?.class,
								position: playerPersonalInformationsData?.position,
								height: playerPersonalInformationsData?.height,
								description: result[i]?.description,
								openings: result[i]?.openings,
								isOfficial: result[i]?.isOfficial,
								status: result[i]?.status,
								isDeleted: result[i]?.isDeleted,
								createdAt: result[i]?.createdAt,
								updatedAt: result[i]?.updatedAt,
								programs: result[i].programs,
							};
							resultArr.push(data);
						} else {
							data = result[i];
							resultArr.push(data);
						}
					}
					return res.status(200).json({status: true, message: 'Rosters list', data: resultArr});
				} else {
					return res.status(403).json({status: false, message: 'Rosters list not found!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'Please first select the current program in profile data under settings!'});
			}
		} catch (error) {
			errorService.printError('User Service: rostersListByCoachId', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get roster details by ID ******/
	async rosterDetailsById(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findcoachPersonalInformations = await coachPersonalInformationsModels.findOne({where: {userId: req.decoded.id}, raw: true});

			const result = await rostersModel.findAll({
				where: {status: 1, isDeleted: 0, id: req.params.id, coachId: req.decoded.id, programId: findcoachPersonalInformations.currentProgramId},
				include: [
					{
						model: schoolsModel,
						as: 'programs',
						required: false,
					},
				],
			});

			if (result) {
				return res.status(200).json({status: true, message: 'Roster details', data: result});
			} else {
				return res.status(403).json({status: false, message: 'Roster details not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: rosterDetailsById', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get favourite programs ******/
	async favouritePrograms(filter, offset, limit) {
		try {
			console.log('searchProgramsWithFilters======================', filter, offset, limit);
			const {count, rows} = await schoolsModel.findAndCountAll({
				// attributes: {exclude: ['phone']},
				where: filter,
				offset: offset,
				limit: limit,
				raw: true,
			});
			return {
				totalPrograms: count,
				programs: rows,
			};
		} catch (error) {
			errorService.printError('User Service: favouritePrograms', error);
			console.log('favouritePrograms error: ', error);
		}
	}

	/** ***** User Service: Method to favorite programs list ******/
	async favouriteProgramsList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const userService = new UserService();

			const findUser = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});

			const findFavouriteProgram = await favouriteProgramsModel.findAll({where: {userId: req.decoded.id, status: 1, isDeleted: 0}, raw: true});
			let totalProgramIds = [];
			if (findFavouriteProgram.length === 0) {
				totalProgramIds = [];
			} else {
				totalProgramIds = findFavouriteProgram.map((favouriteProgram) => favouriteProgram.programId);
			}

			console.log('totalProgramIds===========', totalProgramIds);

			const filter = {};
			if (findUser?.type == 'WBB') {
				filter.sportsCode = 'Women\'s Basketball',
				filter.status = 1,
				filter.isDeleted = 0,
				filter.id = {
					[Op.in]: totalProgramIds,
				};
			} else {
				filter.sportsCode = 'Men\'s Basketball',
				filter.status = 1,
				filter.isDeleted = 0,
				filter.id = {
					[Op.in]: totalProgramIds,
				};
			}

			const result = await userService.favouritePrograms(filter, req.body.offset, req.body.limit);
			if (result) {
				// Fetch likes count for each program
				const programsArr = result.programs;
				const programIds = programsArr.map((program) => program.id);
				const rosterPlayersCount = await rostersModel.findAll({
					attributes: ['programId', [sequelize.fn('COUNT', '*'), 'count']],
					where: {programId: programIds, status: 1, isDeleted: 0},
					group: ['programId'],
					raw: true,
				});

				const checkFavoritePrograms = await favouriteProgramsModel.findAll({
					where: {programId: programIds, userId: req.decoded.id},
					raw: true,
				});

				// Map likes count to the result
				const resultWithLikesCount = await Promise.all(programsArr.map( async (program) => {
					const calculateOpenings = await rostersModel.findAll({
						attributes: [
							[sequelize.fn('SUM', sequelize.col('openings')), 'total'],
						],
						where: {programId: program.id},
						raw: true,
					});

					const divisionLogo = await programTypesModels.findOne({
						where: {name: program.division},
						raw: true,
					});

					const totalOpenings = calculateOpenings[0]?.total ? calculateOpenings[0]?.total:0;
					const rosterPlayersTotalCount = rosterPlayersCount.find((item) => item.programId === program.id);
					const checkFavourite = checkFavoritePrograms?.find((item) => item?.programId === program?.id);
					return {...program,
						playersCount: rosterPlayersTotalCount ? rosterPlayersTotalCount.count : 0,
						isFavourite: checkFavourite ? true:false,
						totalOpenings: parseInt(totalOpenings),
						divisionLogo: divisionLogo ? divisionLogo?.logo:null,
						colorCode: divisionLogo ? divisionLogo?.colorCode:null,
					};
				}));

				const finalData = {
					totalPrograms: result.totalPrograms,
					programs: resultWithLikesCount,
				};

				return res.status(200).json({status: true, message: 'Favourite programs list', data: finalData});
			} else {
				return res.status(403).json({status: false, message: 'Favourite programs list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: favouriteProgramsList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get favourite coaches ******/
	async favouriteCoaches(coachFilters, offset, limit) {
		try {
			console.log('favouriteCoaches======================', coachFilters, offset, limit);
			const {count, rows} = await usersModel.findAndCountAll({
				attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
				where: coachFilters,
				include: [{
					model: coachPersonalInformationsModels,
					as: 'coachPersonalInformations',
					required: false,
					include: [{
						model: schoolsModel,
						as: 'programs',
						required: false,
					}],
				}],

				offset: offset,
				limit: limit,
				raw: true,
			});
			return {
				totalUsers: count,
				users: rows,
			};
		} catch (error) {
			errorService.printError('User Service: favouriteCoaches', error);
			console.log('favouriteCoaches error: ', error);
		}
	}

	/** ***** User Service: Method to search favourite coaches list ******/
	async favouriteCoachesList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const userService = new UserService();

			console.log('favouriteCoachesList======================', req.body);

			const findFavouriteCoaches = await favouritePlayersCoachesModels.findAll({where: {userId: req.decoded.id, status: 1, isDeleted: 0}, raw: true});
			let totalCoachIds = [];
			if (findFavouriteCoaches.length === 0) {
				totalCoachIds = [];
			} else {
				totalCoachIds = findFavouriteCoaches.map((favouriteCoaches) => favouriteCoaches.playerOrCoachId);
			}
			console.log('totalCoachIds===========', totalCoachIds);

			// Define your filters with conditional logic
			const coachFilters = {
				roleId: 3,
				status: 1,
				isDeleted: 0,
				id: {
					[Op.in]: totalCoachIds,
				},
			};

			// if(req.body.programType){
			// 	coachFilters.programType = req.body.programType
			// }

			// if(req.body.position){
			// 	coachFilters.position = req.body.position
			// }

			const result = await userService.favouriteCoaches(coachFilters, req.body.offset, req.body.limit);
			if (result) {
				// Fetch likes count
				const usersArr = result.users;
				const userIds = usersArr.map((users) => users.id);

				const checkFavoriteUsers = await favouritePlayersCoachesModels.findAll({
					where: {playerOrCoachId: userIds, userId: req.decoded.id},
					raw: true,
				});

				// Map likes count to the result
				const resultWithLikesCount = await Promise.all(usersArr.map(async (user) => {
					const divisionLogo = await programTypesModels.findOne({
						where: {name: user['coachPersonalInformations.programs.division']},
						raw: true,
					});

					const checkFavourite = checkFavoriteUsers?.find((item) => item?.playerOrCoachId === user?.id);
					return {...user,
						isFavourite: checkFavourite ? true:false,
						divisionLogo: divisionLogo ? divisionLogo?.logo:null,
						colorCode: divisionLogo ? divisionLogo?.colorCode:null,
					};
				}));

				const finalData = {
					totalUsers: result.totalUsers,
					users: resultWithLikesCount,
				};

				return res.status(200).json({status: true, message: 'Favourite coaches list', data: finalData});
			} else {
				return res.status(403).json({status: false, message: 'Favourite coaches list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: favouriteCoachesList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get favourite players ******/
	async favouritePlayers(playerFilters, offset, limit) {
		try {
			console.log('favouritePlayers======================', playerFilters, offset, limit);
			const {count, rows} = await usersModel.findAndCountAll({
				attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
				where: playerFilters,
				include: [{
					model: playerPersonalInformationsModels,
					as: 'playerPersonalInformations',
					required: false,
				}],
				offset: offset,
				limit: limit,
				raw: true,
			});
			return {
				totalUsers: count,
				users: rows,
			};
		} catch (error) {
			errorService.printError('User Service: favouritePlayers', error);
			console.log('favouritePlayers error: ', error);
		}
	}

	/** ***** User Service: Method to get favourite players list ******/
	async favouritePlayersList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const userService = new UserService();

			console.log('favouritePlayersList======================', req.body);

			const findFavouritePlayers = await favouritePlayersCoachesModels.findAll({where: {userId: req.decoded.id, status: 1, isDeleted: 0}, raw: true});
			let totalPlayerIds = [];
			if (findFavouritePlayers.length === 0) {
				totalPlayerIds = [];
			} else {
				totalPlayerIds = findFavouritePlayers.map((favouriteCoaches) => favouriteCoaches.playerOrCoachId);
			}
			console.log('totalPlayerIds===========', totalPlayerIds);

			// Define your filters with conditional logic
			const playerFilters = {
				roleId: 4,
				status: 1,
				isDeleted: 0,
				id: {
					[Op.in]: totalPlayerIds,
				},
			};

			if (req.body.class) {
				playerFilters.class = req.body.class;
			}

			if (req.body.position) {
				playerFilters.position = req.body.position;
			}

			const result = await userService.favouritePlayers(playerFilters, req.body.offset, req.body.limit);
			if (result) {
				// Fetch likes count
				const usersArr = result.users;
				const userIds = usersArr.map((users) => users.id);

				const checkFavoriteUsers = await favouritePlayersCoachesModels.findAll({
					where: {playerOrCoachId: userIds, userId: req.decoded.id},
					raw: true,
				});

				// Map likes count to the result
				const resultWithLikesCount = usersArr.map((user) => {
					const checkFavourite = checkFavoriteUsers?.find((item) => item?.playerOrCoachId === user?.id);
					return {...user,
						isFavourite: checkFavourite ? true:false,
					};
				});

				const finalData = {
					totalUsers: result.totalUsers,
					users: resultWithLikesCount,
				};

				return res.status(200).json({status: true, message: 'Favourite players list', data: finalData});
			} else {
				return res.status(403).json({status: false, message: 'Favourite players list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: favouritePlayersList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to offer players ******/
	async offerPlayers(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findcoachPersonalInformations = await coachPersonalInformationsModels.findOne({where: {userId: req.decoded.id}, raw: true});

			if (findcoachPersonalInformations) {
				const findOffer = await offersModel.findOne({where: {userId: req.body.userId, programId: findcoachPersonalInformations.currentProgramId}, raw: true});
				if (findOffer) {
					return res.status(403).json({status: false, message: 'Already invited or requested!'});
				} else {
					const dataToCreate = {
						coachId: req.decoded.id,
						userId: req.body.userId,
						programId: findcoachPersonalInformations.currentProgramId,
						requestStatus: 'Offered',
						requestedById: req.decoded.id,
						status: 1,
						isDeleted: 0,
						createdAt: new Date(),
						updatedAt: new Date(),
					};
					const result = await offersModel.create(dataToCreate);
					if (result) {
						const findUniversity = await schoolsModel.findOne({where: {id: findcoachPersonalInformations.currentProgramId}, raw: true});
						const schoolName = findUniversity?.name;
						const activityToCreate = {
							userId: req.body.userId,
							content: `has been offered by ${schoolName}`,
							isActivity: 1,
							status: 1,
							isDeleted: 0,
							createdAt: new Date(),
							updatedAt: new Date(),
						};
						await newsFeedsModels.create(activityToCreate);

						const findUser = await usersModel.findOne({where: {id: req.body.userId}, raw: true});
						const fullName = findUser?.firstName +' '+ findUser?.lastName;
						const coachActivityToCreate = {
							userId: req.decoded.id,
							content: `offered player section to ${fullName}`,
							isActivity: 1,
							status: 1,
							isDeleted: 0,
							createdAt: new Date(),
							updatedAt: new Date(),
						};
						await newsFeedsModels.create(coachActivityToCreate);

						// Send Notification
						if (findUser?.fcmToken) {
							const findViewer = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});
							const fullViewerName = findViewer?.firstName +' '+ findViewer?.lastName;

							const notificationToCreate = {
								userId: findUser.id,
								title: 'Notification!',
								body: `${fullViewerName} has offered you a section`,
								notificationType: 'offerPlayers',
								data: {
									offerId: `${result.id}`,
									userId: `${req.decoded.id}`,
									roleId: `${findViewer.roleId}`,
									notificationType: 'offerPlayers',
								},
								viewStatus: 0,
								status: 1,
								isDeleted: 0,
								createdAt: new Date(),
								updatedAt: new Date(),
							};

							const createNotification = await notificationsModel.create(notificationToCreate);

							if (createNotification) {
								const message = {
									token: findUser?.fcmToken,
									notification: {
										title: notificationToCreate.title,
										body: notificationToCreate.body,
									},
									data: {
										offerId: `${notificationToCreate.data.offerId}`,
										userId: `${notificationToCreate.data.userId}`,
										roleId: `${notificationToCreate.data.roleId}`,
										notificationId: `${createNotification.id}`,
										notificationType: notificationToCreate.data.notificationType,
									},
								};

								firebaseAdmin.messaging().send(message)
									.then((response) => {
										console.log('Successfully sent message:', response);
									})
									.catch((error) => {
										console.log('Error sending message:', error);
									});
							}
						}

						return res.status(200).json({status: true, message: `Congratulation you have made offer to the ${fullName}`});
					} else {
						return res.status(403).json({status: false, message: 'Player not invited!'});
					}
				}
			} else {
				return res.status(403).json({status: false, message: 'Please first select the current program in profile data under settings!'});
			}
		} catch (error) {
			errorService.printError('User Service: offerPlayers', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get all offered players list ******/
	async allOfferedPlayersList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requesplayerPersonalInformationsts.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findcoachPersonalInformations = await coachPersonalInformationsModels.findOne({where: {userId: req.decoded.id}, raw: true});

			if (findcoachPersonalInformations) {
				const result = await offersModel.findAll({
					where: {
						requestedById: req.decoded.id,
						programId: findcoachPersonalInformations.currentProgramId,
						requestStatus: 'Offered',
					},
					include: [{
						model: usersModel,
						as: 'users',
						required: true,
						attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
					},
					{
						model: playerPersonalInformationsModels,
						as: 'playerPersonalInformations',
						required: false,
					},
					{
						model: playerStatsModels,
						as: 'playerStats',
						required: false,
					}],
					raw: true});
				if (result) {
					return res.status(200).json({status: true, message: 'All offered players list', data: result});
				} else {
					return res.status(403).json({status: false, message: 'All offered players list not found!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'Please first select the current program in profile data under settings!'});
			}
		} catch (error) {
			errorService.printError('User Service: allOfferedPlayersList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get all offered players list ******/
	async allOfferedPlayersListById(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requesplayerPersonalInformationsts.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findcoachPersonalInformations = await coachPersonalInformationsModels.findOne({where: {userId: req.params.coachId}, raw: true});

			if (findcoachPersonalInformations) {
				const result = await offersModel.findAll({
					where: {
						requestedById: req.params.coachId,
						programId: findcoachPersonalInformations.currentProgramId,
						requestStatus: 'Offered',
					},
					include: [{
						model: usersModel,
						as: 'users',
						required: true,
						attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
					},
					{
						model: playerPersonalInformationsModels,
						as: 'playerPersonalInformations',
						required: false,
					},
					{
						model: playerStatsModels,
						as: 'playerStats',
						required: false,
					}],
					raw: true});
				if (result) {
					return res.status(200).json({status: true, message: 'All offered players list', data: result});
				} else {
					return res.status(403).json({status: false, message: 'All offered players list not found!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'This coach does not have any active program!'});
			}
		} catch (error) {
			errorService.printError('User Service: allOfferedPlayersListById', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get offered players list ******/
	async offeredPlayersList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findcoachPersonalInformations = await coachPersonalInformationsModels.findOne({where: {userId: req.decoded.id}, raw: true});

			if (findcoachPersonalInformations) {
				const result = await offersModel.findAll({
					where: {
						requestedById: req.decoded.id,
						programId: findcoachPersonalInformations.currentProgramId,
						requestStatus: 'Offered',
						createdAt: {
							[Op.between]: [
								`${req.body.date}T00:00:00.000Z`,
								`${req.body.date}T23:59:59.999Z`,
							],
						},
					},
					include: [{
						model: usersModel,
						as: 'users',
						required: true,
						attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
					},
					{
						model: playerPersonalInformationsModels,
						as: 'playerPersonalInformations',
						required: false,
					},
					{
						model: playerStatsModels,
						as: 'playerStats',
						required: false,
					}],
					raw: true});
				if (result) {
					return res.status(200).json({status: true, message: 'Offered players list', data: result});
				} else {
					return res.status(403).json({status: false, message: 'Offered players list not found!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'Please first select the current program in profile data under settings!'});
			}
		} catch (error) {
			errorService.printError('User Service: offeredPlayersList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get players rosters request list ******/
	async playersRosterRequestList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findcoachPersonalInformations = await coachPersonalInformationsModels.findOne({where: {userId: req.decoded.id}, raw: true});

			if (findcoachPersonalInformations) {
				const result = await offersModel.findAll({
					where: {
						coachId: req.decoded.id,
						programId: findcoachPersonalInformations.currentProgramId,
						requestStatus: 'Requested',
						createdAt: {
							[Op.between]: [
								`${req.body.date}T00:00:00.000Z`,
								`${req.body.date}T23:59:59.999Z`,
							],
						},
					},
					include: [{
						model: usersModel,
						as: 'users',
						required: true,
						attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
					},
					{
						model: playerPersonalInformationsModels,
						as: 'playerPersonalInformations',
						required: false,
					},
					{
						model: playerStatsModels,
						as: 'playerStats',
						required: false,
					}],
					raw: true});
				if (result) {
					return res.status(200).json({status: true, message: 'Players roster request list', data: result});
				} else {
					return res.status(403).json({status: false, message: 'Players roster request list not found!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'Please first select the current program in profile data under settings!'});
			}
		} catch (error) {
			errorService.printError('User Service: playersRosterRequestList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get committed players list ******/
	async committedPlayersList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findcoachPersonalInformations = await coachPersonalInformationsModels.findOne({where: {userId: req.decoded.id}, raw: true});

			if (findcoachPersonalInformations) {
				const result = await offersModel.findAll({
					where: {
						coachId: req.decoded.id,
						programId: findcoachPersonalInformations.currentProgramId,
						requestStatus: 'Committed',
						// createdAt: {
						// 	[Op.between]: [
						// 	`${req.body.date}T00:00:00.000Z`,
						// 	`${req.body.date}T23:59:59.999Z`,
						// 	],
						// },
					},
					include: [{
						model: usersModel,
						as: 'users',
						required: true,
						attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
					},
					{
						model: playerPersonalInformationsModels,
						as: 'playerPersonalInformations',
						required: false,
					},
					{
						model: playerStatsModels,
						as: 'playerStats',
						required: false,
					}],
					raw: true});
				if (result) {
					return res.status(200).json({status: true, message: 'Committed players list', data: result});
				} else {
					return res.status(403).json({status: false, message: 'Committed players list not found!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'Please first select the current program in profile data under settings!'});
			}
		} catch (error) {
			errorService.printError('User Service: committedPlayersList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get committed players list by id ******/
	async committedPlayersListById(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findcoachPersonalInformations = await coachPersonalInformationsModels.findOne({where: {userId: req.params.coachId}, raw: true});

			if (findcoachPersonalInformations) {
				const result = await offersModel.findAll({
					where: {
						coachId: req.params.coachId,
						programId: findcoachPersonalInformations.currentProgramId,
						requestStatus: 'Committed',
						// createdAt: {
						// 	[Op.between]: [
						// 	`${req.body.date}T00:00:00.000Z`,
						// 	`${req.body.date}T23:59:59.999Z`,
						// 	],
						// },
					},
					include: [{
						model: usersModel,
						as: 'users',
						required: true,
						attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
					},
					{
						model: playerPersonalInformationsModels,
						as: 'playerPersonalInformations',
						required: false,
					},
					{
						model: playerStatsModels,
						as: 'playerStats',
						required: false,
					}],
					raw: true});
				if (result) {
					return res.status(200).json({status: true, message: 'Committed players list', data: result});
				} else {
					return res.status(403).json({status: false, message: 'Committed players list not found!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'Please first select the current program in profile data under settings!'});
			}
		} catch (error) {
			errorService.printError('User Service: committedPlayersListById', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to cancel offered players ******/
	async cancelOfferedPlayers(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findcoachPersonalInformations = await coachPersonalInformationsModels.findOne({where: {userId: req.decoded.id}, raw: true});

			if (findcoachPersonalInformations) {
				const findOffer = await offersModel.findOne({where: {userId: req.params.userId, programId: findcoachPersonalInformations.currentProgramId, requestStatus: 'Offered'}, raw: true});
				if (findOffer) {
					// const dataToUpdate = {
					// 	requestStatus: 'Cancelled',
					// 	updatedAt: new Date(),
					// };
					// const result = await offersModel.update(dataToUpdate, {where: {id: req.params.id}});
					const result = await offersModel.destroy({where: {id: findOffer.id}});
					if (result) {
						return res.status(200).json({status: true, message: 'Invite revoked successfully'});
					} else {
						return res.status(403).json({status: false, message: 'Invite not revoked!'});
					}
				} else {
					return res.status(403).json({status: false, message: 'Offer not found!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'Please first select the current program in profile data under settings!'});
			}
		} catch (error) {
			errorService.printError('User Service: cancelOfferedPlayers', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to accept players roster request ******/
	async acceptOrDeclinePlayersRosterRequest(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findcoachPersonalInformations = await coachPersonalInformationsModels.findOne({where: {userId: req.decoded.id}, raw: true});

			if (findcoachPersonalInformations) {
				const findOffer = await offersModel.findOne({where: {id: req.body.id, coachId: req.decoded.id, programId: findcoachPersonalInformations.currentProgramId}, raw: true});
				if (findOffer) {
					if (req.body.requestStatus == 'Committed') {
						const dataToUpdate = {
							requestStatus: 'Committed',
							updatedAt: new Date(),
						};
						const result = await offersModel.update(dataToUpdate, {where: {id: req.body.id}});
						if (result) {
							const dataToCreate = {
								coachId: req.decoded.id,
								programId: findcoachPersonalInformations.currentProgramId,
								userId: findOffer.userId,
								// profilePictureUrl: profilePictureUrl,
								// firstName: req.body.firstName,
								// lastName: req.body.lastName,
								// class: req.body.class,
								// position: req.body.position,
								// height: req.body.height,
								// openings: req.body.openings,
								isOfficial: 0,
								status: 1,
								isDeleted: 0,
								createdAt: new Date(),
								updatedAt: new Date(),
							};
							const createRoster = await rostersModel.create(dataToCreate);

							const findUser = await usersModel.findOne({where: {id: findOffer.userId}, raw: true});
							// Send Notification
							if (findUser?.fcmToken) {
								const findViewer = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});
								const fullViewerName = findViewer?.firstName +' '+ findViewer?.lastName;

								const notificationToCreate = {
									userId: findUser.id,
									title: 'Notification!',
									body: `${fullViewerName} has accepted your roster request`,
									notificationType: 'acceptOrDeclinePlayersRosterRequest',
									data: {
										offerId: `${findOffer.id}`,
										userId: `${req.decoded.id}`,
										roleId: `${findViewer.roleId}`,
										notificationType: 'acceptOrDeclinePlayersRosterRequest',
									},
									viewStatus: 0,
									status: 1,
									isDeleted: 0,
									createdAt: new Date(),
									updatedAt: new Date(),
								};

								const createNotification = await notificationsModel.create(notificationToCreate);

								if (createNotification) {
									const message = {
										token: findUser?.fcmToken,
										notification: {
											title: notificationToCreate.title,
											body: notificationToCreate.body,
										},
										data: {
											offerId: `${notificationToCreate.data.offerId}`,
											userId: `${notificationToCreate.data.userId}`,
											roleId: `${notificationToCreate.data.roleId}`,
											notificationId: `${createNotification.id}`,
											notificationType: notificationToCreate.data.notificationType,
										},
									};

									firebaseAdmin.messaging().send(message)
										.then((response) => {
											console.log('Successfully sent message:', response);
										})
										.catch((error) => {
											console.log('Error sending message:', error);
										});
								}
							}

							return res.status(200).json({status: true, message: 'Request accepted successfully'});
						} else {
							return res.status(403).json({status: false, message: 'Request not accepted!'});
						}
					} else {
						// const dataToUpdate = {
						// 	requestStatus: 'Declined',
						// 	updatedAt: new Date(),
						// };
						// const result = await offersModel.update(dataToUpdate, {where: {id: req.params.id}});

						const result = await offersModel.destroy({where: {id: req.params.id}});
						if (result) {
							return res.status(200).json({status: true, message: 'Request declined successfully'});
						} else {
							return res.status(403).json({status: false, message: 'Request not declined!'});
						}
					}
				} else {
					return res.status(403).json({status: false, message: 'Offer not found!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'Please first select the current program in profile data under settings!'});
			}
		} catch (error) {
			errorService.printError('User Service: acceptPlayersRosterRequest', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to roster request to coach ******/
	async rosterRequestToCoach(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findcoachPersonalInformations = await coachPersonalInformationsModels.findOne({where: {userId: req.body.coachId}, raw: true});

			if (findcoachPersonalInformations) {
				const findOffer = await offersModel.findOne({where: {userId: req.decoded.id, coachId: req.body.coachId, programId: findcoachPersonalInformations.currentProgramId}, raw: true});
				if (findOffer) {
					return res.status(403).json({status: false, message: 'Already invited or requested!'});
				} else {
					const dataToCreate = {
						coachId: req.body.coachId,
						userId: req.decoded.id,
						programId: findcoachPersonalInformations.currentProgramId,
						requestStatus: 'Requested',
						requestedById: req.decoded.id,
						status: 1,
						isDeleted: 0,
						createdAt: new Date(),
						updatedAt: new Date(),
					};
					const result = await offersModel.create(dataToCreate);
					if (result) {
						const findUser = await usersModel.findOne({where: {id: req.body.coachId}, raw: true});
						// Send Notification
						if (findUser?.fcmToken) {
							const findViewer = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});
							const fullViewerName = findViewer?.firstName +' '+ findViewer?.lastName;

							const notificationToCreate = {
								userId: findUser.id,
								title: 'Notification!',
								body: `${fullViewerName} sent a roster request`,
								notificationType: 'rosterRequestToCoach',
								data: {
									userId: `${req.decoded.id}`,
									roleId: `${findViewer.roleId}`,
									notificationType: 'rosterRequestToCoach',
								},
								viewStatus: 0,
								status: 1,
								isDeleted: 0,
								createdAt: new Date(),
								updatedAt: new Date(),
							};

							const createNotification = await notificationsModel.create(notificationToCreate);

							if (createNotification) {
								const message = {
									token: findUser?.fcmToken,
									notification: {
										title: notificationToCreate.title,
										body: notificationToCreate.body,
									},
									data: {
										userId: `${notificationToCreate.data.userId}`,
										roleId: `${notificationToCreate.data.roleId}`,
										notificationId: `${createNotification.id}`,
										notificationType: notificationToCreate.data.notificationType,
									},
								};

								firebaseAdmin.messaging().send(message)
									.then((response) => {
										console.log('Successfully sent message:', response);
									})
									.catch((error) => {
										console.log('Error sending message:', error);
									});
							}
						}

						return res.status(200).json({status: true, message: 'Request sent successfully'});
					} else {
						return res.status(403).json({status: false, message: 'Request not sent!'});
					}
				}
			} else {
				return res.status(403).json({status: false, message: 'This coach does not have any active program!'});
			}
		} catch (error) {
			errorService.printError('User Service: rosterRequestToCoach', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get all received offers list ******/
	async allReceivedOffersList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await offersModel.findAll({
				where: {
					userId: req.decoded.id,
					requestStatus: 'Offered',
				},
				include: [{
					model: usersModel,
					as: 'coaches',
					required: true,
					attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
				},
				{
					model: coachPersonalInformationsModels,
					as: 'coachPersonalInformations',
					required: false,
					include: [{
						model: schoolsModel,
						as: 'programs',
						required: false,
					}],
				}],
				raw: true});
			if (result) {
				const finalResult = await Promise.all(result.map(async (user) => {
					const divisionLogo = await programTypesModels.findOne({
						where: {name: user['coachPersonalInformations.programs.division']},
						raw: true,
					});

					return {...user,
						divisionLogo: divisionLogo ? divisionLogo?.logo:null,
						colorCode: divisionLogo ? divisionLogo?.colorCode:null,
					};
				}));

				return res.status(200).json({status: true, message: 'Received offers list', data: finalResult});
			} else {
				return res.status(403).json({status: false, message: 'Received offers list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: allReceivedOffersList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get all received offers list ******/
	async receivedOffersList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await offersModel.findAll({
				where: {
					userId: req.decoded.id,
					requestStatus: 'Offered',
					createdAt: {
						[Op.between]: [
							`${req.body.date}T00:00:00.000Z`,
							`${req.body.date}T23:59:59.999Z`,
						],
					},
				},
				include: [{
					model: usersModel,
					as: 'coaches',
					required: true,
					attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
				},
				{
					model: coachPersonalInformationsModels,
					as: 'coachPersonalInformations',
					required: false,
					include: [{
						model: schoolsModel,
						as: 'programs',
						required: false,
					}],
				}],
				raw: true});
			if (result) {
				const finalResult = await Promise.all(result.map(async (user) => {
					const divisionLogo = await programTypesModels.findOne({
						where: {name: user['coachPersonalInformations.programs.division']},
						raw: true,
					});

					return {...user,
						divisionLogo: divisionLogo ? divisionLogo?.logo:null,
						colorCode: divisionLogo ? divisionLogo?.colorCode:null,
					};
				}));

				return res.status(200).json({status: true, message: 'Received offers list', data: finalResult});
			} else {
				return res.status(403).json({status: false, message: 'Received offers list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: receivedOffersList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get all roster request list by id ******/
	async allReceivedOffersListByID(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await offersModel.findAll({
				where: {
					userId: req.params.userId,
					// requestStatus: 'Offered',
				},
				include: [{
					model: usersModel,
					as: 'coaches',
					required: true,
					attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
				},
				{
					model: coachPersonalInformationsModels,
					as: 'coachPersonalInformations',
					required: false,
					include: [{
						model: schoolsModel,
						as: 'programs',
						required: false,
					}],
				}],
				raw: true});
			if (result) {
				const finalResult = await Promise.all(result.map(async (user) => {
					const divisionLogo = await programTypesModels.findOne({
						where: {name: user['coachPersonalInformations.programs.division']},
						raw: true,
					});

					return {...user,
						divisionLogo: divisionLogo ? divisionLogo?.logo:null,
						colorCode: divisionLogo ? divisionLogo?.colorCode:null,
					};
				}));
				return res.status(200).json({status: true, message: 'Received offers list', data: finalResult});
			} else {
				return res.status(403).json({status: false, message: 'Received offers list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: allReceivedOffersListByID', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get roster request list ******/
	async rosterRequestList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await offersModel.findAll({
				where: {
					requestedById: req.decoded.id,
					requestStatus: 'Requested',
					createdAt: {
						[Op.between]: [
							`${req.body.date}T00:00:00.000Z`,
							`${req.body.date}T23:59:59.999Z`,
						],
					},
				},
				include: [{
					model: usersModel,
					as: 'coaches',
					required: true,
					attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
				},
				{
					model: coachPersonalInformationsModels,
					as: 'coachPersonalInformations',
					required: false,
					include: [{
						model: schoolsModel,
						as: 'programs',
						required: false,
					}],
				}],
				raw: true});
			if (result) {
				const finalResult = await Promise.all(result.map(async (user) => {
					const divisionLogo = await programTypesModels.findOne({
						where: {name: user['coachPersonalInformations.programs.division']},
						raw: true,
					});

					return {...user,
						divisionLogo: divisionLogo ? divisionLogo?.logo:null,
						colorCode: divisionLogo ? divisionLogo?.colorCode:null,
					};
				}));
				return res.status(200).json({status: true, message: 'Roster request list', data: finalResult});
			} else {
				return res.status(403).json({status: false, message: 'Roster request list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: offeredPlayersList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get roster request list ******/
	async committedRosterRequestList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await offersModel.findAll({
				where: {
					requestedById: req.decoded.id,
					requestStatus: 'Committed',
				},
				include: [{
					model: usersModel,
					as: 'coaches',
					required: true,
					attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
				},
				{
					model: coachPersonalInformationsModels,
					as: 'coachPersonalInformations',
					required: false,
					include: [{
						model: schoolsModel,
						as: 'programs',
						required: false,
					}],
				}],
				raw: true});
			if (result) {
				const finalResult = await Promise.all(result.map(async (user) => {
					const divisionLogo = await programTypesModels.findOne({
						where: {name: user['coachPersonalInformations.programs.division']},
						raw: true,
					});

					return {...user,
						divisionLogo: divisionLogo ? divisionLogo?.logo:null,
						colorCode: divisionLogo ? divisionLogo?.colorCode:null,
					};
				}));
				return res.status(200).json({status: true, message: 'Committed roster request list', data: finalResult});
			} else {
				return res.status(403).json({status: false, message: 'Committed roster request list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: committedRosterRequestList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to cancel roster request ******/
	async cancelRosterRequest(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findCoachPersonalInformations = await coachPersonalInformationsModels.findOne({where: {userId: req.params.userId}, raw: true});

			if (findCoachPersonalInformations?.currentProgramId) {
				const findOffer = await offersModel.findOne({where: {userId: req.decoded.id, requestedById: req.decoded.id, programId: findCoachPersonalInformations?.currentProgramId, requestStatus: 'Requested'}, raw: true});
				if (findOffer) {
					// const dataToUpdate = {
					// 	requestStatus: 'Cancelled',
					// 	updatedAt: new Date(),
					// };
					// const result = await offersModel.destroy(dataToUpdate, {where: {id: req.params.id}});

					const result = await offersModel.destroy({where: {id: findOffer?.id}});
					if (result) {
						return res.status(200).json({status: true, message: 'Request revoked successfully'});
					} else {
						return res.status(403).json({status: false, message: 'Request not revoked!'});
					}
				} else {
					return res.status(403).json({status: false, message: 'Request not found!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'Request not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: cancelRosterRequest', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to accept or decline roster request ******/
	async acceptOrDeclineOffers(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findOffer = await offersModel.findOne({where: {id: req.body.id, userId: req.decoded.id}, raw: true});
			if (findOffer) {
				if (req.body.requestStatus == 'Committed') {
					const dataToUpdate = {
						requestStatus: 'Committed',
						updatedAt: new Date(),
					};
					const result = await offersModel.update(dataToUpdate, {where: {id: req.body.id}});
					if (result) {
						const findUniversity = await schoolsModel.findOne({where: {id: findOffer.programId}, raw: true});
						const schoolName = findUniversity?.name;
						const activityToCreate = {
							userId: req.decoded.id,
							content: `is committed to the ${schoolName}`,
							isActivity: 1,
							status: 1,
							isDeleted: 0,
							createdAt: new Date(),
							updatedAt: new Date(),
						};
						await newsFeedsModels.create(activityToCreate);

						const dataToCreate = {
							coachId: findOffer.coachId,
							programId: findOffer.programId,
							userId: req.decoded.id,
							// profilePictureUrl: profilePictureUrl,
							// firstName: req.body.firstName,
							// lastName: req.body.lastName,
							// position: req.body.position,
							// height: req.body.height,
							// openings: req.body.openings,
							isOfficial: 0,
							status: 1,
							isDeleted: 0,
							createdAt: new Date(),
							updatedAt: new Date(),
						};
						const createRoster = await rostersModel.create(dataToCreate);

						const findUser = await usersModel.findOne({where: {id: findOffer.coachId}, raw: true});
						// Send Notification
						if (findUser?.fcmToken) {
							const findViewer = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});
							const fullViewerName = findViewer?.firstName +' '+ findViewer?.lastName;

							const notificationToCreate = {
								userId: findUser.id,
								title: 'Notification!',
								body: `${fullViewerName} has committed to your offer`,
								notificationType: 'acceptOrDeclineOffers',
								data: {
									offerId: `${findOffer.id}`,
									userId: `${req.decoded.id}`,
									roleId: `${findViewer.roleId}`,
									notificationType: 'acceptOrDeclineOffers',
								},
								viewStatus: 0,
								status: 1,
								isDeleted: 0,
								createdAt: new Date(),
								updatedAt: new Date(),
							};

							const createNotification = await notificationsModel.create(notificationToCreate);

							if (createNotification) {
								const message = {
									token: findUser?.fcmToken,
									notification: {
										title: notificationToCreate.title,
										body: notificationToCreate.body,
									},
									data: {
										offerId: `${notificationToCreate.data.offerId}`,
										userId: `${notificationToCreate.data.userId}`,
										roleId: `${notificationToCreate.data.roleId}`,
										notificationId: `${createNotification.id}`,
										notificationType: notificationToCreate.data.notificationType,
									},
								};

								firebaseAdmin.messaging().send(message)
									.then((response) => {
										console.log('Successfully sent message:', response);
									})
									.catch((error) => {
										console.log('Error sending message:', error);
									});
							}
						}

						return res.status(200).json({status: true, message: 'Offer accepted successfully'});
					} else {
						return res.status(403).json({status: false, message: 'Offer not accepted!'});
					}
				} else {
					// const dataToUpdate = {
					// 	requestStatus: 'Declined',
					// 	updatedAt: new Date(),
					// };
					// const result = await offersModel.update(dataToUpdate, {where: {id: req.params.id}});

					const result = await offersModel.destroy({where: {id: req.body.id}});
					if (result) {
						return res.status(200).json({status: true, message: 'Offer declined successfully'});
					} else {
						return res.status(403).json({status: false, message: 'Offer not declined!'});
					}
				}
			} else {
				return res.status(403).json({status: false, message: 'Request not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: acceptOrDeclineOffers', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to follow users ******/
	async followUsers(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findFollowingRequested = await followersModel.findOne({where: {userId: req.body.userId, followedById: req.decoded.id}, raw: true});
			const findFollowingReceived = await followersModel.findOne({where: {userId: req.decoded.id, followedById: req.decoded.id}, raw: true});

			if (findFollowingRequested) {
				return res.status(403).json({status: false, message: 'Already following this user!'});
			}

			// else if (findFollowingReceived) {
			// 	const dataToUpdate = {
			// 		followStatus: 'Accepted',
			// 	};
			// 	const result = await followersModel.update(dataToUpdate, {where: {id: findFollowingReceived.id}});
			// 	if (result) {
			// 		return res.status(200).json({status: true, message: 'User followed successfully'});
			// 	} else {
			// 		return res.status(403).json({status: false, message: 'User not followed!'});
			// 	}
			// }

			else {
				const dataToCreate = {
					userId: req.body.userId,
					followedById: req.decoded.id,
					followStatus: 'Pending',
					status: 1,
					isDeleted: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				const result = await followersModel.create(dataToCreate);
				if (result) {
					const findUser = await usersModel.findOne({where: {id: req.body.userId}, raw: true});
					const fullName = findUser?.firstName +' '+ findUser?.lastName;
					const activityToCreate = {
						userId: req.decoded.id,
						content: `is following ${fullName}`,
						isActivity: 1,
						status: 1,
						isDeleted: 0,
						createdAt: new Date(),
						updatedAt: new Date(),
					};
					await newsFeedsModels.create(activityToCreate);

					// Send Notification
					if (findUser?.fcmToken) {
						const findViewer = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});
						const fullViewerName = findViewer?.firstName +' '+ findViewer?.lastName;

						const notificationToCreate = {
							userId: findUser.id,
							title: 'Notification!',
							body: `${fullViewerName} started following you`,
							notificationType: 'followUsers',
							data: {
								userId: `${req.decoded.id}`,
								roleId: `${findViewer.roleId}`,
								notificationType: 'followUsers',
							},
							viewStatus: 0,
							status: 1,
							isDeleted: 0,
							createdAt: new Date(),
							updatedAt: new Date(),
						};

						const createNotification = await notificationsModel.create(notificationToCreate);

						if (createNotification) {
							const message = {
								token: findUser?.fcmToken,
								notification: {
									title: notificationToCreate.title,
									body: notificationToCreate.body,
								},
								data: {
									userId: `${notificationToCreate.data.userId}`,
									roleId: `${notificationToCreate.data.roleId}`,
									notificationId: `${createNotification.id}`,
									notificationType: notificationToCreate.data.notificationType,
								},
							};

							firebaseAdmin.messaging().send(message)
								.then((response) => {
									console.log('Successfully sent message:', response);
								})
								.catch((error) => {
									console.log('Error sending message:', error);
								});
						}
					}

					return res.status(200).json({status: true, message: 'User followed successfully'});
				} else {
					return res.status(403).json({status: false, message: 'User not followed!'});
				}
			}
		} catch (error) {
			errorService.printError('User Service: followUsers', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get player details ******/
	async playersDetails(playerFilters, offset, limit) {
		try {
			console.log('playersDetails======================', playerFilters, offset, limit);
			const {count, rows} = await usersModel.findAndCountAll({
				attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
				where: playerFilters,
				include: [{
					model: playerPersonalInformationsModels,
					as: 'playerPersonalInformations',
					required: false,
				}],
				offset: offset,
				limit: limit,
				raw: true,
			});
			return {
				totalUsers: count,
				users: rows,
			};
		} catch (error) {
			errorService.printError('User Service: playersDetails', error);
			console.log('playersDetails error: ', error);
		}
	}

	/** ***** User Service: Method to get favourite coaches ******/
	async coachDetails(coachFilters, offset, limit) {
		try {
			console.log('coachDetails======================', coachFilters, offset, limit);
			const {count, rows} = await usersModel.findAndCountAll({
				attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
				where: coachFilters,
				include: [{
					model: coachPersonalInformationsModels,
					as: 'coachPersonalInformations',
					required: false,
					include: [{
						model: schoolsModel,
						as: 'programs',
						required: false,
					}],
				}],

				offset: offset,
				limit: limit,
				raw: true,
			});
			return {
				totalUsers: count,
				users: rows,
			};
		} catch (error) {
			errorService.printError('User Service: favouriteCoaches', error);
			console.log('favouriteCoaches error: ', error);
		}
	}

	/** ***** User Service: Method to follows list by id ******/
	async followersListById(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');
			const userService = new UserService();

			const checkUser = await usersModel.findOne({where: {id: req.body.id}, raw: true});

			if (checkUser.roleId == 3) {
				console.log('coach followers===============');

				const findFollowers = await followersModel.findAll({where: {userId: req.body.id, status: 1, isDeleted: 0}, raw: true});
				let totalPlayerIds = [];
				if (findFollowers.length === 0) {
					totalPlayerIds = [];
				} else {
					totalPlayerIds = findFollowers.map((followers) => followers.followedById);
				}
				console.log('totalPlayerIds===========', totalPlayerIds);

				// Define your filters with conditional logic
				const playerFilters = {
					roleId: 4,
					status: 1,
					isDeleted: 0,
					id: {
						[Op.in]: totalPlayerIds,
					},
				};

				if (req.body.firstName) {
					playerFilters.firstname = {
						[Op.like]: `%${req.body.firstName}%`,
					};
				}

				if (req.body.lastName) {
					playerFilters.lastName = {
						[Op.like]: `%${req.body.lastName}%`,
					};
				}

				const result = await userService.playersDetails(playerFilters, req.body.offset, req.body.limit);
				if (result) {
					// Fetch likes count
					const usersArr = result.users;
					const userIds = usersArr.map((users) => users.id);

					const checkFavoriteUsers = await favouritePlayersCoachesModels.findAll({
						where: {playerOrCoachId: userIds, userId: req.body.id},
						raw: true,
					});

					// Map likes count to the result
					const resultWithLikesCount = usersArr.map((user) => {
						const checkFavourite = checkFavoriteUsers?.find((item) => item?.playerOrCoachId === user?.id);
						return {...user,
							isFavourite: checkFavourite ? true:false,
						};
					});

					const finalData = {
						totalUsers: result.totalUsers,
						users: resultWithLikesCount,
					};

					return res.status(200).json({status: true, message: 'Followers list', data: finalData});
				} else {
					return res.status(403).json({status: false, message: 'Followers list not found!'});
				}
			} else if (checkUser.roleId == 4) {
				console.log('player followers===============');

				const findFollowers = await followersModel.findAll({where: {userId: req.body.id, status: 1, isDeleted: 0}, raw: true});
				let totalCoachIds = [];
				if (findFollowers.length === 0) {
					totalCoachIds = [];
				} else {
					totalCoachIds = findFollowers.map((followers) => followers.followedById);
				}
				console.log('totalCoachIds===========', totalCoachIds);

				// Define your filters with conditional logic
				const coachFilters = {
					roleId: 3,
					status: 1,
					isDeleted: 0,
					id: {
						[Op.in]: totalCoachIds,
					},
				};

				if (req.body.firstName) {
					coachFilters.firstname = {
						[Op.like]: `%${req.body.firstName}%`,
					};
				}

				if (req.body.lastName) {
					coachFilters.lastName = {
						[Op.like]: `%${req.body.lastName}%`,
					};
				}

				const result = await userService.coachDetails(coachFilters, req.body.offset, req.body.limit);
				if (result) {
					// Fetch likes count
					const usersArr = result.users;
					const userIds = usersArr.map((users) => users.id);

					const checkFavoriteUsers = await favouritePlayersCoachesModels.findAll({
						where: {playerOrCoachId: userIds, userId: req.decoded.id},
						raw: true,
					});

					// Map likes count to the result
					const resultWithLikesCount = await Promise.all(usersArr.map(async (user) => {
						const divisionLogo = await programTypesModels.findOne({
							where: {name: user['coachPersonalInformations.programs.division']},
							raw: true,
						});

						const checkFavourite = checkFavoriteUsers?.find((item) => item?.playerOrCoachId === user?.id);
						return {...user,
							isFavourite: checkFavourite ? true:false,
							divisionLogo: divisionLogo ? divisionLogo?.logo:null,
							colorCode: divisionLogo ? divisionLogo?.colorCode:null,
						};
					}));

					const finalData = {
						totalUsers: result.totalUsers,
						users: resultWithLikesCount,
					};

					return res.status(200).json({status: true, message: 'Followers list', data: finalData});
				} else {
					return res.status(403).json({status: false, message: 'Followers list not found!'});
				}
			} else {
				console.log('No role id found===============');
				return res.status(403).json({status: false, message: 'Something went wrong please contact support team!'});
			}
		} catch (error) {
			errorService.printError('User Service: followersList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get following list by id ******/
	async followingListById(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');
			const userService = new UserService();

			const checkUser = await usersModel.findOne({where: {id: req.body.id}, raw: true});

			if (checkUser.roleId == 3) {
				console.log('coach following===============');

				const findFollowers = await followersModel.findAll({where: {followedById: req.body.id, status: 1, isDeleted: 0}, raw: true});
				let totalPlayerIds = [];
				if (findFollowers.length === 0) {
					totalPlayerIds = [];
				} else {
					totalPlayerIds = findFollowers.map((followers) => followers.userId);
				}
				console.log('totalPlayerIds===========', totalPlayerIds);

				// Define your filters with conditional logic
				const playerFilters = {
					roleId: 4,
					status: 1,
					isDeleted: 0,
					id: {
						[Op.in]: totalPlayerIds,
					},
				};

				if (req.body.firstName) {
					playerFilters.firstname = {
						[Op.like]: `%${req.body.firstName}%`,
					};
				}

				if (req.body.lastName) {
					playerFilters.lastName = {
						[Op.like]: `%${req.body.lastName}%`,
					};
				}

				const result = await userService.playersDetails(playerFilters, req.body.offset, req.body.limit);

				if (result) {
					// Fetch likes count
					const usersArr = result.users;
					const userIds = usersArr.map((users) => users.id);

					const checkFavoriteUsers = await favouritePlayersCoachesModels.findAll({
						where: {playerOrCoachId: userIds, userId: req.body.id},
						raw: true,
					});

					// Map likes count to the result
					const resultWithLikesCount = usersArr.map((user) => {
						const checkFavourite = checkFavoriteUsers?.find((item) => item?.playerOrCoachId === user?.id);
						return {...user,
							isFavourite: checkFavourite ? true:false,
						};
					});

					const finalData = {
						totalUsers: result.totalUsers,
						users: resultWithLikesCount,
					};

					return res.status(200).json({status: true, message: 'Following list', data: finalData});
				} else {
					return res.status(403).json({status: false, message: 'Following list not found!'});
				}
			} else if (checkUser.roleId == 4) {
				console.log('player following===============');

				const findFollowers = await followersModel.findAll({where: {followedById: req.body.id, status: 1, isDeleted: 0}, raw: true});
				let totalCoachIds = [];
				if (findFollowers.length === 0) {
					totalCoachIds = [];
				} else {
					totalCoachIds = findFollowers.map((followers) => followers.userId);
				}
				console.log('totalCoachIds===========', totalCoachIds);

				// Define your filters with conditional logic
				const coachFilters = {
					roleId: 3,
					status: 1,
					isDeleted: 0,
					id: {
						[Op.in]: totalCoachIds,
					},
				};

				if (req.body.firstName) {
					coachFilters.firstname = {
						[Op.like]: `%${req.body.firstName}%`,
					};
				}

				if (req.body.lastName) {
					coachFilters.lastName = {
						[Op.like]: `%${req.body.lastName}%`,
					};
				}

				const result = await userService.coachDetails(coachFilters, req.body.offset, req.body.limit);
				if (result) {
					// Fetch likes count
					const usersArr = result.users;
					const userIds = usersArr.map((users) => users.id);

					const checkFavoriteUsers = await favouritePlayersCoachesModels.findAll({
						where: {playerOrCoachId: userIds, userId: req.body.id},
						raw: true,
					});

					// Map likes count to the result
					const resultWithLikesCount = await Promise.all(usersArr.map(async (user) => {
						const divisionLogo = await programTypesModels.findOne({
							where: {name: user['coachPersonalInformations.programs.division']},
							raw: true,
						});

						const checkFavourite = checkFavoriteUsers?.find((item) => item?.playerOrCoachId === user?.id);
						return {...user,
							isFavourite: checkFavourite ? true:false,
							divisionLogo: divisionLogo ? divisionLogo?.logo:null,
							colorCode: divisionLogo ? divisionLogo?.colorCode:null,
						};
					}));

					const finalData = {
						totalUsers: result.totalUsers,
						users: resultWithLikesCount,
					};

					return res.status(200).json({status: true, message: 'Following list', data: finalData});
				} else {
					return res.status(403).json({status: false, message: 'Following list not found!'});
				}
			} else {
				console.log('No role id found===============');
				return res.status(403).json({status: false, message: 'Something went wrong please contact support team!'});
			}
		} catch (error) {
			errorService.printError('User Service: followingListById', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get following and follower users list ******/
	async followingAndFollowerUsersList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');
			const userService = new UserService();

			const checkUser = await usersModel.findOne({where: {id: req.body.id}, raw: true});

			if (checkUser.roleId == 3) {
				console.log('coach following===============');

				const findFollowers = await followersModel.findAll({where: {followedById: req.body.id, status: 1, isDeleted: 0}, raw: true});
				const findFollowings = await followersModel.findAll({where: {userId: req.body.id, status: 1, isDeleted: 0}, raw: true});
				let totalPlayerIds = [];
				if (findFollowers.length === 0 && findFollowings.length === 0) {
					totalPlayerIds = [];
				} else {
					totalPlayerIds = findFollowers.map((followers) => followers.userId);
					totalPlayerIds = totalPlayerIds.concat(findFollowings.map((followings) => followings.followedById));
				}
				console.log('totalPlayerIds===========', totalPlayerIds);

				// Define your filters with conditional logic
				const playerFilters = {
					roleId: 4,
					status: 1,
					isDeleted: 0,
					id: {
						[Op.in]: totalPlayerIds,
					},
				};

				if (req.body.firstName) {
					playerFilters.firstname = {
						[Op.like]: `%${req.body.firstName}%`,
					};
				}

				if (req.body.lastName) {
					playerFilters.lastName = {
						[Op.like]: `%${req.body.lastName}%`,
					};
				}

				const result = await userService.playersDetails(playerFilters, req.body.offset, req.body.limit);

				if (result) {
					// Fetch likes count
					const usersArr = result.users;
					const userIds = usersArr.map((users) => users.id);

					const checkFavoriteUsers = await favouritePlayersCoachesModels.findAll({
						where: {playerOrCoachId: userIds, userId: req.body.id},
						raw: true,
					});

					// Map likes count to the result
					const resultWithLikesCount = usersArr.map((user) => {
						const checkFavourite = checkFavoriteUsers?.find((item) => item?.playerOrCoachId === user?.id);
						return {...user,
							isFavourite: checkFavourite ? true:false,
						};
					});

					const finalData = {
						totalUsers: result.totalUsers,
						users: resultWithLikesCount,
					};

					return res.status(200).json({status: true, message: 'Following and follower users list', data: finalData});
				} else {
					return res.status(403).json({status: false, message: 'Following and follower users list not found!'});
				}
			} else if (checkUser.roleId == 4) {
				console.log('player following===============');

				const findFollowers = await followersModel.findAll({where: {followedById: req.body.id, status: 1, isDeleted: 0}, raw: true});
				const findFollowings = await followersModel.findAll({where: {userId: req.body.id, status: 1, isDeleted: 0}, raw: true});
				let totalCoachIds = [];
				if (findFollowers.length === 0 && findFollowings.length === 0) {
					totalCoachIds = [];
				} else {
					totalCoachIds = findFollowers.map((followers) => followers.userId,followers.followedById);
					totalPlayerIds = totalPlayerIds.concat(findFollowings.map((followings) => followings.followedById));
				}
				console.log('totalCoachIds===========', totalCoachIds);

				// Define your filters with conditional logic
				const coachFilters = {
					roleId: 3,
					status: 1,
					isDeleted: 0,
					id: {
						[Op.in]: totalCoachIds,
					},
				};

				if (req.body.firstName) {
					coachFilters.firstname = {
						[Op.like]: `%${req.body.firstName}%`,
					};
				}

				if (req.body.lastName) {
					coachFilters.lastName = {
						[Op.like]: `%${req.body.lastName}%`,
					};
				}

				const result = await userService.coachDetails(coachFilters, req.body.offset, req.body.limit);
				if (result) {
					// Fetch likes count
					const usersArr = result.users;
					const userIds = usersArr.map((users) => users.id);

					const checkFavoriteUsers = await favouritePlayersCoachesModels.findAll({
						where: {playerOrCoachId: userIds, userId: req.body.id},
						raw: true,
					});

					// Map likes count to the result
					const resultWithLikesCount = await Promise.all(usersArr.map(async (user) => {
						const divisionLogo = await programTypesModels.findOne({
							where: {name: user['coachPersonalInformations.programs.division']},
							raw: true,
						});

						const checkFavourite = checkFavoriteUsers?.find((item) => item?.playerOrCoachId === user?.id);
						return {...user,
							isFavourite: checkFavourite ? true:false,
							divisionLogo: divisionLogo ? divisionLogo?.logo:null,
							colorCode: divisionLogo ? divisionLogo?.colorCode:null,
						};
					}));

					const finalData = {
						totalUsers: result.totalUsers,
						users: resultWithLikesCount,
					};

					return res.status(200).json({status: true, message: 'Following and follower users list', data: finalData});
				} else {
					return res.status(403).json({status: false, message: 'Following and follower users list not found!'});
				}
			} else {
				console.log('No role id found===============');
				return res.status(403).json({status: false, message: 'Something went wrong please contact support team!'});
			}
		} catch (error) {
			errorService.printError('User Service: followingAndFollowerUsersList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to accept or decline follow request ******/
	async acceptOrDeclineFollowRequest(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			if (req.body.followStatus == 'Accepted') {
				const dataToUpdate = {
					followStatus: 'Accepted',
				};
				const result = await followersModel.create(dataToUpdate, {where: {id: req.body.id}});
				if (result) {
					return res.status(200).json({status: true, message: 'Follow request accepted successfully'});
				} else {
					return res.status(403).json({status: false, message: 'Follow request not accepted!'});
				}
			} else if (req.body.followStatus == 'Declined') {
				const result = await followersModel.destroy({where: {id: req.body.id}});
				if (result) {
					return res.status(200).json({status: true, message: 'Follow request declined successfully'});
				} else {
					return res.status(403).json({status: false, message: 'Follow request not declined!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'Unable to unfollow!'});
			}
		} catch (error) {
			errorService.printError('User Service: acceptOrDeclineFollowRequest', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to unfollow user ******/
	async unfollowUser(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await followersModel.findOne({where: {followedById: req.decoded.id, userId: req.body.userId}});
			if (result) {
				const unfollow = await followersModel.destroy({where: {id: result.id}});
				if (unfollow) {
					return res.status(200).json({status: true, message: 'Unfollowed successfully'});
				} else {
					return res.status(403).json({status: false, message: 'Unable to unfollow!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'Follow request not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: unfollowUser', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get roster list by program id ******/
	async rostersListByProgramId(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await rostersModel.findAll({
				where: {status: 1, isDeleted: 0, programId: req.params.programId},
				include: [
					{
						model: schoolsModel,
						as: 'programs',
						required: false,
					},
				],
			});
			if (result) {
				const resultArr = [];
				let data = {};
				for (let i = 0; i<result.length; i++) {
					if (result[i]?.userId) {
						const findPlayerData = await usersModel.findOne({
							where: {
								id: result[i].userId,
							},
							// include: [
							// 	{
							// 		model: playerPersonalInformationsModels,
							// 		as: 'playerPersonalInformations',
							// 		required: false,
							// 	},
							// ],
							raw: true,
						});

						const playerPersonalInformationsData =	await playerPersonalInformationsModels.findOne({
							where: {
								userId: result[i].userId,
							},
							raw: true,
						});
						data = {
							id: result[i].id,
							coachId: parseInt(req.params.id),
							programId: parseInt(req.params.programId),
							userId: result[i].userId,
							profilePictureUrl: findPlayerData?.profilePictureUrl,
							firstName: findPlayerData?.firstName,
							lastName: findPlayerData?.lastName,
							class: playerPersonalInformationsData?.class,
							position: playerPersonalInformationsData?.position,
							height: playerPersonalInformationsData?.height,
							description: result[i]?.description,
							openings: result[i]?.openings,
							isOfficial: result[i]?.isOfficial,
							status: result[i]?.status,
							isDeleted: result[i]?.isDeleted,
							createdAt: result[i]?.createdAt,
							updatedAt: result[i]?.updatedAt,
							programs: result[i].programs,
						};
						resultArr.push(data);
					} else {
						data = result[i];
						resultArr.push(data);
					}
				}
				return res.status(200).json({status: true, message: 'Rosters list', data: resultArr});
			} else {
				return res.status(403).json({status: false, message: 'Rosters list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: rostersListByProgramId', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get program university profile ******/
	async programUniversityProfile(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await schoolsModel.findOne({
				where: {id: req.params.id, status: 1, isDeleted: 0},
				include: [
					{
						model: coachPersonalInformationsModels,
						as: 'coachPersonalInformations',
						required: false,
						include: [
							{
								model: usersModel,
								as: 'coach',
								attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
								required: false,
								order: [['id', 'ASC']],
							},
						],
					},
				],
			});

			if (result) {
				const divisionLogo = await programTypesModels.findOne({where: {name: result.division}, raw: true});
				const findFavouriteProgram = await favouriteProgramsModel.findOne({where: {userId: req.decoded.id, programId: result.id}, raw: true});
				result.dataValues.divisionLogo = divisionLogo ? divisionLogo?.logo:null;
				result.dataValues.colorCode = divisionLogo ? divisionLogo?.colorCode:null;
				result.dataValues.isFavourite = findFavouriteProgram ? true:false;
				return res.status(200).json({status: true, message: 'University profile', data: result});
			} else {
				return res.status(403).json({status: false, message: 'University profile not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: programUniversityProfile', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Auth Service: Method to send assistant coach invitation email ******/
	async sendAssistantCoachInvitationEmail(data) {
		const source = fs.readFileSync(commonConfig.FILE_LOCATION + '/templates/invite_assistant_coach_email.hbs', 'utf8');
		const template = Handlebars.compile(source);

		const locals = {
			email: data.email,
			coachName: data.coachName,
			appUrl: commonConfig.APP_URL,
		};

		const msg = {
			to: data.email, // Change to your recipient
			from: commonConfig.SENDGRID_EMAIL_FROM, // Change to your verified sender
			subject: 'Undiscovered Recruits Invitation',
			html: template(locals),
		};

		sgMail.send(msg).then(() => {
			console.log('sendAssistantCoachInvitationEmail Sent');
		});
	}

	/** ***** User Service: Method to invite assistant coach ******/
	async inviteAssistantCoach(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const userService = new UserService();

			const findCoach = await usersModel.findOne({where: {id: req.decoded.id, roleId: 3, status: 1, isDeleted: 0}, raw: true});

			if (findCoach) {
				const fullName = findCoach?.firstName +' '+ findCoach?.lastName;
				const data = {coachName: fullName, email: req.body.email};
				await userService.sendAssistantCoachInvitationEmail(data);
				return res.status(200).json({status: true, message: 'Assistant coach invited successfully'});
			} else {
				return res.status(403).json({status: false, message: 'Invite not sent!'});
			}
		} catch (error) {
			errorService.printError('User Service: programUniversityProfile', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get player news feeds ******/
	async playersNewsFeeds(playerFilters, offset, limit) {
		try {
			console.log('playersDetails======================', playerFilters, offset, limit);
			const {count, rows} = await newsFeedsModels.findAndCountAll({
				attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
				where: playerFilters,
				include: [{
					model: usersModel,
					as: 'user',
					attributes: ['profilePictureUrl', 'firstName', 'lastName', 'roleId'],
				}],
				order: [['id', 'DESC']],
				offset: offset,
				limit: limit,
				raw: true,
			});
			return {
				totalUsers: count,
				users: rows,
			};
		} catch (error) {
			errorService.printError('User Service: playersDetails', error);
			console.log('playersDetails error: ', error);
		}
	}

	/** ***** User Service: Method to get coach news feeds ******/
	async coachNewsFeeds(coachFilters, offset, limit) {
		try {
			console.log('coachNewsFeeds======================', coachFilters, offset, limit);
			const {count, rows} = await newsFeedsModels.findAndCountAll({
				attributes: {exclude: ['password', 'verificationCode', 'userId']},
				where: coachFilters,
				include: [{
					model: usersModel,
					as: 'user',
					attributes: ['profilePictureUrl', 'firstName', 'lastName', 'roleId'],
					include: [{
						model: coachPersonalInformationsModels,
						as: 'coachPersonalInformations',
						required: false,
						include: [{
							model: schoolsModel,
							as: 'programs',
							required: false,
						}],
					}],
				}],
				order: [['id', 'DESC']],
				offset: offset,
				limit: limit,
				raw: true,
			});
			return {
				totalUsers: count,
				users: rows,
			};
		} catch (error) {
			errorService.printError('User Service: coachNewsFeeds', error);
			console.log('coachNewsFeeds error: ', error);
		}
	}

	/** ***** User Service: Method to get all news feeds list ******/
	async allNewsFeedsList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findreportedNewsFeeds = await reportedNewsFeedsModel.findAll({where: {userId: req.decoded.id}, raw: true});
			let reportedNewsFeedsArr = [];
			if (findreportedNewsFeeds.length === 0) {
				reportedNewsFeedsArr = [];
			} else {
				reportedNewsFeedsArr = findreportedNewsFeeds.map((feeds) => feeds.feedId);
			}

			console.log('reportedNewsFeedsArr=======', reportedNewsFeedsArr);

			const {count, rows} = await newsFeedsModels.findAndCountAll({
				where: {
					id: {
						[Op.notIn]: reportedNewsFeedsArr,
					},
					status: 1,
					isDeleted: 0},
				include: [{
					model: usersModel,
					as: 'user',
					attributes: ['profilePictureUrl', 'firstName', 'lastName', 'roleId'],
				}],
				order: [['id', 'DESC']],
				offset: req.body.offset,
				limit: req.body.limit,
				raw: true});

			const result = rows;
			const totalUsers = count;

			if (result) {
				// Fetch likes count for each feed
				const feedIds = result.map((feed) => feed.id);
				const likesCounts = await favouriteNewsFeedsModels.findAll({
					attributes: ['feedId', [sequelize.fn('COUNT', '*'), 'count']],
					where: {feedId: feedIds},
					group: ['feedId'],
					raw: true,
				});

				const checkUserLikes = await favouriteNewsFeedsModels.findAll({
					where: {feedId: feedIds, userId: req.decoded.id},
					raw: true,
				});

				// Map likes count to the result
				const resultWithLikesCount = await Promise.all(result.map(async (feed) => {
					const likesCount = likesCounts.find((item) => item.feedId === feed.id);
					const checkLike = checkUserLikes?.find((item) => item?.feedId === feed?.id);
					const findFollowing = await followersModel.findOne({where: {userId: feed?.userId, followedById: req.decoded.id}, raw: true});

					return {...feed, likesCount: likesCount ? likesCount.count : 0,
						isLiked: checkLike ? true:false,
						isFollowing: findFollowing ? 1:0,
						profilePictureUrl: feed['user.profilePictureUrl'],
						firstName: feed['user.firstName'],
						lastName: feed['user.lastName'],
						roleId: feed['user.roleId'],
					};
				}));
				return res.status(200).json({status: true, message: 'All news feeds list', data: {totalUsers: totalUsers, users: resultWithLikesCount}});
			} else {
				return res.status(403).json({status: false, message: 'All news feeds list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: allNewsFeedsList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get all news feeds list ******/
	async allNewsFeedsListByRoleId(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findreportedNewsFeeds = await reportedNewsFeedsModel.findAll({where: {userId: req.decoded.id}, raw: true});
			let reportedNewsFeedsArr = [];
			if (findreportedNewsFeeds.length === 0) {
				reportedNewsFeedsArr = [];
			} else {
				reportedNewsFeedsArr = findreportedNewsFeeds.map((feeds) => feeds.feedId);
			}

			console.log('reportedNewsFeedsArr=======', reportedNewsFeedsArr);

			const userService = new UserService();
			if (req.body.roleId == 4) {
				const findPlayers = await usersModel.findAll({where: {roleId: 4, status: 1, isDeleted: 0}, raw: true});
				let totalPlayerIds = [];
				if (findPlayers.length === 0) {
					totalPlayerIds = [];
				} else {
					totalPlayerIds = findPlayers.map((players) => players.id);
				}
				const playerFilters = {
					status: 1,
					isDeleted: 0,
					isActivity: 0,
					userId: {
						[Op.in]: totalPlayerIds,
					},
					id: {
						[Op.notIn]: reportedNewsFeedsArr,
					},
				};

				const result = await userService.playersNewsFeeds(playerFilters, req.body.offset, req.body.limit);
				if (result) {
					const selectedResult = result.users;
					const usersCount = result.totalUsers;

					// Fetch likes count for each feed
					const feedIds = selectedResult.map((feed) => feed.id);
					const likesCounts = await favouriteNewsFeedsModels.findAll({
						attributes: ['feedId', [sequelize.fn('COUNT', '*'), 'count']],
						where: {feedId: feedIds},
						group: ['feedId'],
						raw: true,
					});

					const checkUserLikes = await favouriteNewsFeedsModels.findAll({
						where: {feedId: feedIds, userId: req.decoded.id},
						raw: true,
					});

					// Map likes count to the result
					const resultWithLikesCount = await Promise.all(selectedResult.map(async (feed) => {
						const likesCount = likesCounts.find((item) => item.feedId === feed.id);
						const checkLike = checkUserLikes?.find((item) => item?.feedId === feed?.id);
						const findFollowing = await followersModel.findOne({where: {userId: feed?.userId, followedById: req.decoded.id}, raw: true});

						return {...feed, likesCount: likesCount ? likesCount.count : 0,
							isLiked: checkLike ? true:false,
							isFollowing: findFollowing ? 1:0,
							profilePictureUrl: feed['user.profilePictureUrl'],
							firstName: feed['user.firstName'],
							lastName: feed['user.lastName'],
							roleId: feed['user.roleId'],
						};
					}));
					return res.status(200).json({status: true, message: 'News feeds list', data: {totalUsers: usersCount, users: resultWithLikesCount}});
				} else {
					return res.status(403).json({status: false, message: 'News feeds list not found!'});
				}
			} else if (req.body.roleId == 3) {
				const findCoach = await usersModel.findAll({where: {roleId: 3, status: 1, isDeleted: 0}, raw: true});
				let totalCoachIds = [];
				if (findCoach.length === 0) {
					totalCoachIds = [];
				} else {
					totalCoachIds = findCoach.map((coaches) => coaches.id);
				}

				const coachFilters = {
					status: 1,
					isDeleted: 0,
					isActivity: 0,
					userId: {
						[Op.in]: totalCoachIds,
					},
					id: {
						[Op.notIn]: reportedNewsFeedsArr,
					},
				};

				const result = await userService.coachNewsFeeds(coachFilters, req.body.offset, req.body.limit);
				if (result) {
					const selectedResult = result.users;
					const usersCount = result.totalUsers;

					// Fetch likes count for each feed
					const feedIds = selectedResult.map((feed) => feed.id);
					const likesCounts = await favouriteNewsFeedsModels.findAll({
						attributes: ['feedId', [sequelize.fn('COUNT', '*'), 'count']],
						where: {feedId: feedIds},
						group: ['feedId'],
						raw: true,
					});

					const checkUserLikes = await favouriteNewsFeedsModels.findAll({
						where: {feedId: feedIds, userId: req.decoded.id},
						raw: true,
					});

					// Map likes count to the results
					const resultWithLikesCount = await Promise.all(selectedResult.map(async (feed) => {
						const divisionLogo = await programTypesModels.findOne({
							where: {name: feed['user.coachPersonalInformations.programs.division']},
							raw: true,
						});

						const likesCount = likesCounts.find((item) => item.feedId === feed.id);
						const checkLike = checkUserLikes?.find((item) => item?.feedId === feed?.id);
						const findFollowing = await followersModel.findOne({where: {userId: feed?.UserId, followedById: req.decoded.id}, raw: true});

						console.log(feed?.userId, "abc================",findFollowing , feed);

						return {...feed, likesCount: likesCount ? likesCount.count : 0,
							isLiked: checkLike ? true:false,
							isFollowing: findFollowing ? 1:0,
							profilePictureUrl: feed['user.profilePictureUrl'],
							firstName: feed['user.firstName'],
							lastName: feed['user.lastName'],
							roleId: feed['user.roleId'],
							divisionLogo: divisionLogo ? divisionLogo?.logo:null,
							colorCode: divisionLogo ? divisionLogo?.colorCode:null,
						};
					}));
					return res.status(200).json({status: true, message: 'News feeds list', data: {totalUsers: usersCount, users: resultWithLikesCount}});
				} else {
					return res.status(403).json({status: false, message: 'News feeds list not found!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'News feeds list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: allNewsFeedsListByRoleId', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get player match styles ******/
	async playersMatchStyles(playerFilters, offset, limit) {
		try {
			console.log('playersMatchStyles======================', playerFilters, offset, limit);
			const {count, rows} = await usersModel.findAndCountAll({
				attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
				where: playerFilters,
				include: [{
					model: playerPersonalInformationsModels,
					as: 'playerPersonalInformations',
					required: false,
				},
				{
					model: playerStatsModels,
					as: 'playerStats',
					required: false,
				},
				],
				order: sequelize.random(),
				offset: offset,
				limit: limit,
				raw: true,
			});
			return {
				totalUsers: count,
				users: rows,
			};
		} catch (error) {
			errorService.printError('User Service: playersMatchStyles', error);
			console.log('playersMatchStyles error: ', error);
		}
	}

	/** ***** User Service: Method to get coach match styles ******/
	async coachMatchStyles(coachFilters, offset, limit) {
		try {
			console.log('coachMatchStyles======================', coachFilters, offset, limit);
			const {count, rows} = await usersModel.findAndCountAll({
				attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
				where: coachFilters,
				include: [{
					model: coachPersonalInformationsModels,
					as: 'coachPersonalInformations',
					required: false,
					include: [{
						model: schoolsModel,
						as: 'programs',
						required: false,
					}],
				},
				{
					model: coachCoachingDetailsModels,
					as: 'coachCoachingDetails',
					required: false,
				},
				],
				order: sequelize.random(),
				offset: offset,
				limit: limit,
				raw: true,
			});
			return {
				totalUsers: count,
				users: rows,
			};
		} catch (error) {
			errorService.printError('User Service: coachMatchStyles', error);
			console.log('coachMatchStyles error: ', error);
		}
	}

	/** ***** User Service: Method to follows list by id ******/
	async randomMatchStylesListByCoachId(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');
			const userService = new UserService();

			const checkUser = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});
			if (checkUser?.roleId == 3) {
				console.log('coach followers===============');

				const findLikedProfiles = await matchStylesModel.findAll({where: {likedById: req.decoded.id, status: 1, isDeleted: 0}, raw: true});
				let totalPlayerIds = [];
				if (findLikedProfiles.length === 0) {
					totalPlayerIds = [];
				} else {
					totalPlayerIds = findLikedProfiles.map((likes) => likes.userId);
				}
				console.log('totalPlayerIds===========', totalPlayerIds);

				// Define your filters with conditional logic
				const playerFilters = {
					roleId: 4,
					status: 1,
					isDeleted: 0,
					id: {
						[Op.notIn]: totalPlayerIds,
					},
				};

				const result = await userService.playersMatchStyles(playerFilters, req.body.offset, req.body.limit);
				if (result) {
					// Fetch likes count
					const usersArr = result.users;
					const userIds = usersArr.map((users) => users.id);

					const checkFavoriteUsers = await favouritePlayersCoachesModels.findAll({
						where: {playerOrCoachId: userIds, userId: req.decoded.id},
						raw: true,
					});

					// Map likes count to the result
					const resultWithLikesCount = await Promise.all(usersArr.map(async (user) => {
						const findPhotos = await userPhotosModel.findAll({
							where: {
								userId: user?.id,
								status: 1,
								isDeleted: 0,
							},
							order: [['id', 'DESC']],
            				limit: 3,
							raw: true,
						});

						const findVideos = await userVideoReelsModel.findAll({
							where: {
								userId: user?.id,
								status: 1,
								isDeleted: 0,
							},
							order: [['id', 'DESC']],
            				limit: 3,
							raw: true,
						});

						const findFollowing = await followersModel.findOne({where: {userId: user?.id, followedById: req.decoded.id}, raw: true});

						const checkFavourite = checkFavoriteUsers?.find((item) => item?.playerOrCoachId === user?.id);
						return {...user,
							photos: findPhotos,
							videos: findVideos,
							isFavourite: checkFavourite ? true:false,
							isFollowing: findFollowing ? 1:0,
						};
					}));

					const finalData = {
						totalUsers: result.totalUsers,
						users: resultWithLikesCount,
					};

					return res.status(200).json({status: true, message: 'Match styles list', data: finalData});
				} else {
					return res.status(403).json({status: false, message: 'Match styles list not found!'});
				}
			} else {
				console.log('No role id found===============');
				return res.status(403).json({status: false, message: 'Something went wrong please contact support team!'});
			}
		} catch (error) {
			errorService.printError('User Service: randomMatchStylesListByCoachId', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to follows list by id ******/
	async randomMatchStylesListByPlayerId(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');
			const userService = new UserService();

			const checkUser = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});

			if (checkUser.roleId == 4) {
				console.log('player followers===============');

				const findLikedProfiles = await matchStylesModel.findAll({where: {likedById: req.decoded.id, status: 1, isDeleted: 0}, raw: true});
				let totalCoachIds = [];
				if (findLikedProfiles.length === 0) {
					totalCoachIds = [];
				} else {
					totalCoachIds = findLikedProfiles.map((likes) => likes.userId);
				}
				console.log('totalCoachIds===========', totalCoachIds);

				// Define your filters with conditional logic
				const coachFilters = {
					roleId: 3,
					status: 1,
					isDeleted: 0,
					id: {
						[Op.notIn]: totalCoachIds,
					},
				};

				const result = await userService.coachMatchStyles(coachFilters, req.body.offset, req.body.limit);
				if (result) {
					// Fetch likes count
					const usersArr = result.users;
					const userIds = usersArr.map((users) => users.id);

					const checkFavoriteUsers = await favouritePlayersCoachesModels.findAll({
						where: {playerOrCoachId: userIds, userId: req.decoded.id},
						raw: true,
					});

					// Map likes count to the result
					const resultWithLikesCount = await Promise.all(usersArr.map(async (user) => {
						const divisionLogo = await programTypesModels.findOne({
							where: {name: user['coachPersonalInformations.programs.division']},
							raw: true,
						});

						const findPhotos = await userPhotosModel.findAll({
							where: {
								userId: user?.id,
								status: 1,
								isDeleted: 0,
							},
							order: [['id', 'DESC']],
            				limit: 3,
							raw: true,
						});

						const findVideos = await userVideoReelsModel.findAll({
							where: {
								userId: user?.id,
								status: 1,
								isDeleted: 0,
							},
							order: [['id', 'DESC']],
            				limit: 3,
							raw: true,
						});

						const findFollowing = await followersModel.findOne({where: {userId: user?.id, followedById: req.decoded.id}, raw: true});

						const checkFavourite = checkFavoriteUsers?.find((item) => item?.playerOrCoachId === user?.id);
						return {...user,
							photos: findPhotos,
							videos: findVideos,
							isFavourite: checkFavourite ? true:false,
							isFollowing: findFollowing ? 1:0,
							divisionLogo: divisionLogo ? divisionLogo?.logo:null,
							colorCode: divisionLogo ? divisionLogo?.colorCode:null,
						};
					}));

					const finalData = {
						totalUsers: result.totalUsers,
						users: resultWithLikesCount,
					};

					return res.status(200).json({status: true, message: 'Match styles list', data: finalData});
				} else {
					return res.status(403).json({status: false, message: 'Match styles list not found!'});
				}
			} else {
				console.log('No role id found===============');
				return res.status(403).json({status: false, message: 'Something went wrong please contact support team!'});
			}
		} catch (error) {
			errorService.printError('User Service: randomMatchStylesListByPlayerId', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to follow users ******/
	async swipeMatchStyles(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findFollowingRequested = await matchStylesModel.findOne({where: {userId: req.body.userId, likedById: req.decoded.id}, raw: true});
			const findFollowingReceived = await matchStylesModel.findOne({where: {userId: req.decoded.id, likedById: req.body.userId}, raw: true});

			if (findFollowingRequested) {
				return res.status(200).json({status: true, message: 'Profile liked!', data: {isMatched: 0}});
			} else if (findFollowingReceived) {
				const dataToCreate = {
					userId: req.body.userId,
					likedById: req.decoded.id,
					status: 1,
					isDeleted: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				const result = await matchStylesModel.create(dataToCreate);
				if (result) {
					const findUser = await usersModel.findOne({where: {id: req.body.userId}, raw: true});

					// Send Notification
					if (findUser?.fcmToken) {
						const findViewer = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});
						const fullViewerName = findViewer?.firstName +' '+ findViewer?.lastName;

						const notificationToCreate = {
							userId: findUser.id,
							title: 'Notification!',
							body: `${fullViewerName} matched with your profile`,
							notificationType: 'swipeMatchStyles',
							data: {
								userId: `${req.decoded.id}`,
								roleId: `${findViewer.roleId}`,
								notificationType: 'swipeMatchStyles',
							},
							viewStatus: 0,
							status: 1,
							isDeleted: 0,
							createdAt: new Date(),
							updatedAt: new Date(),
						};

						const createNotification = await notificationsModel.create(notificationToCreate);

						if (createNotification) {
							const message = {
								token: findUser?.fcmToken,
								notification: {
									title: notificationToCreate.title,
									body: notificationToCreate.body,
								},
								data: {
									userId: `${notificationToCreate.data.userId}`,
									roleId: `${notificationToCreate.data.roleId}`,
									notificationId: `${createNotification.id}`,
									notificationType: notificationToCreate.data.notificationType,
								},
							};

							firebaseAdmin.messaging().send(message)
								.then((response) => {
									console.log('Successfully sent message:', response);
								})
								.catch((error) => {
									console.log('Error sending message:', error);
								});
						}
					}

					return res.status(200).json({status: true, message: 'Profiles matched successfully', data: {isMatched: 1}});
				} else {
					return res.status(403).json({status: false, message: 'Profile not liked!', data: {isMatched: 0}});
				}
			} else {
				const dataToCreate = {
					userId: req.body.userId,
					likedById: req.decoded.id,
					status: 1,
					isDeleted: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				const result = await matchStylesModel.create(dataToCreate);
				if (result) {
					return res.status(200).json({status: true, message: 'Profile liked!', data: {isMatched: 0}});
				} else {
					return res.status(403).json({status: false, message: 'Profile not liked!'});
				}
			}
		} catch (error) {
			errorService.printError('User Service: swipeMatchStyles', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get matched player ******/
	async matchedPlayers(playerFilters, offset, limit) {
		try {
			console.log('matchedPlayers======================', playerFilters, offset, limit);
			const {count, rows} = await usersModel.findAndCountAll({
				attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
				where: playerFilters,
				include: [{
					model: playerPersonalInformationsModels,
					as: 'playerPersonalInformations',
					required: false,
				},
				{
					model: playerStatsModels,
					as: 'playerStats',
					required: false,
				},
				],
				order: [['id', 'DESC']],
				offset: offset,
				limit: limit,
				raw: true,
			});
			return {
				totalUsers: count,
				users: rows,
			};
		} catch (error) {
			errorService.printError('User Service: matchedPlayers', error);
			console.log('matchedPlayers error: ', error);
		}
	}

	/** ***** User Service: Method to get matched coach ******/
	async matchedCoaches(coachFilters, offset, limit) {
		try {
			console.log('matchedCoaches======================', coachFilters, offset, limit);
			const {count, rows} = await usersModel.findAndCountAll({
				attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
				where: coachFilters,
				include: [{
					model: coachPersonalInformationsModels,
					as: 'coachPersonalInformations',
					required: false,
					include: [{
						model: schoolsModel,
						as: 'programs',
						required: false,
					}],
				},
				{
					model: coachCoachingDetailsModels,
					as: 'coachCoachingDetails',
					required: false,
				},
				],
				order: [['id', 'DESC']],
				offset: offset,
				limit: limit,
				raw: true,
			});
			return {
				totalUsers: count,
				users: rows,
			};
		} catch (error) {
			errorService.printError('User Service: matchedCoaches', error);
			console.log('matchedCoaches error: ', error);
		}
	}

	/** ***** User Service: Method to get all matched styles list ******/
	async matchedStylesList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const userService = new UserService();

			const findUser = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});

			if (findUser?.roleId == 4) {
				console.log('player followers===============');

				const findLikedProfiles = await matchStylesModel.findAll({where: {likedById: req.decoded.id, status: 1, isDeleted: 0}, raw: true});
				const totalCoachIds = [];
				// if (findLikedProfiles.length === 0) {
				// 	totalCoachIds = [];
				// } else {
				// 	totalCoachIds = findLikedProfiles.map((likes) => likes.userId);
				// }

				for (let i=0; i<findLikedProfiles.length; i++) {
					const findLikedByMeProfiles = await matchStylesModel.findOne({where: {userId: req.decoded.id, likedById: findLikedProfiles[i].userId, status: 1, isDeleted: 0}, raw: true});
					if (findLikedByMeProfiles) {
						totalCoachIds.push(findLikedByMeProfiles.likedById);
					} else {
					}
				}

				console.log('totalCoachIds===========', totalCoachIds);

				// Define your filters with conditional logic
				const coachFilters = {
					roleId: 3,
					status: 1,
					isDeleted: 0,
					id: {
						[Op.in]: totalCoachIds,
					},
				};

				const result = await userService.matchedCoaches(coachFilters, req.body.offset, req.body.limit);
				if (result) {
					// Fetch likes count
					const usersArr = result.users;
					const userIds = usersArr.map((users) => users.id);

					const checkFavoriteUsers = await favouritePlayersCoachesModels.findAll({
						where: {playerOrCoachId: userIds, userId: req.decoded.id},
						raw: true,
					});

					// Map likes count to the result
					const resultWithLikesCount = await Promise.all(usersArr.map(async (user) => {
						const divisionLogo = await programTypesModels.findOne({
							where: {name: user['coachPersonalInformations.programs.division']},
							raw: true,
						});

						// const findPhotos = await userPhotosModel.findAll({
						// 	where: {
						// 		userId: user?.id,
						// 		status: 1,
						// 		isDeleted: 0
						// 	},
						// 	order: [['id', 'DESC']],
            			// 	limit: 3,
						// 	raw: true
						// });

						// const findVideos = await userVideoReelsModel.findAll({
						// 	where: {
						// 		userId: user?.id,
						// 		status: 1,
						// 		isDeleted: 0
						// 	},
						// 	order: [['id', 'DESC']],
            			// 	limit: 3,
						// 	raw: true
						// });

						const findFollowing = await followersModel.findOne({where: {userId: user?.id, followedById: req.decoded.id}, raw: true});
						const checkFavourite = checkFavoriteUsers?.find((item) => item?.playerOrCoachId === user?.id);
						return {...user,
							// photos: findPhotos,
							// videos: findVideos,
							isFavourite: checkFavourite ? true:false,
							divisionLogo: divisionLogo ? divisionLogo?.logo:null,
							colorCode: divisionLogo ? divisionLogo?.colorCode:null,
							isFollowing: findFollowing ? 1:0,
						};
					}));

					const finalData = {
						totalUsers: result.totalUsers,
						users: resultWithLikesCount,
					};

					return res.status(200).json({status: true, message: 'Matched styles list', data: finalData});
				} else {
					return res.status(403).json({status: false, message: 'Matched styles list not found!'});
				}
			} else if (findUser?.roleId == 3) {
				console.log('coach followers===============');

				const findLikedProfiles = await matchStylesModel.findAll({where: {likedById: req.decoded.id, status: 1, isDeleted: 0}, raw: true});
				const totalPlayerIds = [];
				// if (findLikedProfiles.length === 0) {
				// 	totalPlayerIds = [];
				// } else {
				// 	totalPlayerIds = findLikedProfiles.map((likes) => likes.userId);
				// }

				for (let i=0; i<findLikedProfiles.length; i++) {
					const findLikedByMeProfiles = await matchStylesModel.findOne({where: {userId: req.decoded.id, likedById: findLikedProfiles[i].userId, status: 1, isDeleted: 0}, raw: true});
					if (findLikedByMeProfiles) {
						totalPlayerIds.push(findLikedByMeProfiles.likedById);
					} else {
					}
				}

				console.log('totalPlayerIds===========', totalPlayerIds);

				// Define your filters with conditional logic
				const playerFilters = {
					roleId: 4,
					status: 1,
					isDeleted: 0,
					id: {
						[Op.in]: totalPlayerIds,
					},
				};

				const result = await userService.matchedPlayers(playerFilters, req.body.offset, req.body.limit);
				if (result) {
					// Fetch likes count
					const usersArr = result.users;
					const userIds = usersArr.map((users) => users.id);

					const checkFavoriteUsers = await favouritePlayersCoachesModels.findAll({
						where: {playerOrCoachId: userIds, userId: req.decoded.id},
						raw: true,
					});

					// Map likes count to the result
					const resultWithLikesCount = await Promise.all(usersArr.map(async (user) => {
						// const findPhotos = await userPhotosModel.findAll({
						// 	where: {
						// 		userId: user?.id,
						// 		status: 1,
						// 		isDeleted: 0
						// 	},
						// 	order: [['id', 'DESC']],
            			// 	limit: 3,
						// 	raw: true
						// });

						// const findVideos = await userVideoReelsModel.findAll({
						// 	where: {
						// 		userId: user?.id,
						// 		status: 1,
						// 		isDeleted: 0
						// 	},
						// 	order: [['id', 'DESC']],
            			// 	limit: 3,
						// 	raw: true
						// });

						const findFollowing = await followersModel.findOne({where: {userId: user?.id, followedById: req.decoded.id}, raw: true});
						const checkFavourite = checkFavoriteUsers?.find((item) => item?.playerOrCoachId === user?.id);
						return {...user,
							// photos: findPhotos,
							// videos: findVideos,
							isFavourite: checkFavourite ? true:false,
							isFollowing: findFollowing ? 1:0,
						};
					}));

					const finalData = {
						totalUsers: result.totalUsers,
						users: resultWithLikesCount,
					};

					return res.status(200).json({status: true, message: 'Matched styles list', data: finalData});
				} else {
					return res.status(403).json({status: false, message: 'Matched styles list not found!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'Matched styles list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: matchedStylesList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to unmatch profile ******/
	async unmatchProfile(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await matchStylesModel.findOne({where: {likedById: req.decoded.id, userId: req.body.userId}});
			if (result) {
				const unmatch = await matchStylesModel.destroy({where: {id: result.id}});
				if (unmatch) {
					return res.status(200).json({status: true, message: 'Unmatched successfully'});
				} else {
					return res.status(403).json({status: false, message: 'Unable to unmatched!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'Follow request not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: unmatchProfile', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to add view profile activity in news feeds ******/
	async viewProfileActivity(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findUser = await usersModel.findOne({where: {id: req.body.userId}, raw: true});
			const fullName = findUser?.firstName +' '+ findUser?.lastName;
			const activityToCreate = {
				userId: req.decoded.id,
				content: `viewed profile of ${fullName}`,
				isActivity: 1,
				status: 1,
				isDeleted: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
			};
			const result = await newsFeedsModels.create(activityToCreate);

			// for testing
			// const message = {
			//   token: "enRczV-KSHGMbb3oCFh4Cb:APA91bHLHzxkgJfJZMzQPM8u1ipptGRqt-P0FfFBLFw7DM4hdFJiUCGqWhJVB4fKRoRBbq4iZcOIYQhnfoHKcMxszV3GhfE9C8ZWMATRlMlOld8iTIotkThbNEy3MIF4nsC7hcOte7DQ",
			//   notification: {
			// 	title: 'Hello!',
			// 	body: 'This is a Firebase push notification.',
			// 	},
			// 	data: { // Optional: any additional data
			// 		key1: 'value1',
			// 		key2: 'value2',
			// 	},
			// };

			if (result) {
				// Send Notification
				if (findUser?.fcmToken) {
					const findViewer = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});
					const fullViewerName = findViewer?.firstName +' '+ findViewer?.lastName;

					const notificationToCreate = {
						userId: findUser.id,
						title: 'Notification!',
						body: `${fullViewerName} viewed your profile`,
						notificationType: 'viewProfile',
						data: {
							userId: `${req.decoded.id}`,
							roleId: `${findViewer.roleId}`,
							notificationType: 'viewProfile',
						},
						viewStatus: 0,
						status: 1,
						isDeleted: 0,
						createdAt: new Date(),
						updatedAt: new Date(),
					};

					const createNotification = await notificationsModel.create(notificationToCreate);

					if (createNotification) {
						const message = {
							token: findUser?.fcmToken,
							notification: {
								title: notificationToCreate.title,
								body: notificationToCreate.body,
							},
							data: {
								userId: `${notificationToCreate.data.userId}`,
								roleId: `${notificationToCreate.data.roleId}`,
								notificationId: `${createNotification.id}`,
								notificationType: notificationToCreate.data.notificationType,
							},
						};

						console.log('message=======', message);

						firebaseAdmin.messaging().send(message)
							.then((response) => {
								console.log('Successfully sent message:', response);
							})
							.catch((error) => {
								console.log('Error sending message:', error);
							});
					}
				}

				return res.status(200).json({status: true, message: 'Profile view activity added successfully'});
			} else {
				return res.status(403).json({status: false, message: 'Profile view activity not added!'});
			}
		} catch (error) {
			errorService.printError('User Service: viewProfileActivity', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get all activity news feeds list ******/
	async allActivityNewsFeedsList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findreportedNewsFeeds = await reportedNewsFeedsModel.findAll({where: {userId: req.decoded.id}, raw: true});
			let reportedNewsFeedsArr = [];
			if (findreportedNewsFeeds.length === 0) {
				reportedNewsFeedsArr = [];
			} else {
				reportedNewsFeedsArr = findreportedNewsFeeds.map((feeds) => feeds.feedId);
			}

			console.log('reportedNewsFeedsArr=======', reportedNewsFeedsArr);

			const {count, rows} = await newsFeedsModels.findAndCountAll({
				where: {
					id: {
						[Op.notIn]: reportedNewsFeedsArr,
					},
					status: 1,
					isDeleted: 0,
					isActivity: 1,
				},
				include: [{
					model: usersModel,
					as: 'user',
					attributes: ['profilePictureUrl', 'firstName', 'lastName', 'roleId'],
				}],
				order: [['id', 'DESC']],
				offset: req.body.offset,
				limit: req.body.limit,
				raw: true});

			const result = rows;
			const totalUsers = count;

			if (result) {
				// Fetch likes count for each feed
				const feedIds = result.map((feed) => feed.id);
				const likesCounts = await favouriteNewsFeedsModels.findAll({
					attributes: ['feedId', [sequelize.fn('COUNT', '*'), 'count']],
					where: {feedId: feedIds},
					group: ['feedId'],
					raw: true,
				});

				const checkUserLikes = await favouriteNewsFeedsModels.findAll({
					where: {feedId: feedIds, userId: req.decoded.id},
					raw: true,
				});

				// Map likes count to the result
				const resultWithLikesCount = await Promise.all(result.map(async (feed) => {
					const likesCount = likesCounts.find((item) => item.feedId === feed.id);
					const checkLike = checkUserLikes?.find((item) => item?.feedId === feed?.id);
					const findFollowing = await followersModel.findOne({where: {userId: feed?.userId, followedById: req.decoded.id}, raw: true});

					return {...feed, likesCount: likesCount ? likesCount.count : 0,
						isLiked: checkLike ? true:false,
						isFollowing: findFollowing ? 1:0,
						profilePictureUrl: feed['user.profilePictureUrl'],
						firstName: feed['user.firstName'],
						lastName: feed['user.lastName'],
						roleId: feed['user.roleId'],
					};
				}));
				return res.status(200).json({status: true, message: 'All activity news feeds list', data: {totalUsers: totalUsers, users: resultWithLikesCount}});
			} else {
				return res.status(403).json({status: false, message: 'All activity news feeds list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: allActivityNewsFeedsList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to upload user video reels ******/
	async uploadUserVideoReels(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const dataToCreate = {
				userId: req.decoded.id,
				videoReelsUrl: req.body.videoReelsUrl,
				content: req.body.content,
				latitude: req.body.latitude,
				longitude: req.body.longitude,
				address: req.body.address,
				visibility: req.body.visibility,
				views: 0,
				shareCounts: 0,
				status: 1,
				isDeleted: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
			};
			const result = await userVideoReelsModel.create(dataToCreate);
			if (result) {
				return res.status(200).json({status: true, message: 'Video reels uploaded successfully'});
			} else {
				return res.status(403).json({status: false, message: 'Video reels not uploaded!'});
			}
		} catch (error) {
			errorService.printError('User Service: uploadUserVideoReels', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get user video reels by id ******/
	async userVideoReelsById(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');


			const result = await userVideoReelsModel.findOne({where: {id: req.params.id, status: 1, isDeleted: 0}, raw: true});
			if (result) {
				const findUser = await usersModel.findOne({where: {id: result.userId, status: 1, isDeleted: 0}, raw: true});
				if (findUser.roleId == 3) {
					const checkFavoriteVideoReels = await likedVideoReelsModel.findOne({
						where: {userId: req.decoded.id, videoReelId: req.params.id},
						raw: true,
					});

					if (checkFavoriteVideoReels) {
						result.isLiked = 1;
					} else {
						result.isLiked = 0;
					}

					const findFollowing = await followersModel.findOne({where: {userId: result?.userId, followedById: req.decoded.id}, raw: true});

					const likesCounts = await likedVideoReelsModel.findAll({
						attributes: ['videoReelId', [sequelize.fn('COUNT', '*'), 'count']],
						where: {videoReelId: result.id},
						group: ['videoReelId'],
						raw: true,
					});

					result.roleId = findUser?.roleId;
					result.firstName = findUser?.firstName;
					result.lastName = findUser?.lastName;
					result.isFollowing = findFollowing ? 1:0;
					result.likesCount = likesCounts[0] ? likesCounts[0].count:0;

					return res.status(200).json({status: true, message: 'User video reel', data: result});
				} else if (findUser.roleId == 4) {
					const checkFavoriteVideoReels = await likedVideoReelsModel.findOne({
						where: {userId: req.decoded.id, videoReelId: req.params.id},
						raw: true,
					});

					if (checkFavoriteVideoReels) {
						result.isLiked = 1;
					} else {
						result.isLiked = 0;
					}

					const findFollowing = await followersModel.findOne({where: {userId: result?.userId, followedById: req.decoded.id}, raw: true});

					const likesCounts = await likedVideoReelsModel.findAll({
						attributes: ['videoReelId', [sequelize.fn('COUNT', '*'), 'count']],
						where: {videoReelId: result.id},
						group: ['videoReelId'],
						raw: true,
					});

					result.roleId = findUser?.roleId;
					result.firstName = findUser?.firstName;
					result.lastName = findUser?.lastName;
					result.isFollowing = findFollowing ? 1:0;
					result.likesCount = likesCounts[0] ? likesCounts[0].count:0;

					return res.status(200).json({status: true, message: 'User video reel', data: result});
				} else {
					return res.status(403).json({status: false, message: 'User video reel not found!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'User video reels list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: userVideoReelsListByUserId', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to add views on user video reels by id ******/
	async addViewsOnVideoReels(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await userVideoReelsModel.findOne({where: {id: req.params.id, status: 1, isDeleted: 0}, raw: true});
			if (result) {
				const totalViews = result ? result?.views : 0;
				const addView = totalViews + 1;
				const updateViews = await userVideoReelsModel.update({views: addView}, {where: {id: result.id}});
				if (updateViews) {
					return res.status(200).json({status: true, message: 'View added successfully'});
				} else {
					return res.status(403).json({status: false, message: 'View not added!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'User video reel not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: addViewsOnVideoReels', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to add share counts on user video reels by id ******/
	async addShareCountsOnVideoReels(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await userVideoReelsModel.findOne({where: {id: req.params.id, status: 1, isDeleted: 0}, raw: true});
			if (result) {
				const totalShareCounts = result ? result?.shareCounts : 0;
				const addShareCounts = totalShareCounts + 1;
				const updateShareCounts = await userVideoReelsModel.update({shareCounts: addShareCounts}, {where: {id: result.id}});
				if (updateShareCounts) {
					return res.status(200).json({status: true, message: 'Share Counts added successfully'});
				} else {
					return res.status(403).json({status: false, message: 'Share Counts not added!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'User video reel not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: addShareCountsOnVideoReels', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get following users video reels with filters ******/
	async usersVideoReelsWithFilters(userFilters, offset, limit) {
		try {
			console.log('usersVideoReelsWithFilters======================', userFilters, offset, limit);
			const {count, rows} = await userVideoReelsModel.findAndCountAll({
				where: userFilters,
				include: [{
					model: usersModel,
					as: 'user',
					attributes: ['profilePictureUrl', 'firstName', 'lastName', 'roleId'],
				}],
				order: [['id', 'DESC']],
				offset: offset,
				limit: limit,
				raw: true,
			});
			return {
				totalUsers: count,
				users: rows,
			};
		} catch (error) {
			errorService.printError('User Service: usersVideoReelsWithFilters', error);
			console.log('playersDetails error: ', error);
		}
	}

	/** ***** User Service: Method to get users video reels list by user id ******/
	async userVideoReelsListByUserId(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const userService = new UserService();

			const findReportedVideoReels = await reportedVideoReelsModel.findAll({where: {userId: req.decoded.id}, raw: true});
			let reportedVideoReelsArr = [];
			if (findReportedVideoReels.length === 0) {
				reportedVideoReelsArr = [];
			} else {
				reportedVideoReelsArr = findReportedVideoReels.map((reels) => reels.videoReelId);
			}

			console.log('reportedVideoReelsArr=======', reportedVideoReelsArr);

			const userFilters = {
				userId: req.body.userId,
				status: 1,
				isDeleted: 0,
				id: {
					[Op.notIn]: reportedVideoReelsArr,
				},
			};

			const result = await userService.usersVideoReelsWithFilters(userFilters, req.body.offset, req.body.limit);
			if (result) {
				const selectedResult = result.users;
				const usersCount = result.totalUsers;

				// Fetch likes count for each feed
				const videoReelIds = selectedResult.map((videoReel) => videoReel.id);
				const likesCounts = await likedVideoReelsModel.findAll({
					attributes: ['videoReelId', [sequelize.fn('COUNT', '*'), 'count']],
					where: {videoReelId: videoReelIds},
					group: ['videoReelId'],
					raw: true,
				});

				const checkUserLikes = await likedVideoReelsModel.findAll({
					where: {videoReelId: videoReelIds, userId: req.decoded.id},
					raw: true,
				});

				// Map likes count to the results
				const resultWithLikesCount = await Promise.all(selectedResult.map(async (videoReel) => {
					// const divisionLogo = await programTypesModels.findOne({
					// 	where: {name: videoReel['user.coachPersonalInformations.programs.division']},
					// 	raw: true,
					// });
					const findFollowing = await followersModel.findOne({where: {userId: videoReel?.userId, followedById: req.decoded.id}, raw: true});
					const likesCount = likesCounts.find((item) => item.videoReelId === videoReel.id);
					const checkLike = checkUserLikes?.find((item) => item?.videoReelId === videoReel?.id);
					return {...videoReel, likesCount: likesCount ? likesCount.count : 0,
						isLiked: checkLike ? true:false,
						profilePictureUrl: videoReel['user.profilePictureUrl'],
						firstName: videoReel['user.firstName'],
						lastName: videoReel['user.lastName'],
						roleId: videoReel['user.roleId'],
						isFollowing: findFollowing ? 1:0,
						// divisionLogo: divisionLogo ? divisionLogo?.logo:null,
						// colorCode: divisionLogo ? divisionLogo?.colorCode:null,
					};
				}));
				return res.status(200).json({status: true, message: 'User video reels list', data: {totalUsers: usersCount, users: resultWithLikesCount}});
			} else {
				return res.status(403).json({status: false, message: 'User video reels list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: userVideoReelsListByUserId', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get following users video reels with filters ******/
	async followingUsersVideoReelsWithFilters(userFilters, offset, limit) {
		try {
			console.log('videoReelsWithFilters======================', userFilters, offset, limit);
			const {count, rows} = await userVideoReelsModel.findAndCountAll({
				where: userFilters,
				include: [{
					model: usersModel,
					as: 'user',
					attributes: ['profilePictureUrl', 'firstName', 'lastName', 'roleId'],
				}],
				order: [['id', 'DESC']],
				offset: offset,
				limit: limit,
				raw: true,
			});
			return {
				totalUsers: count,
				users: rows,
			};
		} catch (error) {
			errorService.printError('User Service: followingUsersVideoReelsWithFilters', error);
			console.log('playersDetails error: ', error);
		}
	}

	/** ***** User Service: Method to get following users video reels list ******/
	async followingUsersVideoReelsList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const userService = new UserService();

			console.log('followingUsersVideoReelsList======================', req.body);

			const findUser = await followersModel.findAll({where: {followedById: req.decoded.id, status: 1, isDeleted: 0}, raw: true});
			let totalUserIds = [];
			if (findUser.length === 0) {
				totalUserIds = [];
			} else {
				totalUserIds = findUser.map((users) => users.userId);
			}

			if (req.body.roleId == 4) {
				// Define your filters with conditional logic
				const playerFilters = {
					roleId: 4,
					status: 1,
					isDeleted: 0,
					id: {
						[Op.in]: totalUserIds,
					},
				};

				if (req.body.firstName) {
					playerFilters.firstName = {
						[Op.like]: `%${req.body.firstName}%`,
					};
				}

				if (req.body.lastName) {
					playerFilters.lastName = {
						[Op.like]: `%${req.body.lastName}%`,
					};
				}

				const playerPersonalInformationsFilters = {};
				let playerPersonalInformationStatus = 0;

				if (req.body.position) {
					playerPersonalInformationsFilters.position = req.body.position;
					playerPersonalInformationStatus = 1;
				}
				if (req.body.height) {
					playerPersonalInformationsFilters.height = req.body.height;
					playerPersonalInformationStatus = 1;
				}
				if (req.body.gpaFrom && req.body.gpaTo) {
					playerPersonalInformationsFilters.gpa = {
						[Op.between]: [req.body.gpaFrom, req.body.gpaTo],
					};
					playerPersonalInformationStatus = 1;
				}
				if (req.body.year) {
					playerPersonalInformationsFilters.class = req.body.year;
					playerPersonalInformationStatus = 1;
				}

				const searchResult = await userService.searchPlayersWithFilters(playerFilters, playerPersonalInformationsFilters, playerPersonalInformationStatus, req.body.offset, req.body.limit);
				if (searchResult) {
					// Fetch likes count
					const usersArr = searchResult.users;
					const userIds = usersArr.map((users) => users.id);

					const findReportedVideoReels = await reportedVideoReelsModel.findAll({where: {userId: req.decoded.id}, raw: true});
					let reportedVideoReelsArr = [];
					if (findReportedVideoReels.length === 0) {
						reportedVideoReelsArr = [];
					} else {
						reportedVideoReelsArr = findUser.map((reels) => reels.videoReelId);
					}

					const userFilters = {
						status: 1,
						isDeleted: 0,
						userId: {
							[Op.in]: userIds,
						},
						id: {
							[Op.notIn]: reportedVideoReelsArr,
						},
					};

					const result = await userService.followingUsersVideoReelsWithFilters(userFilters, req.body.offset, req.body.limit);
					if (result) {
						const selectedResult = result.users;
						const usersCount = result.totalUsers;

						// Fetch likes count for each feed
						const videoReelIds = selectedResult.map((videoReel) => videoReel.id);
						const likesCounts = await likedVideoReelsModel.findAll({
							attributes: ['videoReelId', [sequelize.fn('COUNT', '*'), 'count']],
							where: {videoReelId: videoReelIds},
							group: ['videoReelId'],
							raw: true,
						});

						const checkUserLikes = await likedVideoReelsModel.findAll({
							where: {videoReelId: videoReelIds, userId: req.decoded.id},
							raw: true,
						});

						// Map likes count to the results
						const resultWithLikesCount = await Promise.all(selectedResult.map(async (videoReel) => {
							// const divisionLogo = await programTypesModels.findOne({
							// 	where: {name: videoReel['user.coachPersonalInformations.programs.division']},
							// 	raw: true,
							// });
							const findFollowing = await followersModel.findOne({where: {userId: videoReel?.userId, followedById: req.decoded.id}, raw: true});
							const likesCount = likesCounts.find((item) => item.videoReelId === videoReel.id);
							const checkLike = checkUserLikes?.find((item) => item?.videoReelId === videoReel?.id);
							return {...videoReel, likesCount: likesCount ? likesCount.count : 0,
								isLiked: checkLike ? true:false,
								profilePictureUrl: videoReel['user.profilePictureUrl'],
								firstName: videoReel['user.firstName'],
								lastName: videoReel['user.lastName'],
								roleId: videoReel['user.roleId'],
								isFollowing: findFollowing ? 1:0,
								// divisionLogo: divisionLogo ? divisionLogo?.logo:null,
								// colorCode: divisionLogo ? divisionLogo?.colorCode:null,
							};
						}));
						return res.status(200).json({status: true, message: 'Following users video reels list', data: {totalUsers: usersCount, users: resultWithLikesCount}});
					} else {
						return res.status(403).json({status: false, message: 'Following users video reels list not found!'});
					}
				} else {
					return res.status(403).json({status: false, message: 'Following users video reels list not found!'});
				}
			} else if (req.body.roleId == 3) {
				// Define your filters with conditional logic
				const coachFilters = {
					roleId: 3,
					status: 1,
					isDeleted: 0,
					id: {
						[Op.in]: totalUserIds,
					},
				};
				if (req.body.firstName) {
					coachFilters.firstName = {
						[Op.like]: `%${req.body.firstName}%`,
					};
				}

				if (req.body.lastName) {
					coachFilters.lastName = {
						[Op.like]: `%${req.body.lastName}%`,
					};
				}

				const coachPersonalInformationsFilters = {};
				let coachPersonalInformationStatus = 0;

				if (req.body.isKycApproved) {
					coachFilters.isKycApproved = req.body.isKycApproved;
					coachPersonalInformationStatus = 1;
				}

				// if (req.body.currentProgramId) {
				// 	coachPersonalInformationsFilters.currentProgramId = req.body.currentProgramId;
				// 	coachPersonalInformationStatus = 1;
				// }

				const searchResult = await userService.searchCoachesWithFilters(coachFilters, coachPersonalInformationsFilters, coachPersonalInformationStatus, req.body.offset, req.body.limit);
				if (searchResult) {
					// Fetch likes count
					const usersArr = searchResult.users;
					const userIds = usersArr.map((users) => users.id);

					const findReportedVideoReels = await reportedVideoReelsModel.findAll({where: {userId: req.decoded.id}, raw: true});
					let reportedVideoReelsArr = [];
					if (findReportedVideoReels.length === 0) {
						reportedVideoReelsArr = [];
					} else {
						reportedVideoReelsArr = findUser.map((reels) => reels.videoReelId);
					}

					const userFilters = {
						status: 1,
						isDeleted: 0,
						userId: {
							[Op.in]: userIds,
						},
						id: {
							[Op.notIn]: reportedVideoReelsArr,
						},
					};

					const result = await userService.followingUsersVideoReelsWithFilters(userFilters, req.body.offset, req.body.limit);
					if (result) {
						const selectedResult = result.users;
						const usersCount = result.totalUsers;

						// Fetch likes count for each feed
						const videoReelIds = selectedResult.map((videoReel) => videoReel.id);
						const likesCounts = await likedVideoReelsModel.findAll({
							attributes: ['videoReelId', [sequelize.fn('COUNT', '*'), 'count']],
							where: {videoReelId: videoReelIds},
							group: ['videoReelId'],
							raw: true,
						});

						const checkUserLikes = await likedVideoReelsModel.findAll({
							where: {videoReelId: videoReelIds, userId: req.decoded.id},
							raw: true,
						});

						// Map likes count to the results
						const resultWithLikesCount = await Promise.all(selectedResult.map(async (videoReel) => {
							// const divisionLogo = await programTypesModels.findOne({
							// 	where: {name: videoReel['user.coachPersonalInformations.programs.division']},
							// 	raw: true,
							// });
							const findFollowing = await followersModel.findOne({where: {userId: videoReel?.userId, followedById: req.decoded.id}, raw: true});
							const likesCount = likesCounts.find((item) => item.videoReelId === videoReel.id);
							const checkLike = checkUserLikes?.find((item) => item?.videoReelId === videoReel?.id);
							return {...videoReel, likesCount: likesCount ? likesCount.count : 0,
								isLiked: checkLike ? true:false,
								profilePictureUrl: videoReel['user.profilePictureUrl'],
								firstName: videoReel['user.firstName'],
								lastName: videoReel['user.lastName'],
								roleId: videoReel['user.roleId'],
								isFollowing: findFollowing ? 1:0,
								// divisionLogo: divisionLogo ? divisionLogo?.logo:null,
								// colorCode: divisionLogo ? divisionLogo?.colorCode:null,
							};
						}));
						return res.status(200).json({status: true, message: 'Following users video reels list', data: {totalUsers: usersCount, users: resultWithLikesCount}});
					} else {
						return res.status(403).json({status: false, message: 'Following users video reels list not found!'});
					}
				} else {
					return res.status(403).json({status: false, message: 'Following users video reels list not found!'});
				}
			} else {
				const findReportedVideoReels = await reportedVideoReelsModel.findAll({where: {userId: req.decoded.id}, raw: true});
				let reportedVideoReelsArr = [];
				if (findReportedVideoReels.length === 0) {
					reportedVideoReelsArr = [];
				} else {
					reportedVideoReelsArr = findUser.map((reels) => reels.videoReelId);
				}

				// const findUser = await followersModel.findAll({where: {followedById: req.decoded.id, status: 1, isDeleted: 0}, raw: true});
				// let totalUserIds = [];
				// if (findUser.length === 0) {
				// 	totalUserIds = [];
				// } else {
				// 	totalUserIds = findUser.map((users) => users.userId);
				// }

				const userFilters = {
					status: 1,
					isDeleted: 0,
					userId: {
						[Op.in]: totalUserIds,
					},
					id: {
						[Op.notIn]: reportedVideoReelsArr,
					},
				};

				const result = await userService.followingUsersVideoReelsWithFilters(userFilters, req.body.offset, req.body.limit);
				if (result) {
					const selectedResult = result.users;
					const usersCount = result.totalUsers;

					// Fetch likes count for each feed
					const videoReelIds = selectedResult.map((videoReel) => videoReel.id);
					const likesCounts = await likedVideoReelsModel.findAll({
						attributes: ['videoReelId', [sequelize.fn('COUNT', '*'), 'count']],
						where: {videoReelId: videoReelIds},
						group: ['videoReelId'],
						raw: true,
					});

					const checkUserLikes = await likedVideoReelsModel.findAll({
						where: {videoReelId: videoReelIds, userId: req.decoded.id},
						raw: true,
					});

					// Map likes count to the results
					const resultWithLikesCount = await Promise.all(selectedResult.map(async (videoReel) => {
						// const divisionLogo = await programTypesModels.findOne({
						// 	where: {name: videoReel['user.coachPersonalInformations.programs.division']},
						// 	raw: true,
						// });
						const findFollowing = await followersModel.findOne({where: {userId: videoReel?.userId, followedById: req.decoded.id}, raw: true});
						const likesCount = likesCounts.find((item) => item.videoReelId === videoReel.id);
						const checkLike = checkUserLikes?.find((item) => item?.videoReelId === videoReel?.id);
						return {...videoReel, likesCount: likesCount ? likesCount.count : 0,
							isLiked: checkLike ? true:false,
							profilePictureUrl: videoReel['user.profilePictureUrl'],
							firstName: videoReel['user.firstName'],
							lastName: videoReel['user.lastName'],
							roleId: videoReel['user.roleId'],
							isFollowing: findFollowing ? 1:0,
							// divisionLogo: divisionLogo ? divisionLogo?.logo:null,
							// colorCode: divisionLogo ? divisionLogo?.colorCode:null,
						};
					}));
					return res.status(200).json({status: true, message: 'Following users video reels list', data: {totalUsers: usersCount, users: resultWithLikesCount}});
				} else {
					return res.status(403).json({status: false, message: 'Following users video reels list not found!'});
				}
			}
		} catch (error) {
			errorService.printError('User Service: followingUsersVideoReelsList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get trending video reels with filters ******/
	async trendingVideoReelsWithFilters(userFilters, offset, limit) {
		try {
			console.log('trendingVideoReelsWithFilters======================', userFilters, offset, limit);
			const {count, rows} = await userVideoReelsModel.findAndCountAll({
				where: userFilters,
				include: [{
					model: usersModel,
					as: 'user',
					attributes: ['profilePictureUrl', 'firstName', 'lastName', 'roleId'],
				}],
				order: [['views', 'DESC']],
				offset: offset,
				limit: limit,
				raw: true,
			});
			return {
				totalUsers: count,
				users: rows,
			};
		} catch (error) {
			errorService.printError('User Service: trendingVideoReelsWithFilters', error);
			console.log('playersDetails error: ', error);
		}
	}

	/** ***** User Service: Method to get trending video reels list ******/
	async trendingVideoReelsList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const userService = new UserService();

			console.log('trendingVideoReelsList======================', req.body);

			if (req.body.roleId == 4) {
				// Define your filters with conditional logic
				const playerFilters = {
					roleId: 4,
					status: 1,
					isDeleted: 0,
				};

				if (req.body.firstName) {
					playerFilters.firstName = {
						[Op.like]: `%${req.body.firstName}%`,
					};
				}

				if (req.body.lastName) {
					playerFilters.lastName = {
						[Op.like]: `%${req.body.lastName}%`,
					};
				}

				const playerPersonalInformationsFilters = {};
				let playerPersonalInformationStatus = 0;

				if (req.body.position) {
					playerPersonalInformationsFilters.position = req.body.position;
					playerPersonalInformationStatus = 1;
				}
				if (req.body.height) {
					playerPersonalInformationsFilters.height = req.body.height;
					playerPersonalInformationStatus = 1;
				}
				if (req.body.gpaFrom && req.body.gpaTo) {
					playerPersonalInformationsFilters.gpa = {
						[Op.between]: [req.body.gpaFrom, req.body.gpaTo],
					};
					playerPersonalInformationStatus = 1;
				}
				if (req.body.year) {
					playerPersonalInformationsFilters.class = req.body.year;
					playerPersonalInformationStatus = 1;
				}

				const searchResult = await userService.searchPlayersWithFilters(playerFilters, playerPersonalInformationsFilters, playerPersonalInformationStatus, req.body.offset, req.body.limit);
				if (searchResult) {
					// Fetch likes count
					const usersArr = searchResult.users;
					const userIds = usersArr.map((users) => users.id);

					const findReportedVideoReels = await reportedVideoReelsModel.findAll({where: {userId: req.decoded.id}, raw: true});
					let reportedVideoReelsArr = [];
					if (findReportedVideoReels.length === 0) {
						reportedVideoReelsArr = [];
					} else {
						reportedVideoReelsArr = findReportedVideoReels.map((reels) => reels.videoReelId);
					}

					console.log('reportedVideoReelsArr=======', reportedVideoReelsArr);

					const userFilters = {
						status: 1,
						isDeleted: 0,
						userId: {
							[Op.in]: userIds,
						},
						id: {
							[Op.notIn]: reportedVideoReelsArr,
						},
					};

					const result = await userService.trendingVideoReelsWithFilters(userFilters, req.body.offset, req.body.limit);
					if (result) {
						const selectedResult = result.users;
						const usersCount = result.totalUsers;

						// Fetch likes count for each feed
						const videoReelIds = selectedResult.map((videoReel) => videoReel.id);
						const likesCounts = await likedVideoReelsModel.findAll({
							attributes: ['videoReelId', [sequelize.fn('COUNT', '*'), 'count']],
							where: {videoReelId: videoReelIds},
							group: ['videoReelId'],
							raw: true,
						});

						const checkUserLikes = await likedVideoReelsModel.findAll({
							where: {videoReelId: videoReelIds, userId: req.decoded.id},
							raw: true,
						});

						// Map likes count to the results
						const resultWithLikesCount = await Promise.all(selectedResult.map(async (videoReel) => {
							// const divisionLogo = await programTypesModels.findOne({
							// 	where: {name: videoReel['user.coachPersonalInformations.programs.division']},
							// 	raw: true,
							// });

							const findFollowing = await followersModel.findOne({where: {userId: videoReel?.userId, followedById: req.decoded.id}, raw: true});
							const likesCount = likesCounts.find((item) => item.videoReelId === videoReel.id);
							const checkLike = checkUserLikes?.find((item) => item?.videoReelId === videoReel?.id);
							return {...videoReel, likesCount: likesCount ? likesCount.count : 0,
								isLiked: checkLike ? true:false,
								profilePictureUrl: videoReel['user.profilePictureUrl'],
								firstName: videoReel['user.firstName'],
								lastName: videoReel['user.lastName'],
								roleId: videoReel['user.roleId'],
								isFollowing: findFollowing ? 1:0,
								// divisionLogo: divisionLogo ? divisionLogo?.logo:null,
								// colorCode: divisionLogo ? divisionLogo?.colorCode:null,
							};
						}));
						return res.status(200).json({status: true, message: 'Trending video reels list', data: {totalUsers: usersCount, users: resultWithLikesCount}});
					} else {
						return res.status(403).json({status: false, message: 'Trending video reels list not found!'});
					}
				} else {
					return res.status(403).json({status: false, message: 'Trending video reels list not found!'});
				}
			} else if (req.body.roleId == 3) {
				// Define your filters with conditional logic
				const coachFilters = {
					roleId: 3,
					status: 1,
					isDeleted: 0,
				};
				if (req.body.firstName) {
					coachFilters.firstName = {
						[Op.like]: `%${req.body.firstName}%`,
					};
				}

				if (req.body.lastName) {
					coachFilters.lastName = {
						[Op.like]: `%${req.body.lastName}%`,
					};
				}

				const coachPersonalInformationsFilters = {};
				let coachPersonalInformationStatus = 0;

				if (req.body.isKycApproved) {
					coachFilters.isKycApproved = req.body.isKycApproved;
					coachPersonalInformationStatus = 1;
				}

				// if (req.body.currentProgramId) {
				// 	coachPersonalInformationsFilters.currentProgramId = req.body.currentProgramId;
				// 	coachPersonalInformationStatus = 1;
				// }

				const searchResult = await userService.searchCoachesWithFilters(coachFilters, coachPersonalInformationsFilters, coachPersonalInformationStatus, req.body.offset, req.body.limit);
				if (searchResult) {
					// Fetch likes count
					const usersArr = searchResult.users;
					const userIds = usersArr.map((users) => users.id);

					const findReportedVideoReels = await reportedVideoReelsModel.findAll({where: {userId: req.decoded.id}, raw: true});
					let reportedVideoReelsArr = [];
					if (findReportedVideoReels.length === 0) {
						reportedVideoReelsArr = [];
					} else {
						reportedVideoReelsArr = findReportedVideoReels.map((reels) => reels.videoReelId);
					}

					console.log('reportedVideoReelsArr=======', reportedVideoReelsArr);

					const userFilters = {
						status: 1,
						isDeleted: 0,
						userId: {
							[Op.in]: userIds,
						},
						id: {
							[Op.notIn]: reportedVideoReelsArr,
						},
					};

					const result = await userService.trendingVideoReelsWithFilters(userFilters, req.body.offset, req.body.limit);
					if (result) {
						const selectedResult = result.users;
						const usersCount = result.totalUsers;

						// Fetch likes count for each feed
						const videoReelIds = selectedResult.map((videoReel) => videoReel.id);
						const likesCounts = await likedVideoReelsModel.findAll({
							attributes: ['videoReelId', [sequelize.fn('COUNT', '*'), 'count']],
							where: {videoReelId: videoReelIds},
							group: ['videoReelId'],
							raw: true,
						});

						const checkUserLikes = await likedVideoReelsModel.findAll({
							where: {videoReelId: videoReelIds, userId: req.decoded.id},
							raw: true,
						});

						// Map likes count to the results
						const resultWithLikesCount = await Promise.all(selectedResult.map(async (videoReel) => {
							// const divisionLogo = await programTypesModels.findOne({
							// 	where: {name: videoReel['user.coachPersonalInformations.programs.division']},
							// 	raw: true,
							// });

							const findFollowing = await followersModel.findOne({where: {userId: videoReel?.userId, followedById: req.decoded.id}, raw: true});
							const likesCount = likesCounts.find((item) => item.videoReelId === videoReel.id);
							const checkLike = checkUserLikes?.find((item) => item?.videoReelId === videoReel?.id);
							return {...videoReel, likesCount: likesCount ? likesCount.count : 0,
								isLiked: checkLike ? true:false,
								profilePictureUrl: videoReel['user.profilePictureUrl'],
								firstName: videoReel['user.firstName'],
								lastName: videoReel['user.lastName'],
								roleId: videoReel['user.roleId'],
								isFollowing: findFollowing ? 1:0,
								// divisionLogo: divisionLogo ? divisionLogo?.logo:null,
								// colorCode: divisionLogo ? divisionLogo?.colorCode:null,
							};
						}));
						return res.status(200).json({status: true, message: 'Trending video reels list', data: {totalUsers: usersCount, users: resultWithLikesCount}});
					} else {
						return res.status(403).json({status: false, message: 'Trending video reels list not found!'});
					}
				} else {
					return res.status(403).json({status: false, message: 'Trending video reels list not found!'});
				}
			} else {
				const findReportedVideoReels = await reportedVideoReelsModel.findAll({where: {userId: req.decoded.id}, raw: true});
				let reportedVideoReelsArr = [];
				if (findReportedVideoReels.length === 0) {
					reportedVideoReelsArr = [];
				} else {
					reportedVideoReelsArr = findReportedVideoReels.map((reels) => reels.videoReelId);
				}

				console.log('reportedVideoReelsArr=======', reportedVideoReelsArr);

				const userFilters = {
					status: 1,
					isDeleted: 0,
					id: {
						[Op.notIn]: reportedVideoReelsArr,
					},
				};

				const result = await userService.trendingVideoReelsWithFilters(userFilters, req.body.offset, req.body.limit);
				if (result) {
					const selectedResult = result.users;
					const usersCount = result.totalUsers;

					// Fetch likes count for each feed
					const videoReelIds = selectedResult.map((videoReel) => videoReel.id);
					const likesCounts = await likedVideoReelsModel.findAll({
						attributes: ['videoReelId', [sequelize.fn('COUNT', '*'), 'count']],
						where: {videoReelId: videoReelIds},
						group: ['videoReelId'],
						raw: true,
					});

					const checkUserLikes = await likedVideoReelsModel.findAll({
						where: {videoReelId: videoReelIds, userId: req.decoded.id},
						raw: true,
					});

					// Map likes count to the results
					const resultWithLikesCount = await Promise.all(selectedResult.map(async (videoReel) => {
						// const divisionLogo = await programTypesModels.findOne({
						// 	where: {name: videoReel['user.coachPersonalInformations.programs.division']},
						// 	raw: true,
						// });

						const findFollowing = await followersModel.findOne({where: {userId: videoReel?.userId, followedById: req.decoded.id}, raw: true});
						const likesCount = likesCounts.find((item) => item.videoReelId === videoReel.id);
						const checkLike = checkUserLikes?.find((item) => item?.videoReelId === videoReel?.id);
						return {...videoReel, likesCount: likesCount ? likesCount.count : 0,
							isLiked: checkLike ? true:false,
							profilePictureUrl: videoReel['user.profilePictureUrl'],
							firstName: videoReel['user.firstName'],
							lastName: videoReel['user.lastName'],
							roleId: videoReel['user.roleId'],
							isFollowing: findFollowing ? 1:0,
							// divisionLogo: divisionLogo ? divisionLogo?.logo:null,
							// colorCode: divisionLogo ? divisionLogo?.colorCode:null,
						};
					}));
					return res.status(200).json({status: true, message: 'Trending video reels list', data: {totalUsers: usersCount, users: resultWithLikesCount}});
				} else {
					return res.status(403).json({status: false, message: 'Trending video reels list not found!'});
				}
			}
		} catch (error) {
			errorService.printError('User Service: trendingVideoReelsList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to like or unlike video reels ******/
	async likeOrUnlikeVideoReels(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			if (req.body.isLiked == 0) {
				const result = await likedVideoReelsModel.destroy({where: {userId: req.decoded.id, videoReelId: req.body.videoReelId}});
				if (result) {
					return res.status(200).json({status: true, message: 'Unliked'});
				} else {
					return res.status(403).json({status: false, message: 'Unlike failed!'});
				}
			} else {
				const findLikedVideoReels = await likedVideoReelsModel.findOne({where: {userId: req.decoded.id, videoReelId: req.body.videoReelId}, raw: true});
				if (findLikedVideoReels) {
					return res.status(200).json({status: true, message: 'Liked'});
				} else {
					const dataToCreate = {
						userId: req.decoded.id,
						videoReelId: req.body.videoReelId,
						status: 1,
						isDeleted: 0,
						createdAt: new Date(),
						updatedAt: new Date(),
					};
					const result = await likedVideoReelsModel.create(dataToCreate);
					if (result) {
						return res.status(200).json({status: true, message: 'Liked'});
					} else {
						return res.status(403).json({status: false, message: 'Unable to like!'});
					}
				}
			}
		} catch (error) {
			errorService.printError('User Service: likeOrUnlikeVideoReels', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to report video reels ******/
	async reportVideoReels(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findreportedVideoReels = await reportedVideoReelsModel.findOne({where: {userId: req.decoded.id, videoReelId: req.body.videoReelId}, raw: true});
			if (findreportedVideoReels) {
				return res.status(200).json({status: true, message: 'Reel reported successfully'});
			} else {
				const dataToCreate = {
					userId: req.decoded.id,
					videoReelId: req.body.videoReelId,
					reason: req.body.reason,
					status: 1,
					isDeleted: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				const result = await reportedVideoReelsModel.create(dataToCreate);
				if (result) {
					return res.status(200).json({status: true, message: 'Reel reported successfully'});
				} else {
					return res.status(403).json({status: false, message: 'Reel not reported!'});
				}
			}
		} catch (error) {
			errorService.printError('User Service: reportVideoReels', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to update video reels ******/
	async updateUserVideoReels(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await userVideoReelsModel.findOne({where: {userId: req.decoded.id, id: req.params.id, status: 1, isDeleted: 0}, raw: true});
			if (result) {
				const dataToUpdate = {
					content: req.body?.content,
					latitude: req.body?.latitude,
					longitude: req.body?.longitude,
					address: req.body?.address,
					visibility: req.body.visibility,
					updatedAt: new Date(),
				};
				const updateViews = await userVideoReelsModel.update(dataToUpdate, {where: {id: result.id}});
				if (updateViews) {
					return res.status(200).json({status: true, message: 'Video reel deleted successfully'});
				} else {
					return res.status(403).json({status: false, message: 'Video reel not deleted!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'User video reel not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: updateUserVideoReels', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to delete video reels ******/
	async deleteVideoReels(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await userVideoReelsModel.findOne({where: {userId: req.decoded.id, id: req.body.id}, raw: true});
			if (result) {
				const dataToUpdate = {
					status: 0,
					isDeleted: 1,
					updatedAt: new Date(),
				};
				const updateViews = await userVideoReelsModel.update(dataToUpdate, {where: {id: result.id}});
				if (updateViews) {
					return res.status(200).json({status: true, message: 'Video reel deleted successfully'});
				} else {
					return res.status(403).json({status: false, message: 'Video reel not deleted!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'User video reel not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: deleteVideoReels', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to report news feeds ******/
	async reportNewsFeeds(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findreportedNewsFeeds = await reportedNewsFeedsModel.findOne({where: {userId: req.decoded.id, feedId: req.body.feedId}, raw: true});
			if (findreportedNewsFeeds) {
				return res.status(200).json({status: true, message: 'News feed reported successfully'});
			} else {
				const dataToCreate = {
					userId: req.decoded.id,
					feedId: req.body.feedId,
					reason: req.body.reason,
					status: 1,
					isDeleted: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				const result = await reportedNewsFeedsModel.create(dataToCreate);
				if (result) {
					return res.status(200).json({status: true, message: 'News feed reported successfully'});
				} else {
					return res.status(403).json({status: false, message: 'News feed not reported!'});
				}
			}
		} catch (error) {
			errorService.printError('User Service: reportNewsFeeds', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to request for user account deletion ******/
	async requestUserAccountDeletion(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findUser = await usersModel.findOne({where: {id: req.decoded.id, status: 1, isDeleted: 0}, raw: true});
			if (findUser) {
				const dataToCreate = {
					userId: req.decoded.id,
					reason: req.body.reason,
					requestStatus: 'Pending',
					status: 1,
					isDeleted: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				const result = await accountDeletionRequestsModel.create(dataToCreate);
				if (result) {
					return res.status(200).json({status: true, message: 'We have received your request. Please allow us 5-7 days to review your account deletion request.'});
				} else {
					return res.status(403).json({status: false, message: 'Account deletion request not sent!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'Account deletion request not sent!'});
			}
		} catch (error) {
			errorService.printError('User Service: requestUserAccountDeletion', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get notifications list ******/
	async notificationsList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await notificationsModel.findAll({
				where: {
					userId: req.decoded.id,
					status: 1,
					isDeleted: 0,
				},
				order: [
					['viewStatus', 'ASC'],
					['updatedAt', 'DESC'],
				],
				offset: req.body.offset,
				limit: req.body.limit,
				raw: true,
			});

			if (result) {
				return res.status(200).json({status: true, message: 'Notifications list', data: result});
			} else {
				return res.status(403).json({status: false, message: 'Notifications list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: notificationsList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to mark notifications as read ******/
	async markNotificationsAsRead(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await notificationsModel.update({viewStatus: 1}, {where: {id: req.body.notificationId, userId: req.decoded.id}});
			if (result) {
				return res.status(200).json({status: true, message: 'Notification marked as read'});
			} else {
				return res.status(403).json({status: false, message: 'Notification not marked as read!'});
			}
		} catch (error) {
			errorService.printError('User Service: markNotificationsAsRead', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	// /** ***** User Service: Method to get deep link ******/
	// deepLink(req, res, next) {
	// 	// let device;
	// 	// const deviceType = req.headers['user-agent'];
	// 	// if (deviceType.includes('Android')) {
	// 	// 	device = 'android';
	// 	// } else {
	// 	// 	device = 'ios';
	// 	// }
	// 	// const dataToSend = {
	// 	// 	deviceType: device,
	// 	// 	inviteCode: req.params.code,
	// 	// };
	// 	// res.render('deeplink', {data: dataToSend});

	// 	const userId = req.params.userId;
  	// 	const userAgent = req.headers['user-agent'].toLowerCase();

	// 	console.log(userId, "userAgent=============", userAgent)

	// 	if (userAgent.includes('android')) {
	// 		// Android deep link
	// 		// res.redirect(`your-android-scheme://profile/${userId}`);
	// 		res.redirect(`${commonConfig.ANDROID_URL}://profile/${userId}`);

	// 	} else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
	// 		// iOS deep link
	// 		res.redirect(`${commonConfig.IOS_URL}://profile/${userId}`);
	// 	} else {
	// 		// Web fallback
	// 		res.redirect(`${commonConfig.WEB_URL}/user/profile/${userId}`);
	// 	}
	// }

	/** ***** User Service: Method to get user profiles deep link ******/
	async profileDeepLink(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			console.log(req.params.userId, 'profileDeepLink====================', req.headers['user-agent']);
			let device;
			const deviceType = req.headers['user-agent'].toLowerCase();
			if (deviceType.includes('android')) {
				device = 'android';
			} else {
				device = 'ios';
			}
			const dataToSend = {
				deviceType: device,
				userId: req.params.userId,
			};

			console.log(deviceType, 'profileDeepLink dataToSend====================', dataToSend);
			res.render('profileDeepLink', {data: dataToSend});
		} catch (error) {
			errorService.printError('User Service: profileDeepLink', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get user videos deep link ******/
	async videosDeepLink(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			console.log(req.params.videoReelId, 'videosDeepLink====================', req.headers['user-agent']);
			let device;
			const deviceType = req.headers['user-agent'].toLowerCase();
			if (deviceType.includes('android')) {
				device = 'android';
			} else {
				device = 'ios';
			}
			const dataToSend = {
				deviceType: device,
				videoReelId: req.params.videoReelId,
			};

			console.log(deviceType, 'dataToSend====================', dataToSend);
			res.render('videosDeepLink', {data: dataToSend});
		} catch (error) {
			errorService.printError('User Service: videosDeepLink', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get not following players list ******/
	async notFollowingPlayers(playerFilters, offset, limit) {
		try {
			console.log('notFollowingPlayers======================', playerFilters, offset, limit);
			const {count, rows} = await usersModel.findAndCountAll({
				attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
				where: playerFilters,
				include: [{
					model: playerPersonalInformationsModels,
					as: 'playerPersonalInformations',
					required: false,
				},
				{
					model: playerStatsModels,
					as: 'playerStats',
					required: false,
				},
				],
				order: sequelize.random(),
				offset: offset,
				limit: limit,
				raw: true,
			});
			return {
				totalUsers: count,
				users: rows,
			};
		} catch (error) {
			errorService.printError('User Service: notFollowingPlayers', error);
			console.log('notFollowingPlayers error: ', error);
		}
	}

	/** ***** User Service: Method to get coach match styles ******/
	async notFollowingCoaches(coachFilters, offset, limit) {
		try {
			console.log('notFollowingCoaches======================', coachFilters, offset, limit);
			const {count, rows} = await usersModel.findAndCountAll({
				attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
				where: coachFilters,
				include: [{
					model: coachPersonalInformationsModels,
					as: 'coachPersonalInformations',
					required: false,
					include: [{
						model: schoolsModel,
						as: 'programs',
						required: false,
					}],
				},
				{
					model: coachCoachingDetailsModels,
					as: 'coachCoachingDetails',
					required: false,
				},
				],
				order: sequelize.random(),
				offset: offset,
				limit: limit,
				raw: true,
			});
			return {
				totalUsers: count,
				users: rows,
			};
		} catch (error) {
			errorService.printError('User Service: notFollowingCoaches', error);
			console.log('notFollowingCoaches error: ', error);
		}
	}

	/** ***** User Service: Method to get not following users list by coach ******/
	async notFollowingListByCoachId(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');
			const userService = new UserService();

			const checkUser = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});
			if (checkUser?.roleId == 3) {
				console.log('coach followers===============');

				const findFollowings = await followersModel.findAll({where: {followedById: req.decoded.id, status: 1, isDeleted: 0}, raw: true});
				let totalPlayerIds = [];
				if (findFollowings.length === 0) {
					totalPlayerIds = [];
				} else {
					totalPlayerIds = findFollowings.map((players) => players.userId);
				}
				console.log('totalPlayerIds===========', totalPlayerIds);

				// Define your filters with conditional logic
				const playerFilters = {
					roleId: 4,
					status: 1,
					isDeleted: 0,
					id: {
						[Op.notIn]: totalPlayerIds,
					},
				};

				const result = await userService.notFollowingPlayers(playerFilters, req.body.offset, req.body.limit);
				if (result) {
					// Fetch likes count
					const usersArr = result.users;
					const userIds = usersArr.map((users) => users.id);

					const checkFavoriteUsers = await favouritePlayersCoachesModels.findAll({
						where: {playerOrCoachId: userIds, userId: req.decoded.id},
						raw: true,
					});

					// Map likes count to the result
					const resultWithLikesCount = await Promise.all(usersArr.map(async (user) => {
						const findPhotos = await userPhotosModel.findAll({
							where: {
								userId: user?.id,
								status: 1,
								isDeleted: 0,
							},
							order: [['id', 'DESC']],
            				limit: 3,
							raw: true,
						});

						const findVideos = await userVideoReelsModel.findAll({
							where: {
								userId: user?.id,
								status: 1,
								isDeleted: 0,
							},
							order: [['id', 'DESC']],
            				limit: 3,
							raw: true,
						});

						const findFollowing = await followersModel.findOne({where: {userId: user?.id, followedById: req.decoded.id}, raw: true});

						const checkFavourite = checkFavoriteUsers?.find((item) => item?.playerOrCoachId === user?.id);
						return {...user,
							photos: findPhotos,
							videos: findVideos,
							isFavourite: checkFavourite ? true:false,
							isFollowing: findFollowing ? 1:0,
						};
					}));

					const finalData = {
						totalUsers: result.totalUsers,
						users: resultWithLikesCount,
					};

					return res.status(200).json({status: true, message: 'Find players list', data: finalData});
				} else {
					return res.status(403).json({status: false, message: 'Find players list not found!'});
				}
			} else {
				console.log('No role id found===============');
				return res.status(403).json({status: false, message: 'Something went wrong please contact support team!'});
			}
		} catch (error) {
			errorService.printError('User Service: notFollowingListByCoachId', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get not following usera list by player id ******/
	async notFollowingListByPlayerId(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');
			const userService = new UserService();

			const checkUser = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});

			if (checkUser.roleId == 4) {
				console.log('player followers===============');

				const findFollowings = await followersModel.findAll({where: {followedById: req.decoded.id, status: 1, isDeleted: 0}, raw: true});
				let totalCoachIds = [];
				if (findFollowings.length === 0) {
					totalCoachIds = [];
				} else {
					totalCoachIds = findFollowings.map((coaches) => coaches.userId);
				}
				console.log('totalCoachIds===========', totalCoachIds);

				// Define your filters with conditional logic
				const coachFilters = {
					roleId: 3,
					status: 1,
					isDeleted: 0,
					id: {
						[Op.notIn]: totalCoachIds,
					},
				};

				const result = await userService.notFollowingCoaches(coachFilters, req.body.offset, req.body.limit);
				if (result) {
					// Fetch likes count
					const usersArr = result.users;
					const userIds = usersArr.map((users) => users.id);

					const checkFavoriteUsers = await favouritePlayersCoachesModels.findAll({
						where: {playerOrCoachId: userIds, userId: req.decoded.id},
						raw: true,
					});

					// Map likes count to the result
					const resultWithLikesCount = await Promise.all(usersArr.map(async (user) => {
						const divisionLogo = await programTypesModels.findOne({
							where: {name: user['coachPersonalInformations.programs.division']},
							raw: true,
						});

						const findPhotos = await userPhotosModel.findAll({
							where: {
								userId: user?.id,
								status: 1,
								isDeleted: 0,
							},
							order: [['id', 'DESC']],
            				limit: 3,
							raw: true,
						});

						const findVideos = await userVideoReelsModel.findAll({
							where: {
								userId: user?.id,
								status: 1,
								isDeleted: 0,
							},
							order: [['id', 'DESC']],
            				limit: 3,
							raw: true,
						});

						const findFollowing = await followersModel.findOne({where: {userId: user?.id, followedById: req.decoded.id}, raw: true});

						const checkFavourite = checkFavoriteUsers?.find((item) => item?.playerOrCoachId === user?.id);
						return {...user,
							photos: findPhotos,
							videos: findVideos,
							isFavourite: checkFavourite ? true:false,
							isFollowing: findFollowing ? 1:0,
							divisionLogo: divisionLogo ? divisionLogo?.logo:null,
							colorCode: divisionLogo ? divisionLogo?.colorCode:null,
						};
					}));

					const finalData = {
						totalUsers: result.totalUsers,
						users: resultWithLikesCount,
					};

					return res.status(200).json({status: true, message: 'Find coaches list', data: finalData});
				} else {
					return res.status(403).json({status: false, message: 'Find coaches list not found!'});
				}
			} else {
				console.log('No role id found===============');
				return res.status(403).json({status: false, message: 'Something went wrong please contact support team!'});
			}
		} catch (error) {
			errorService.printError('User Service: notFollowingListByPlayerId', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get all players rosters request list ******/
	async allPlayersRosterRequestList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findcoachPersonalInformations = await coachPersonalInformationsModels.findOne({where: {userId: req.decoded.id}, raw: true});

			if (findcoachPersonalInformations) {
				const result = await offersModel.findAll({
					where: {
						coachId: req.decoded.id,
						programId: findcoachPersonalInformations.currentProgramId,
						requestStatus: 'Requested',
					},
					include: [{
						model: usersModel,
						as: 'users',
						required: true,
						attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
					},
					{
						model: playerPersonalInformationsModels,
						as: 'playerPersonalInformations',
						required: false,
					},
					{
						model: playerStatsModels,
						as: 'playerStats',
						required: false,
					}],
					raw: true});
				if (result) {
					return res.status(200).json({status: true, message: 'All players roster request list', data: result});
				} else {
					return res.status(403).json({status: false, message: 'All players roster request list not found!'});
				}
			} else {
				return res.status(403).json({status: false, message: 'Please first select the current program in profile data under settings!'});
			}
		} catch (error) {
			errorService.printError('User Service: allPlayersRosterRequestList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to search players ******/
	async searchPlayersForGuestUser(playerFilters, offset, limit) {
		try {
			console.log('searchPlayersForGuestUser======================', playerFilters, offset, limit);
			const {count, rows} = await usersModel.findAndCountAll({
				attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
				where: playerFilters,
				include: [{
					model: playerPersonalInformationsModels,
					as: 'playerPersonalInformations',
					// where: playerPersonalInformationsFilters,
					required: false,
				},
				{
					model: playerStatsModels,
					as: 'playerStats',
					required: false,
				}],
				offset: offset,
				limit: limit,
				raw: true,
			});

			return {
				totalUsers: count,
				users: rows,
			};
			// }
		} catch (error) {
			errorService.printError('User Service: searchPlayersForGuestUser', error);
			console.log('searchPlayersForGuestUser error: ', error);
		}
	}

	/** ***** User Service: Method to search coach for guest users ******/
	async searchCoachesForGuestUser(coachFilters, offset, limit) {
		try {
			console.log('searchCoachesForGuestUser======================', coachFilters, offset, limit);
			const {count, rows} = await usersModel.findAndCountAll({
				attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
				where: coachFilters,
				include: [{
					model: coachPersonalInformationsModels,
					as: 'coachPersonalInformations',
					// where: coachPersonalInformationsFilters,
					required: false,
					include: [{
						model: schoolsModel,
						as: 'programs',
						required: false,
					}],
				},
				{
					model: coachCoachingDetailsModels,
					as: 'coachCoachingDetails',
					required: false,
				}],
				offset: offset,
				limit: limit,
				raw: true,
			});
			return {
				totalUsers: count,
				users: rows,
			};
			// }
		} catch (error) {
			errorService.printError('User Service: searchCoachesForGuestUser', error);
			console.log('searchCoachesForGuestUser error: ', error);
		}
	}

	/** ***** User Service: Method to search users by role id ******/
	async searchUsersByRoleId(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const userService = new UserService();

			if (req.body.roleId == 4) {
				console.log('searchPlayers======================', req.body);

				// Define your filters with conditional logic
				const playerFilters = {
					roleId: 4,
					isVerified: 1,
					status: 1,
					isDeleted: 0,
				};

				// if (req.body.name) {
				// 	playerFilters.firstname = {
				// 		[Op.like]: `%${req.body.name}%`,
				// 	};
				// }

				// const playerPersonalInformationsFilters = {};
				// let playerPersonalInformationStatus = 0;

				// if (req.body.position) {
				// 	playerPersonalInformationsFilters.position = req.body.position;
				// 	playerPersonalInformationStatus = 1;
				// }
				// if (req.body.height) {
				// 	playerPersonalInformationsFilters.height = req.body.height;
				// 	playerPersonalInformationStatus = 1;
				// }
				// if (req.body.gpaFrom && req.body.gpaTo) {
				// 	playerPersonalInformationsFilters.gpa = {
				// 		[Op.between]: [req.body.gpaFrom, req.body.gpaTo],
				// 	};
				// 	playerPersonalInformationStatus = 1;
				// }
				// if (req.body.year) {
				// 	playerPersonalInformationsFilters.class = req.body.year;
				// 	playerPersonalInformationStatus = 1;
				// }

				const result = await userService.searchPlayersForGuestUser(playerFilters, req.body.offset, req.body.limit);
				if (result) {
					// Fetch likes count
					const usersArr = result.users;
					const userIds = usersArr.map((users) => users.id);

					// const checkFavoriteUsers = await favouritePlayersCoachesModels.findAll({
					// 	where: {playerOrCoachId: userIds, userId: req.decoded.id},
					// 	raw: true,
					// });

					console.log(userIds, 'usersArr========', usersArr);

					// Map likes count to the result
					const resultWithLikesCount = await Promise.all(usersArr.map(async (user) => {
						// const findFollowing = await followersModel.findOne({where: {userId: user?.id, followedById: req.decoded.id}, raw: true});
						// const checkFavourite = checkFavoriteUsers?.find((item) => item?.playerOrCoachId === user?.id);
						return {...user,
							isFavourite: false,
							isFollowing: 0,
						};
					}));

					const finalData = {
						totalUsers: result.totalUsers,
						users: resultWithLikesCount,
					};

					return res.status(200).json({status: true, message: 'Users search list', data: finalData});
				} else {
					return res.status(403).json({status: false, message: 'Users search list not found!'});
				}
			} else {
				console.log('searchCoaches======================', req.body);

				// Define your filters with conditional logic
				const coachFilters = {
					roleId: 3,
					isKycApproved: 1,
					isVerified: 1,
					status: 1,
					isDeleted: 0,
				};

				// if (req.body.name) {
				// 	coachFilters.firstname = {
				// 		[Op.like]: `%${req.body.name}%`,
				// 	};
				// }

				// const coachPersonalInformationsFilters = {};
				// let coachPersonalInformationStatus = 0;

				// if (req.body.isKycApproved) {
				// 	coachFilters.isKycApproved = req.body.isKycApproved;
				// 	coachPersonalInformationStatus = 1;
				// }

				const result = await userService.searchCoachesForGuestUser(coachFilters, req.body.offset, req.body.limit);
				if (result) {
					// Fetch likes count
					const usersArr = result.users;
					const userIds = usersArr.map((users) => users.id);

					// const checkFavoriteUsers = await favouritePlayersCoachesModels.findAll({
					// 	where: {playerOrCoachId: userIds, userId: req.decoded.id},
					// 	raw: true,
					// });

					let filteredUsers = [];
					if (req.body.division || req.body.state || req.body.tuitionFeesFrom || req.body.tuitionFeesTo) {
						console.log('if================');

						filteredUsers = usersArr.filter((users) => {
							if (req.body.division) {
								return users['coachPersonalInformations.programs.division'] === req.body.division;
							}

							if (req.body.state) {
								return users['coachPersonalInformations.programs.state'] === req.body.state;
							}

							if (req.body.tuitionFeesFrom) {
								return users['coachPersonalInformations.programs.tuitionFees'] >= req.body.tuitionFeesFrom && users['coachPersonalInformations.programs.tuitionFees'] <= req.body.tuitionFeesTo;
							}

							return false;
						},
						);
					} else {
						console.log('else================');
						filteredUsers = usersArr;
					}

					console.log('filteredUsers==================', filteredUsers);

					// Map likes count to the result
					const resultWithLikesCount = await Promise.all(filteredUsers.map(async (user) => {
						const divisionLogo = await programTypesModels.findOne({
							where: {name: user['coachPersonalInformations.programs.division']},
							raw: true,
						});

						// const checkFavourite = checkFavoriteUsers?.find((item) => item?.playerOrCoachId === user?.id);
						return {...user,
							isFavourite: false,
							divisionLogo: divisionLogo ? divisionLogo?.logo:null,
							colorCode: divisionLogo ? divisionLogo?.colorCode:null,
						};
					}));

					const finalData = {
						totalUsers: filteredUsers.length,
						users: resultWithLikesCount,
					};

					return res.status(200).json({status: true, message: 'Users search list', data: finalData});
				} else {
					return res.status(403).json({status: false, message: 'Users search list not found!'});
				}
			}
		} catch (error) {
			errorService.printError('User Service: searchUsersByRoleId', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get users video reels by role id ******/
	async usersVideoReelsByRoleId(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			if (req.body.roleId == 4) {
				const findPlayers = await usersModel.findAll({where: {roleId: 4, status: 1, isDeleted: 0}, raw: true});
				let totalPlayerIds = [];
				if (findPlayers.length === 0) {
					totalPlayerIds = [];
				} else {
					totalPlayerIds = findPlayers.map((players) => players.id);
				}

				const result = await userVideoReelsModel.findAll({
					where: {
						userId: {
							[Op.in]: totalPlayerIds,
						},
						status: 1,
						isDeleted: 0,
					},
					order: [['views', 'DESC']],
					offset: req.body.offset,
					limit: req.body.limit,
					raw: true});

				if (result) {
					// Map likes count to the result
					const resultWithLikesCount = await Promise.all(result.map( async (videoReels) => {
						const likesCounts = await likedVideoReelsModel.findAll({
							attributes: ['videoReelId', [sequelize.fn('COUNT', '*'), 'count']],
							where: {videoReelId: videoReels.id},
							group: ['videoReelId'],
							raw: true,
						});

						const findUser = await usersModel.findOne({where: {id: videoReels.userId, status: 1, isDeleted: 0}, raw: true});

						return {...videoReels,
							roleId: 4,
							firstName: findUser?.firstName,
							lastName: findUser?.lastName,
							isFollowing: 0,
							isLiked: false,
							likesCount: likesCounts[0] ? likesCounts[0].count:0,
						};
					}));

					return res.status(200).json({status: true, message: 'User video reel', data: {totalUsers:resultWithLikesCount.length, users:resultWithLikesCount}});
				} else {
					return res.status(403).json({status: false, message: 'User video reels list not found!'});
				}
			} else {
				const findCoaches = await usersModel.findAll({where: {roleId: 3, isVerified: 1, status: 1, isDeleted: 0}, raw: true});
				let totalCoachIds = [];
				if (findCoaches.length === 0) {
					totalCoachIds = [];
				} else {
					totalCoachIds = findCoaches.map((coaches) => coaches.id);
				}

				const result = await userVideoReelsModel.findAll({
					where: {
						userId: {
							[Op.in]: totalCoachIds,
						},
						status: 1,
						isDeleted: 0,
					},
					order: [['views', 'DESC']],
					offset: req.body.offset,
					limit: req.body.limit,
					raw: true});

				if (result) {
					// Map likes count to the result
					const resultWithLikesCount = await Promise.all(result.map( async (videoReels) => {
						const likesCounts = await likedVideoReelsModel.findAll({
							attributes: ['videoReelId', [sequelize.fn('COUNT', '*'), 'count']],
							where: {videoReelId: videoReels.id},
							group: ['videoReelId'],
							raw: true,
						});

						const findUser = await usersModel.findOne({where: {id: videoReels.userId, status: 1, isDeleted: 0}, raw: true});

						return {...videoReels,
							roleId: 3,
							firstName: findUser?.firstName,
							lastName: findUser?.lastName,
							isFollowing: 0,
							isLiked: false,
							likesCount: likesCounts[0] ? likesCounts[0].count:0,
						};
					}));

					return res.status(200).json({status: true, message: 'User video reel', data: {totalUsers:resultWithLikesCount.length, users:resultWithLikesCount}});
				} else {
					return res.status(403).json({status: false, message: 'User video reels list not found!'});
				}
			}
		} catch (error) {
			errorService.printError('User Service: userVideoReelsListByUserId', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to search programs list ******/
	async searchProgramsList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const userService = new UserService();

			// Define your filters with conditional logic
			const programFilters = {
				status: 1,
				isDeleted: 0,
			};
			// if (req.body.name) {
			// 	programFilters.name = {
			// 		[Op.like]: `%${req.body.name}%`,
			// 	};
			// }

			// if (req.body.division) {
			// 	programFilters.division = req.body.division;
			// }

			// if (req.body.state) {
			// 	programFilters.state = req.body.state;
			// }

			// const findUser = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});

			// if (findUser?.type == 'WBB') {
			// 	programFilters.sportsCode = 'Women\'s Basketball';
			// } else {
			programFilters.sportsCode = 'Men\'s Basketball';
			// }

			// if (req.body.tuitionFeesFrom && req.body.tuitionFeesTo) {
			// 	programFilters.tuitionFees = {
			// 		[Op.between]: [req.body.tuitionFeesFrom, req.body.tuitionFeesTo],
			// 	};
			// }

			const result = await userService.searchProgramsWithFilters(programFilters, req.body.offset, req.body.limit);
			if (result) {
				// Fetch likes count for each program
				const programsArr = result.programs;
				const programIds = programsArr.map((program) => program.id);
				const rosterPlayersCount = await rostersModel.findAll({
					attributes: ['programId', [sequelize.fn('COUNT', '*'), 'count']],
					where: {programId: programIds, status: 1, isDeleted: 0},
					group: ['programId'],
					raw: true,
				});

				// const checkFavoritePrograms = await favouriteProgramsModel.findAll({
				// 	where: {programId: programIds, userId: req.decoded.id},
				// 	raw: true,
				// });

				// Map likes count to the result
				const resultWithLikesCount = await Promise.all(programsArr.map( async (program) => {
					const calculateOpenings = await rostersModel.findAll({
						attributes: [
							[sequelize.fn('SUM', sequelize.col('openings')), 'total'],
						],
						where: {programId: program.id},
						raw: true,
					});

					const divisionLogo = await programTypesModels.findOne({
						where: {name: program.division},
						raw: true,
					});

					const totalOpenings = calculateOpenings[0]?.total ? calculateOpenings[0]?.total:0;
					const rosterPlayersTotalCount = rosterPlayersCount.find((item) => item.programId === program.id);
					// const checkFavourite = checkFavoritePrograms?.find((item) => item?.programId === program?.id);
					return {...program,
						playersCount: rosterPlayersTotalCount ? rosterPlayersTotalCount.count : 0,
						isFavourite: false,
						totalOpenings: parseInt(totalOpenings),
						divisionLogo: divisionLogo ? divisionLogo?.logo:null,
						colorCode: divisionLogo ? divisionLogo?.colorCode:null,
					};
				}));

				const finalData = {
					totalPrograms: result.totalPrograms,
					programs: resultWithLikesCount,
				};

				return res.status(200).json({status: true, message: 'Search programs list', data: finalData});
			} else {
				return res.status(403).json({status: false, message: 'Search programs list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: searchProgramsList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get news feeds list by role id ******/
	async newsFeedsByRoleId(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			// const findreportedNewsFeeds = await reportedNewsFeedsModel.findAll({where: {userId: req.decoded.id}, raw: true});
			// let reportedNewsFeedsArr = [];
			// if (findreportedNewsFeeds.length === 0) {
			// 	reportedNewsFeedsArr = [];
			// } else {
			// 	reportedNewsFeedsArr = findreportedNewsFeeds.map((feeds) => feeds.feedId);
			// }

			// console.log('reportedNewsFeedsArr=======', reportedNewsFeedsArr);

			const userService = new UserService();
			if (req.body.roleId == 4) {
				const findPlayers = await usersModel.findAll({where: {roleId: 4, status: 1, isDeleted: 0}, raw: true});
				let totalPlayerIds = [];
				if (findPlayers.length === 0) {
					totalPlayerIds = [];
				} else {
					totalPlayerIds = findPlayers.map((players) => players.id);
				}
				const playerFilters = {
					status: 1,
					isDeleted: 0,
					isActivity: 0,
					userId: {
						[Op.in]: totalPlayerIds,
					},
					// id: {
					// 	[Op.notIn]: reportedNewsFeedsArr,
					// },
				};

				const result = await userService.playersNewsFeeds(playerFilters, req.body.offset, req.body.limit);
				if (result) {
					const selectedResult = result.users;
					const usersCount = result.totalUsers;

					// Fetch likes count for each feed
					const feedIds = selectedResult.map((feed) => feed.id);
					const likesCounts = await favouriteNewsFeedsModels.findAll({
						attributes: ['feedId', [sequelize.fn('COUNT', '*'), 'count']],
						where: {feedId: feedIds},
						group: ['feedId'],
						raw: true,
					});

					// const checkUserLikes = await favouriteNewsFeedsModels.findAll({
					// 	where: {feedId: feedIds, userId: req.decoded.id},
					// 	raw: true,
					// });

					// Map likes count to the result
					const resultWithLikesCount = selectedResult.map((feed) => {
						const likesCount = likesCounts.find((item) => item.feedId === feed.id);
						// const checkLike = checkUserLikes?.find((item) => item?.feedId === feed?.id);
						return {...feed, likesCount: likesCount ? likesCount.count : 0,
							isLiked: false,
							isFollowing: 0,
							profilePictureUrl: feed['user.profilePictureUrl'],
							firstName: feed['user.firstName'],
							lastName: feed['user.lastName'],
							roleId: feed['user.roleId'],
						};
					});
					return res.status(200).json({status: true, message: 'Video news feeds list', data: {totalNewsFeeds: usersCount, users: resultWithLikesCount}});
				} else {
					return res.status(403).json({status: false, message: 'Video news feeds list not found!'});
				}
			} else {
				const findCoach = await usersModel.findAll({where: {roleId: 3, status: 1, isDeleted: 0}, raw: true});
				let totalCoachIds = [];
				if (findCoach.length === 0) {
					totalCoachIds = [];
				} else {
					totalCoachIds = findCoach.map((coaches) => coaches.id);
				}

				const coachFilters = {
					status: 1,
					isDeleted: 0,
					isActivity: 0,
					userId: {
						[Op.in]: totalCoachIds,
					},
					// id: {
					// 	[Op.notIn]: reportedNewsFeedsArr,
					// },
				};

				const result = await userService.coachNewsFeeds(coachFilters, req.body.offset, req.body.limit);
				if (result) {
					const selectedResult = result.users;
					const usersCount = result.totalUsers;

					// Fetch likes count for each feed
					const feedIds = selectedResult.map((feed) => feed.id);
					const likesCounts = await favouriteNewsFeedsModels.findAll({
						attributes: ['feedId', [sequelize.fn('COUNT', '*'), 'count']],
						where: {feedId: feedIds},
						group: ['feedId'],
						raw: true,
					});

					// const checkUserLikes = await favouriteNewsFeedsModels.findAll({
					// 	where: {feedId: feedIds, userId: req.decoded.id},
					// 	raw: true,
					// });

					// Map likes count to the results
					const resultWithLikesCount = await Promise.all(selectedResult.map(async (feed) => {
						const divisionLogo = await programTypesModels.findOne({
							where: {name: feed['user.coachPersonalInformations.programs.division']},
							raw: true,
						});
						const likesCount = likesCounts.find((item) => item.feedId === feed.id);
						// const checkLike = checkUserLikes?.find((item) => item?.feedId === feed?.id);
						return {...feed, likesCount: likesCount ? likesCount.count : 0,
							isLiked: false,
							isFollowing: 0,
							profilePictureUrl: feed['user.profilePictureUrl'],
							firstName: feed['user.firstName'],
							lastName: feed['user.lastName'],
							roleId: feed['user.roleId'],
							divisionLogo: divisionLogo ? divisionLogo?.logo:null,
							colorCode: divisionLogo ? divisionLogo?.colorCode:null,
						};
					}));
					return res.status(200).json({status: true, message: 'News feeds list by role id', data: {totalNewsFeeds: usersCount, users: resultWithLikesCount}});
				} else {
					return res.status(403).json({status: false, message: 'News feeds list by role id not found!'});
				}
			}
		} catch (error) {
			errorService.printError('User Service: newsFeedsByRoleId', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get all video news feeds list ******/
	async allVideoNewsFeedsList(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const findreportedNewsFeeds = await reportedNewsFeedsModel.findAll({where: {userId: req.decoded.id}, raw: true});
			let reportedNewsFeedsArr = [];
			if (findreportedNewsFeeds.length === 0) {
				reportedNewsFeedsArr = [];
			} else {
				reportedNewsFeedsArr = findreportedNewsFeeds.map((feeds) => feeds.feedId);
			}

			console.log('reportedNewsFeedsArr=======', reportedNewsFeedsArr);

			const {count, rows} = await newsFeedsModels.findAndCountAll({
				where: {
					id: {
						[Op.notIn]: reportedNewsFeedsArr,
					},
					isVideo: 1,
					status: 1,
					isDeleted: 0},
				include: [{
					model: usersModel,
					as: 'user',
					attributes: ['profilePictureUrl', 'firstName', 'lastName', 'roleId'],
				}],
				order: [['id', 'DESC']],
				offset: req.body.offset,
				limit: req.body.limit,
				raw: true});

			const result = rows;
			const totalFeeds = count;

			if (result) {
				// Fetch likes count for each feed
				const feedIds = result.map((feed) => feed.id);
				const likesCounts = await favouriteNewsFeedsModels.findAll({
					attributes: ['feedId', [sequelize.fn('COUNT', '*'), 'count']],
					where: {feedId: feedIds},
					group: ['feedId'],
					raw: true,
				});

				const checkUserLikes = await favouriteNewsFeedsModels.findAll({
					where: {feedId: feedIds, userId: req.decoded.id},
					raw: true,
				});


				// Map likes count to the result
				const resultWithLikesCount = await Promise.all(result.map(async (feed) => {
					const likesCount = likesCounts.find((item) => item.feedId === feed.id);
					const checkLike = checkUserLikes?.find((item) => item?.feedId === feed?.id);
					const findFollowing = await followersModel.findOne({where: {userId: feed?.userId, followedById: req.decoded.id}, raw: true});

					return {...feed, likesCount: likesCount ? likesCount.count : 0,
						isLiked: checkLike ? true:false,
						isFollowing: findFollowing ? 1:0,
						profilePictureUrl: feed['user.profilePictureUrl'],
						firstName: feed['user.firstName'],
						lastName: feed['user.lastName'],
						roleId: feed['user.roleId'],
					};
				}));
				return res.status(200).json({status: true, message: 'Video news feeds list', data: {totalNewsFeeds: totalFeeds, users: resultWithLikesCount}});
			} else {
				return res.status(403).json({status: false, message: 'Video news feeds list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: allVideoNewsFeedsList', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get official roster list by program id ******/
	async officialRostersListByProgramId(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await rostersModel.findAll({
				where: {status: 1, isDeleted: 0, isOfficial: 1, programId: 1},
				include: [
					{
						model: schoolsModel,
						as: 'programs',
						required: false,
					},
				],
			});
			if (result) {
				return res.status(200).json({status: true, message: 'Rosters list', data: result});
			} else {
				return res.status(403).json({status: false, message: 'Rosters list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: officialRostersListByProgramId', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get committed players list by program id ******/
	async committedPlayersListByProgramId(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			const result = await offersModel.findAll({
				where: {
					programId: 1,
					requestStatus: 'Committed',
				},
				include: [{
					model: usersModel,
					as: 'users',
					required: true,
					attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
				},
				{
					model: playerPersonalInformationsModels,
					as: 'playerPersonalInformations',
					required: false,
				},
				{
					model: playerStatsModels,
					as: 'playerStats',
					required: false,
				}],
				raw: true});
			if (result) {
				return res.status(200).json({status: true, message: 'Committed players list', data: result});
			} else {
				return res.status(403).json({status: false, message: 'Committed players list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: committedPlayersListByProgramId', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get guest news feeds list by role id ******/
	async guestRecruitingNewsFeedsListByRoleId(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

			// const findreportedNewsFeeds = await reportedNewsFeedsModel.findAll({where: {userId: req.decoded.id}, raw: true});
			// let reportedNewsFeedsArr = [];
			// if (findreportedNewsFeeds.length === 0) {
			// 	reportedNewsFeedsArr = [];
			// } else {
			// 	reportedNewsFeedsArr = findreportedNewsFeeds.map((feeds) => feeds.feedId);
			// }

			// console.log('reportedNewsFeedsArr=======', reportedNewsFeedsArr);

			const userService = new UserService();
			if (req.body.roleId == 4) {
				const findPlayers = await usersModel.findAll({where: {roleId: 4, status: 1, isDeleted: 0}, raw: true});
				let totalPlayerIds = [];
				if (findPlayers.length === 0) {
					totalPlayerIds = [];
				} else {
					totalPlayerIds = findPlayers.map((players) => players.id);
				}
				const playerFilters = {
					status: 1,
					isDeleted: 0,
					isActivity: 1,
					userId: {
						[Op.in]: totalPlayerIds,
					},
				};

				const result = await userService.playersNewsFeeds(playerFilters, req.body.offset, req.body.limit);
				if (result) {
					const selectedResult = result.users;
					const usersCount = result.totalUsers;

					// Fetch likes count for each feed
					const feedIds = selectedResult.map((feed) => feed.id);
					const likesCounts = await favouriteNewsFeedsModels.findAll({
						attributes: ['feedId', [sequelize.fn('COUNT', '*'), 'count']],
						where: {feedId: feedIds},
						group: ['feedId'],
						raw: true,
					});

					// const checkUserLikes = await favouriteNewsFeedsModels.findAll({
					// 	where: {feedId: feedIds, userId: req.decoded.id},
					// 	raw: true,
					// });

					// Map likes count to the result
					const resultWithLikesCount = selectedResult.map((feed) => {
						const likesCount = likesCounts.find((item) => item.feedId === feed.id);
						// const checkLike = checkUserLikes?.find((item) => item?.feedId === feed?.id);
						return {...feed, likesCount: likesCount ? likesCount.count : 0,
							isLiked: false,
							isFollowing: 0,
							profilePictureUrl: feed['user.profilePictureUrl'],
							firstName: feed['user.firstName'],
							lastName: feed['user.lastName'],
							roleId: feed['user.roleId'],
						};
					});
					return res.status(200).json({status: true, message: 'News feeds list', data: {totalUsers: usersCount, users: resultWithLikesCount}});
				} else {
					return res.status(403).json({status: false, message: 'News feeds list not found!'});
				}
			} else {
				const findCoach = await usersModel.findAll({where: {roleId: 3, status: 1, isDeleted: 0}, raw: true});
				let totalCoachIds = [];
				if (findCoach.length === 0) {
					totalCoachIds = [];
				} else {
					totalCoachIds = findCoach.map((coaches) => coaches.id);
				}

				const coachFilters = {
					status: 1,
					isDeleted: 0,
					isActivity: 1,
					userId: {
						[Op.in]: totalCoachIds,
					},
				};

				const result = await userService.coachNewsFeeds(coachFilters, req.body.offset, req.body.limit);
				if (result) {
					const selectedResult = result.users;
					const usersCount = result.totalUsers;

					// Fetch likes count for each feed
					const feedIds = selectedResult.map((feed) => feed.id);
					const likesCounts = await favouriteNewsFeedsModels.findAll({
						attributes: ['feedId', [sequelize.fn('COUNT', '*'), 'count']],
						where: {feedId: feedIds},
						group: ['feedId'],
						raw: true,
					});

					// const checkUserLikes = await favouriteNewsFeedsModels.findAll({
					// 	where: {feedId: feedIds, userId: req.decoded.id},
					// 	raw: true,
					// });

					// Map likes count to the results
					const resultWithLikesCount = await Promise.all(selectedResult.map(async (feed) => {
						const divisionLogo = await programTypesModels.findOne({
							where: {name: feed['user.coachPersonalInformations.programs.division']},
							raw: true,
						});
						const likesCount = likesCounts.find((item) => item.feedId === feed.id);
						// const checkLike = checkUserLikes?.find((item) => item?.feedId === feed?.id);
						return {...feed, likesCount: likesCount ? likesCount.count : 0,
							isLiked: false,
							isFollowing:0,
							profilePictureUrl: feed['user.profilePictureUrl'],
							firstName: feed['user.firstName'],
							lastName: feed['user.lastName'],
							roleId: feed['user.roleId'],
							divisionLogo: divisionLogo ? divisionLogo?.logo:null,
							colorCode: divisionLogo ? divisionLogo?.colorCode:null,
						};
					}));
					return res.status(200).json({status: true, message: 'News feeds list', data: {totalUsers: usersCount, users: resultWithLikesCount}});
				} else {
					return res.status(403).json({status: false, message: 'News feeds list not found!'});
				}
			}
		} catch (error) {
			errorService.printError('User Service: guestNewsFeedsListByRoleId', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get guest match styles list by role id ******/
	async guestMatchStylesListByRoleId(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');
			const userService = new UserService();

			if (req.body.roleId == 4) {
				// Define your filters with conditional logic
				const playerFilters = {
					roleId: 4,
					status: 1,
					isDeleted: 0,
				};

				const result = await userService.playersMatchStyles(playerFilters, req.body.offset, req.body.limit);
				if (result) {
					// Fetch likes count
					const usersArr = result.users;
					const userIds = usersArr.map((users) => users.id);

					// Map likes count to the result
					const resultWithLikesCount = await Promise.all(usersArr.map(async (user) => {
						const findPhotos = await userPhotosModel.findAll({
							where: {
								userId: user?.id,
								status: 1,
								isDeleted: 0,
							},
							order: [['id', 'DESC']],
            				limit: 3,
							raw: true,
						});

						const findVideos = await userVideoReelsModel.findAll({
							where: {
								userId: user?.id,
								status: 1,
								isDeleted: 0,
							},
							order: [['id', 'DESC']],
            				limit: 3,
							raw: true,
						});

						return {...user,
							photos: findPhotos,
							videos: findVideos,
							isFavourite: false,
							isFollowing: 0,
						};
					}));

					const finalData = {
						totalUsers: result.totalUsers,
						users: resultWithLikesCount,
					};

					return res.status(200).json({status: true, message: 'Match styles list', data: finalData});
				} else {
					return res.status(403).json({status: false, message: 'Match styles list not found!'});
				}
			} else {
				// Define your filters with conditional logic
				const coachFilters = {
					roleId: 3,
					status: 1,
					isDeleted: 0,
				};

				const result = await userService.coachMatchStyles(coachFilters, req.body.offset, req.body.limit);
				if (result) {
					// Fetch likes count
					const usersArr = result.users;
					const userIds = usersArr.map((users) => users.id);

					// Map likes count to the result
					const resultWithLikesCount = await Promise.all(usersArr.map(async (user) => {
						const divisionLogo = await programTypesModels.findOne({
							where: {name: user['coachPersonalInformations.programs.division']},
							raw: true,
						});

						const findPhotos = await userPhotosModel.findAll({
							where: {
								userId: user?.id,
								status: 1,
								isDeleted: 0,
							},
							order: [['id', 'DESC']],
            				limit: 3,
							raw: true,
						});

						const findVideos = await userVideoReelsModel.findAll({
							where: {
								userId: user?.id,
								status: 1,
								isDeleted: 0,
							},
							order: [['id', 'DESC']],
            				limit: 3,
							raw: true,
						});


						return {...user,
							photos: findPhotos,
							videos: findVideos,
							isFavourite: false,
							isFollowing: 0,
							divisionLogo: divisionLogo ? divisionLogo?.logo:null,
							colorCode: divisionLogo ? divisionLogo?.colorCode:null,
						};
					}));

					const finalData = {
						totalUsers: result.totalUsers,
						users: resultWithLikesCount,
					};

					return res.status(200).json({status: true, message: 'Match styles list', data: finalData});
				} else {
					return res.status(403).json({status: false, message: 'Match styles list not found!'});
				}
			}
		} catch (error) {
			errorService.printError('User Service: guestMatchStylesListByRoleId', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get official roaster list by role id ******/
	async officialRosterListByRoleId(req, res, next){
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');
			const userService = new UserService();

			const getUser = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});
			if(getUser.roleId == 4){

				const chkCommittedOffer = await offersModel.findOne({where: {userId: req.decoded.id, requestStatus: 'Committed'}, order: [['createdAt', 'DESC']], raw: true});
				if(chkCommittedOffer){
					const result = await rostersModel.findAll({
						where: {status: 1, isDeleted: 0, programId: chkCommittedOffer.programId, isOfficial: 1},
						include: [
							{
								model: schoolsModel,
								as: 'programs',
								required: false,
							},
						],
					});
					if (result) {
						const resultArr = [];
						let data = {};
						for (let i = 0; i<result.length; i++) {
							if (result[i]?.userId) {
								const findPlayerData = await usersModel.findOne({
									where: {
										id: result[i].userId,
									},
									raw: true,
								});
	
								const playerPersonalInformationsData =	await playerPersonalInformationsModels.findOne({
									where: {
										userId: result[i].userId,
									},
									raw: true,
								});
	
								data = {
									id: result[i].id,
									coachId: result[i].coachId,
									programId: parseInt(chkCommittedOffer.programId),
									userId: parseInt(req.params.id),
									profilePictureUrl: findPlayerData?.profilePictureUrl,
									firstName: findPlayerData?.firstName,
									lastName: findPlayerData?.lastName,
									class: playerPersonalInformationsData?.class,
									position: playerPersonalInformationsData?.position,
									height: playerPersonalInformationsData?.height,
									description: result[i]?.description,
									openings: result[i]?.openings,
									isOfficial: result[i]?.isOfficial,
									status: result[i]?.status,
									isDeleted: result[i]?.isDeleted,
									createdAt: result[i]?.createdAt,
									updatedAt: result[i]?.updatedAt,
									programs: result[i].programs,
								};
								resultArr.push(data);
							} else {
								data = result[i];
								resultArr.push(data);
							}
						}
						return res.status(200).json({status: true, message: 'Rosters list', data: resultArr});
					} else {
						return res.status(403).json({status: false, message: 'Rosters list not found!'});
					}
				} else{
					return res.status(403).json({status: false, message: 'Rosters list not found!'});
				}
			} else if(getUser.roleId == 3){
				const chkProgram = await coachPersonalInformationsModels.findOne({where: {userId: req.decoded.id}, raw: true});
				if(chkProgram.currentProgramId){
					const result = await rostersModel.findAll({
						where: {status: 1, isDeleted: 0, programId: chkProgram.currentProgramId, isOfficial: 1},
						include: [
							{
								model: schoolsModel,
								as: 'programs',
								required: false,
							},
						],
					});
					if (result) {
						const resultArr = [];
						let data = {};
						for (let i = 0; i<result.length; i++) {
							if (result[i]?.userId) {
								const findPlayerData = await usersModel.findOne({
									where: {
										id: result[i].userId,
									},
									raw: true,
								});
	
								const playerPersonalInformationsData =	await playerPersonalInformationsModels.findOne({
									where: {
										userId: result[i].userId,
									},
									raw: true,
								});
	
								data = {
									id: result[i].id,
									coachId: parseInt(req.params.id),
									programId: parseInt(chkProgram.currentProgramId),
									userId: result[i].userId,
									profilePictureUrl: findPlayerData?.profilePictureUrl,
									firstName: findPlayerData?.firstName,
									lastName: findPlayerData?.lastName,
									class: playerPersonalInformationsData?.class,
									position: playerPersonalInformationsData?.position,
									height: playerPersonalInformationsData?.height,
									description: result[i]?.description,
									openings: result[i]?.openings,
									isOfficial: result[i]?.isOfficial,
									status: result[i]?.status,
									isDeleted: result[i]?.isDeleted,
									createdAt: result[i]?.createdAt,
									updatedAt: result[i]?.updatedAt,
									programs: result[i].programs,
								};
								resultArr.push(data);
							} else {
								data = result[i];
								resultArr.push(data);
							}
						}
						return res.status(200).json({status: true, message: 'Rosters list', data: resultArr});
					} else {
						return res.status(403).json({status: false, message: 'Rosters list not found!'});
					}
				} else{
					return res.status(403).json({status: false, message: 'Rosters list not found!'});
				}
			} else{
				return res.status(403).json({status: false, message: 'Rosters list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: officialRoasterListByRoleId', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get committed players list by role id ******/
	async committedPlayersListByRoleId(req, res, next){
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');
			const userService = new UserService();

			const getUser = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});
			if(getUser.roleId == 4){

				const chkCommittedOffer = await offersModel.findOne({where: {userId: req.decoded.id, requestStatus: 'Committed'}, order: [['createdAt', 'DESC']], raw: true});
				if (chkCommittedOffer) {
					const result = await offersModel.findAll({
						where: {
							userId: req.decoded.id,
							programId: chkCommittedOffer.programId,
							requestStatus: 'Committed',
						},
						include: [{
							model: usersModel,
							as: 'users',
							required: true,
							attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
						},
						{
							model: playerPersonalInformationsModels,
							as: 'playerPersonalInformations',
							required: false,
						},
						{
							model: playerStatsModels,
							as: 'playerStats',
							required: false,
						}],
						raw: true});
					if (result) {
						return res.status(200).json({status: true, message: 'Committed players list', data: result});
					} else {
						return res.status(403).json({status: false, message: 'Committed players list not found!'});
					}
				} else {
					return res.status(403).json({status: false, message: 'Committed players list not found!'});
				}
			} else if(getUser.roleId == 3){
				const chkProgram = await coachPersonalInformationsModels.findOne({where: {userId: req.decoded.id}, raw: true});
				if (chkProgram.currentProgramId) {
					const result = await offersModel.findAll({
						where: {
							programId: chkProgram.currentProgramId,
							requestStatus: 'Committed',
						},
						include: [{
							model: usersModel,
							as: 'users',
							required: true,
							attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
						},
						{
							model: playerPersonalInformationsModels,
							as: 'playerPersonalInformations',
							required: false,
						},
						{
							model: playerStatsModels,
							as: 'playerStats',
							required: false,
						}],
						raw: true});
					if (result) {
						return res.status(200).json({status: true, message: 'Committed players list', data: result});
					} else {
						return res.status(403).json({status: false, message: 'Committed players list not found!'});
					}
				} else {
					return res.status(403).json({status: false, message: 'Committed players list not found!'});
				}
			} else{
				return res.status(403).json({status: false, message: 'Committed players list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: committedPlayersListByRoleId', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to get top coaches ******/
	async topCoachesFilter(coachFilters, coachCoachingDetailsFilters, offset, limit) {
		try {
			console.log('topCoachesFilter======================', coachFilters, coachCoachingDetailsFilters, offset, limit);
			const {count, rows} = await usersModel.findAndCountAll({
				attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
				where: coachFilters,
				include: [{
					model: coachPersonalInformationsModels,
					as: 'coachPersonalInformations',
					required: false,
					include: [{
						model: schoolsModel,
						as: 'programs',
						required: false,
					}],
				},
				{
					model: coachCoachingDetailsModels,
					as: 'coachCoachingDetails',
					where: coachCoachingDetailsFilters,
					required: false,
				},
				],
				order: [
					[{ model: coachCoachingDetailsModels, as: 'coachCoachingDetails' }, 'playerDeveRate', 'DESC']
				],
				offset: offset,
				limit: limit,
				raw: true,
			});
			return {
				totalUsers: count,
				users: rows,
			};
		} catch (error) {
			errorService.printError('User Service: topCoachesFilter', error);
			console.log('topCoachesFilter error: ', error);
		}
	}

	/** ***** User Service: Method to get not following players list ******/
	async topPlayersFilter(playerFilters, playerStatsFilters, offset, limit) {
		try {
			console.log('topPlayersFilter======================', playerFilters,playerStatsFilters, offset, limit);
			const {count, rows} = await usersModel.findAndCountAll({
				attributes: {exclude: ['password', 'verificationCode', 'fcmToken']},
				where: playerFilters,
				include: [{
					model: playerPersonalInformationsModels,
					as: 'playerPersonalInformations',
					required: false,
				},
				{
					model: playerStatsModels,
					as: 'playerStats',
					where: playerStatsFilters,
					required: false,
				},
				],
				order: [
					[{ model: playerStatsModels, as: 'playerStats' }, 'ppg', 'DESC']
				],
				offset: offset,
				limit: limit,
				raw: true,
			});
			return {
				totalUsers: count,
				users: rows,
			};
		} catch (error) {
			errorService.printError('User Service: topPlayersFilter', error);
			console.log('topPlayersFilter error: ', error);
		}
	}

	/** ***** User Service: Method to get top players by coach id ******/
	async topPlayersByCoachId(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');
			const userService = new UserService();

			const checkUser = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});
			if (checkUser?.roleId == 3) {
				console.log('coach followers===============');

				const findFollowings = await followersModel.findAll({where: {followedById: req.decoded.id, status: 1, isDeleted: 0}, raw: true});
				let totalPlayerIds = [];
				if (findFollowings.length === 0) {
					totalPlayerIds = [];
				} else {
					totalPlayerIds = findFollowings.map((players) => players.userId);
				}
				console.log('totalPlayerIds===========', totalPlayerIds);

				// Define your filters with conditional logic
				const playerFilters = {
					roleId: 4,
					status: 1,
					isDeleted: 0,
					id: {
						[Op.notIn]: totalPlayerIds,
					},
				};

				const playerStatsFilters = {
					ppg: {
						[Op.gt]: 0,
					},
					fgPercentage: {
						[Op.gt]: 0,
					},
					rpg: {
						[Op.gt]: 0,
					},
					apg: {
						[Op.gt]: 0,
					},
				};

				const result = await userService.topPlayersFilter(playerFilters, playerStatsFilters, req.body.offset, req.body.limit);
				if (result) {
					// Fetch likes count
					const usersArr = result.users;
					const userIds = usersArr.map((users) => users.id);

					const checkFavoriteUsers = await favouritePlayersCoachesModels.findAll({
						where: {playerOrCoachId: userIds, userId: req.decoded.id},
						raw: true,
					});

					// Map likes count to the result
					const resultWithLikesCount = await Promise.all(usersArr.map(async (user) => {
						const findPhotos = await userPhotosModel.findAll({
							where: {
								userId: user?.id,
								status: 1,
								isDeleted: 0,
							},
							order: [['id', 'DESC']],
            				limit: 3,
							raw: true,
						});

						const findVideos = await userVideoReelsModel.findAll({
							where: {
								userId: user?.id,
								status: 1,
								isDeleted: 0,
							},
							order: [['id', 'DESC']],
            				limit: 3,
							raw: true,
						});

						const findFollowing = await followersModel.findOne({where: {userId: user?.id, followedById: req.decoded.id}, raw: true});

						const checkFavourite = checkFavoriteUsers?.find((item) => item?.playerOrCoachId === user?.id);
						return {...user,
							photos: findPhotos,
							videos: findVideos,
							isFavourite: checkFavourite ? true:false,
							isFollowing: findFollowing ? 1:0,
						};
					}));

					const finalData = {
						totalUsers: result.totalUsers,
						users: resultWithLikesCount,
					};

					return res.status(200).json({status: true, message: 'Top players list', data: finalData});
				} else {
					return res.status(403).json({status: false, message: 'Top players list not found!'});
				}
			} else {
				console.log('No role id found===============');
				return res.status(403).json({status: false, message: 'Top players list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: topPlayersByCoachId', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}
	
	/** ***** User Service: Method to get top coaches by player id ******/
	async topCoachesByPlayerId(req, res, next) {
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');
			const userService = new UserService();

			const checkUser = await usersModel.findOne({where: {id: req.decoded.id}, raw: true});

			if (checkUser.roleId == 4) {
				console.log('player followers===============');

				const findFollowings = await followersModel.findAll({where: {followedById: req.decoded.id, status: 1, isDeleted: 0}, raw: true});
				let totalCoachIds = [];
				if (findFollowings.length === 0) {
					totalCoachIds = [];
				} else {
					totalCoachIds = findFollowings.map((coaches) => coaches.userId);
				}
				console.log('totalCoachIds===========', totalCoachIds);

				// Define your filters with conditional logic
				const coachFilters = {
					roleId: 3,
					status: 1,
					isDeleted: 0,
					id: {
						[Op.notIn]: totalCoachIds,
					},
				};

				const coachCoachingDetailsFilters = {
					numberOfWins: {
						[Op.gt]: 1,
					},
					winPercentage: {
						[Op.gt]: 10,
					},
					coachingExperience: {
						[Op.gt]: 1,
					},
					playerDeveRate: {
						[Op.gt]: 10,
					},
				};

				const result = await userService.topCoachesFilter(coachFilters, coachCoachingDetailsFilters, req.body.offset, req.body.limit);
				if (result) {
					// Fetch likes count
					const usersArr = result.users;
					const userIds = usersArr.map((users) => users.id);

					const checkFavoriteUsers = await favouritePlayersCoachesModels.findAll({
						where: {playerOrCoachId: userIds, userId: req.decoded.id},
						raw: true,
					});

					// Map likes count to the result
					const resultWithLikesCount = await Promise.all(usersArr.map(async (user) => {
						const divisionLogo = await programTypesModels.findOne({
							where: {name: user['coachPersonalInformations.programs.division']},
							raw: true,
						});

						const findPhotos = await userPhotosModel.findAll({
							where: {
								userId: user?.id,
								status: 1,
								isDeleted: 0,
							},
							order: [['id', 'DESC']],
            				limit: 3,
							raw: true,
						});

						const findVideos = await userVideoReelsModel.findAll({
							where: {
								userId: user?.id,
								status: 1,
								isDeleted: 0,
							},
							order: [['id', 'DESC']],
            				limit: 3,
							raw: true,
						});

						const findFollowing = await followersModel.findOne({where: {userId: user?.id, followedById: req.decoded.id}, raw: true});

						const checkFavourite = checkFavoriteUsers?.find((item) => item?.playerOrCoachId === user?.id);
						return {...user,
							photos: findPhotos,
							videos: findVideos,
							isFavourite: checkFavourite ? true:false,
							isFollowing: findFollowing ? 1:0,
							divisionLogo: divisionLogo ? divisionLogo?.logo:null,
							colorCode: divisionLogo ? divisionLogo?.colorCode:null,
						};
					}));

					const finalData = {
						totalUsers: result.totalUsers,
						users: resultWithLikesCount,
					};

					return res.status(200).json({status: true, message: 'Top coaches list', data: finalData});
				} else {
					return res.status(403).json({status: false, message: 'Top coaches list not found!'});
				}
			} else {
				console.log('No role id found===============');
				return res.status(403).json({status: false, message: 'Top coaches list not found!'});
			}
		} catch (error) {
			errorService.printError('User Service: topCoachesByPlayerId', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}
	
	/** ***** User Service: Method to get top players or coaches list by role id ******/
	async guestTopUsersListByRoleId(req, res, next){
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');
			const userService = new UserService();

			if(req.body.roleId == 4){

				// Define your filters with conditional logic
				const playerFilters = {
					roleId: 4,
					status: 1,
					isDeleted: 0,
				};

				const playerStatsFilters = {
					ppg: {
						[Op.gt]: 0,
					},
					fgPercentage: {
						[Op.gt]: 0,
					},
					rpg: {
						[Op.gt]: 0,
					},
					apg: {
						[Op.gt]: 0,
					},
				};

				const result = await userService.topPlayersFilter(playerFilters, playerStatsFilters, req.body.offset, req.body.limit);
				if (result) {
					// Fetch likes count
					const usersArr = result.users;
					const userIds = usersArr.map((users) => users.id);

					// Map likes count to the result
					const resultWithLikesCount = await Promise.all(usersArr.map(async (user) => {
						const findPhotos = await userPhotosModel.findAll({
							where: {
								userId: user?.id,
								status: 1,
								isDeleted: 0,
							},
							order: [['id', 'DESC']],
            				limit: 3,
							raw: true,
						});

						const findVideos = await userVideoReelsModel.findAll({
							where: {
								userId: user?.id,
								status: 1,
								isDeleted: 0,
							},
							order: [['id', 'DESC']],
            				limit: 3,
							raw: true,
						});

						return {...user,
							photos: findPhotos,
							videos: findVideos,
							isFavourite: false,
							isFollowing: 0,
						};
					}));

					const finalData = {
						totalUsers: result.totalUsers,
						users: resultWithLikesCount,
					};

					return res.status(200).json({status: true, message: 'Top players list', data: finalData});
				} else {
					return res.status(403).json({status: false, message: 'Top players list not found!'});
				}
			
			} else {

				// Define your filters with conditional logic
				const coachFilters = {
					roleId: 3,
					status: 1,
					isDeleted: 0,
				};

				const coachCoachingDetailsFilters = {
					numberOfWins: {
						[Op.gt]: 1,
					},
					winPercentage: {
						[Op.gt]: 10,
					},
					coachingExperience: {
						[Op.gt]: 1,
					},
					playerDeveRate: {
						[Op.gt]: 10,
					},
				};

				const result = await userService.topCoachesFilter(coachFilters, coachCoachingDetailsFilters, req.body.offset, req.body.limit);
				if (result) {
					// Fetch likes count
					const usersArr = result.users;
					const userIds = usersArr.map((users) => users.id);

					// Map likes count to the result
					const resultWithLikesCount = await Promise.all(usersArr.map(async (user) => {
						const divisionLogo = await programTypesModels.findOne({
							where: {name: user['coachPersonalInformations.programs.division']},
							raw: true,
						});

						const findPhotos = await userPhotosModel.findAll({
							where: {
								userId: user?.id,
								status: 1,
								isDeleted: 0,
							},
							order: [['id', 'DESC']],
            				limit: 3,
							raw: true,
						});

						const findVideos = await userVideoReelsModel.findAll({
							where: {
								userId: user?.id,
								status: 1,
								isDeleted: 0,
							},
							order: [['id', 'DESC']],
            				limit: 3,
							raw: true,
						});

						return {...user,
							photos: findPhotos,
							videos: findVideos,
							isFavourite: false,
							isFollowing: 0,
							divisionLogo: divisionLogo ? divisionLogo?.logo:null,
							colorCode: divisionLogo ? divisionLogo?.colorCode:null,
						};
					}));

					const finalData = {
						totalUsers: result.totalUsers,
						users: resultWithLikesCount,
					};

					return res.status(200).json({status: true, message: 'Top coaches list', data: finalData});
				} else {
					console.log("ofjskfskfskfjskladjd============")
					return res.status(403).json({status: false, message: 'Top coaches list not found!'});
				}

			}
		} catch (error) {
			errorService.printError('User Service: guestTopUsersListByRoleId', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Service: Method to send chat notification ******/
	async sendChatNotifications(req, res, next){
		try {
			// logs
			const date = moment(new Date()).format('DD-MM-YYYY');
			const logFile = `${date}-user_requests.log`;
			logService.writeReqLogFile(logFile, req, 'user_requests');

				const message = {
					token: req.body.fcmToken,
					notification: {
						title: 'Chat Notification!',
						body: req.body.message,
					},
					data: {
						senderId: `${req.body.senderId}`,
						receiverId: `${req.body.receiverId}`,
						notificationType: 'chat',
					},
				};

				console.log('message=======', message);

				firebaseAdmin.messaging().send(message)
					.then((response) => {
						console.log('Successfully sent message:', response);
					})
					.catch((error) => {
						console.log('Error sending message:', error);
					});
			
			return res.status(200).json({status: true, message: 'Chat notification sent successfully'});

		} catch (error) {
			errorService.printError('User Service: sendChatNotifications', error);
			return res.status(500).json({status: false, message: error.message});
		}
	}


}
module.exports = new UserService();
