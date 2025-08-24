'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('tbl_coach_roles', [{
			name: 'Head Coach',
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		{
			name: 'Assistant Coach',
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		{
			name: 'Player',
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('tbl_coach_roles', null, {});
	},
};
