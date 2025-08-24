'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('tbl_users', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			firstName: {
				type: Sequelize.STRING(50),
				allowNull: true,
			},
			lastName: {
				type: Sequelize.STRING(50),
				allowNull: true,
			},
			countryCode: {
				type: Sequelize.STRING(5),
				allowNull: true,
			},
			phone: {
				type: Sequelize.BIGINT,
				allowNull: true,
				unique: true,
			},
			email: {
				type: Sequelize.STRING(100),
				allowNull: true,
				unique: true,
			},
			password: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			roleId: {
				type: Sequelize.BIGINT,
				allowNull: true,
				references: {
					model: 'tbl_roles',
					key: 'id',
				},
			},
			socialId: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			registrationType: {
				type: Sequelize.ENUM('email', 'phone', 'google', 'apple', 'facebook'),
				allowNull: true,
				defaultValue: 'email',
			},
			platformType: {
				type: Sequelize.ENUM('web', 'ios', 'android'),
				allowNull: true,
				defaultValue: 'web',
			},
			platformVersion: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			deviceId: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			fcmToken: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			profilePictureUrl: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			playingPosition: {
				type: Sequelize.ENUM('PG', 'SG', 'SF', 'PF', 'C'),
				allowNull: true,
			},
			type: {
				type: Sequelize.ENUM('WBB', 'MBB'),
				allowNull: true,
			},
			gender: {
				type: Sequelize.ENUM('Male', 'Female'),
				allowNull: true,
			},
			latitude: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			longitude: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			address: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			primaryGoalIds: {
				type: Sequelize.JSON,
				allowNull: true,
			},
			selectionIds: {
				type: Sequelize.JSON,
				allowNull: true,
			},
			isKycCompleted: {
				type: Sequelize.TINYINT(1),
				allowNull: false,
				defaultValue: 0,
			},
			isKycApproved: {
				type: Sequelize.TINYINT(1),
				allowNull: false,
				defaultValue: 0,
			},
			isRegistrationCompleted: {
				type: Sequelize.TINYINT(1),
				allowNull: false,
				defaultValue: 0,
			},
			verificationCode: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			isVerified: {
				type: Sequelize.TINYINT(1),
				allowNull: false,
				defaultValue: 0,
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
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('tbl_users');
	},
};
