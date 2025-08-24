'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('tbl_coach_coaching_details', {
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
			aboutMe: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
      		numberOfWins: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
      		winPercentage: {
				type: Sequelize.FLOAT,
				allowNull: true,
			},
			coachingExperience: {
				type: Sequelize.FLOAT,
				allowNull: true,
			},
     		playerDeveRate: {
				type: Sequelize.FLOAT,
				allowNull: true,
			},
      		specializingRoleId: {
				type: Sequelize.BIGINT,
				allowNull: true,
			},
      		coachingHistory: {
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
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('tbl_coach_coaching_details');
	},
};
