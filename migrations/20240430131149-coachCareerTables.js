'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('tbl_coach_career_tables', {
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
			year: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			coachRoleId: {
				type: Sequelize.BIGINT,
				allowNull: true,
			},
			team: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			division: {
				type: Sequelize.STRING(50),
				allowNull: true,
			},
			result: {
				type: Sequelize.STRING(255),
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
		return queryInterface.dropTable('tbl_coach_career_tables');
	},
};
