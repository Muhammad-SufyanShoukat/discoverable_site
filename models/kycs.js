const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const kycs = sequelize.define('tbl_kycs', {
	id: {
		type: Sequelize.BIGINT,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	userId: {
		type: Sequelize.BIGINT,
		allowNull: false,
		references: {
			model: 'tbl_users',
			key: 'id',
		},
	},
	issuingCountry: {
		type: Sequelize.STRING(255),
		allowNull: true,
	},
	passportFrontUrl: {
		type: Sequelize.TEXT,
		allowNull: true,
	},
	passportBackUrl: {
		type: Sequelize.TEXT,
		allowNull: true,
	},
	isPassportVerified: {
		type: Sequelize.ENUM('Pending', 'Verified', 'Rejected'),
		allowNull: true,
		// defaultValue: 'Pending',
	},
	passportComments: {
		type: Sequelize.TEXT,
		allowNull: true,
	},

	idCardFrontUrl: {
		type: Sequelize.TEXT,
		allowNull: true,
	},
	idCardBackUrl: {
		type: Sequelize.TEXT,
		allowNull: true,
	},
	isIdCardVerified: {
		type: Sequelize.ENUM('Pending', 'Verified', 'Rejected'),
		allowNull: true,
		// defaultValue: 'Pending',
	},
	idCardComments: {
		type: Sequelize.TEXT,
		allowNull: true,
	},

	drivingLicenseFrontUrl: {
		type: Sequelize.TEXT,
		allowNull: true,
	},
	drivingLicenseBackUrl: {
		type: Sequelize.TEXT,
		allowNull: true,
	},
	isDrivingLicenseVerified: {
		type: Sequelize.ENUM('Pending', 'Verified', 'Rejected'),
		allowNull: true,
		// defaultValue: 'Pending',
	},
	drivingLicenseComments: {
		type: Sequelize.TEXT,
		allowNull: true,
	},

	selfieUrl: {
		type: Sequelize.TEXT,
		allowNull: true,
	},
	isSelfieVerified: {
		type: Sequelize.ENUM('Pending', 'Verified', 'Rejected'),
		allowNull: true,
		// defaultValue: 'Pending',
	},
	selfieComments: {
		type: Sequelize.TEXT,
		allowNull: true,
	},
	status: {
		type: Sequelize.TINYINT(1),
		allowNull: false,
		defaultValue: 1,
	},
	isDeleted: {
		type: Sequelize.TINYINT(1),
		allowNull: false,
		defaultValue: 0,
	},
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
});

module.exports = kycs;
