'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('tbl_roles', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING(50),
				allowNull: true,
				unique: true,
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
		return queryInterface.dropTable('tbl_roles');
	},
};
