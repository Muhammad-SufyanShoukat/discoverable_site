'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('tbl_coach_selections', [{
			name: 'Star available player',
			activeIconUrl: 'https://undiscovered-dev-server.s3.us-east-2.amazonaws.com/coach-selection-icons/trophy-svgrepo-com-1.svg',
			inactiveIconUrl: null,
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		{
			name: 'Under recruited player',
			activeIconUrl: 'https://undiscovered-dev-server.s3.us-east-2.amazonaws.com/coach-selection-icons/basketball-svgrepo-com-1.svg',
			inactiveIconUrl: null,
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		{
			name: 'Player to highes acadmies',
			activeIconUrl: 'https://undiscovered-dev-server.s3.us-east-2.amazonaws.com/coach-selection-icons/book-album-svgrepo-com-1.svg',
			inactiveIconUrl: null,
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		{
			name: 'Shootes',
			activeIconUrl: 'https://undiscovered-dev-server.s3.us-east-2.amazonaws.com/coach-selection-icons/target-and-arrow-svgrepo-com-1.svg',
			inactiveIconUrl: null,
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		{
			name: 'Above the rim player',
			activeIconUrl: 'https://undiscovered-dev-server.s3.us-east-2.amazonaws.com/coach-selection-icons/jump-1.svg',
			inactiveIconUrl: null,
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		{
			name: 'Point guard',
			activeIconUrl: 'https://undiscovered-dev-server.s3.us-east-2.amazonaws.com/coach-selection-icons/running-1.svg',
			inactiveIconUrl: null,
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('tbl_coach_selections', null, {});
	},
};
