'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('tbl_program_types', [{
			name: 'College',
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		{
			name: 'High school',
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		{
			name: 'Professional',
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('tbl_program_types', null, {});
	},
};
