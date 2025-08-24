'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('tbl_coach_personal_informations', {
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
			currentProgramId: {
				type: Sequelize.BIGINT,
				allowNull: true,
			},
			coachRoleId: {
				type: Sequelize.BIGINT,
				allowNull: true,
			},
			educationSchool: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			educationYear: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			educationHistory: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			email: {
				type: Sequelize.STRING(100),
				allowNull: true,
			},
			birthplace: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			dob: {
				type: Sequelize.DATEONLY,
				allowNull: true,
			},
			currentLocation: {
				type: Sequelize.TEXT,
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
			twitterSocialProfile: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			instagramSocialProfile: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			facebookSocialProfile: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			youtubeProfile: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			videoUrl: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			countryCode: {
				type: Sequelize.STRING(5),
				allowNull: true,
			},
			phoneNumber: {
				type: Sequelize.BIGINT,
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
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('tbl_coach_personal_informations');
	},
};
