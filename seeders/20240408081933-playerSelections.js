'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('tbl_player_selections', [{
			name: 'College Coaches',
			activeIconUrl: 'https://undiscovered-dev-server.s3.us-east-2.amazonaws.com/player-selection-icons/teacher.svg',
			inactiveIconUrl: null,
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		{
			name: 'Prep School Coaches',
			activeIconUrl: 'https://undiscovered-dev-server.s3.us-east-2.amazonaws.com/player-selection-icons/Page-1.svg',
			inactiveIconUrl: null,
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		{
			name: 'High School Coaches',
			activeIconUrl: 'https://undiscovered-dev-server.s3.us-east-2.amazonaws.com/player-selection-icons/Group-1.svg',
			inactiveIconUrl: null,
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		{
			name: 'AAU Coaches',
			activeIconUrl: 'https://undiscovered-dev-server.s3.us-east-2.amazonaws.com/player-selection-icons/Trophy.svg',
			inactiveIconUrl: null,
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('tbl_player_selections', null, {});
	},
};
