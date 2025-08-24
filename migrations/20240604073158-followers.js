'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('tbl_followers', {
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
			followedById: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: 'tbl_users',
					key: 'id',
				},
			},
			followStatus: {
				type: Sequelize.ENUM('Pending', 'Accepted', 'Declined'),
				allowNull: false,
				defaultValue: 'Pending',
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
		return queryInterface.dropTable('tbl_followers');
	},
};
