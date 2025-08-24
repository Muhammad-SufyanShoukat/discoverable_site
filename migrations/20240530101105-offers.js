'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('tbl_offers', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			coachId: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: 'tbl_users',
					key: 'id',
				},
			},
			programId: {
				type: Sequelize.BIGINT,
				allowNull: false,
			},
			userId: {
				type: Sequelize.BIGINT,
				allowNull: true,
				references: {
					model: 'tbl_users',
					key: 'id',
				},
			},
			requestStatus: {
				type: Sequelize.ENUM('Offered', 'Requested', 'Committed', 'Declined', 'Cancelled'),
				allowNull: true,
			},
	  requestedById: {
				type: Sequelize.BIGINT,
				allowNull: true,
				references: {
					model: 'tbl_users',
					key: 'id',
				},
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
		return queryInterface.dropTable('tbl_offers');
	},
};
