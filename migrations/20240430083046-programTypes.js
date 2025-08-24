'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('tbl_program_types', {
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
			logo: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			colorCode: {
				type: Sequelize.STRING(25),
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
		return queryInterface.dropTable('tbl_program_types');
	},
};
