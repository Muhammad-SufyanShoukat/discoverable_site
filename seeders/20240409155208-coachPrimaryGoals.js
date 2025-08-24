'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('tbl_coach_primary_goals', [{
			name: 'Find Recruits',
			activeIconUrl: 'https://undiscovered-dev-server.s3.us-east-2.amazonaws.com/coach-primary-goal-icons/search-zoom-in-1.svg',
			inactiveIconUrl: null,
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		{
			name: 'Get My School Exposure',
			activeIconUrl: 'https://undiscovered-dev-server.s3.us-east-2.amazonaws.com/coach-primary-goal-icons/school-svgrepo-com-1.svg',
			inactiveIconUrl: null,
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		{
			name: 'Promote My Events',
			activeIconUrl: 'https://undiscovered-dev-server.s3.us-east-2.amazonaws.com/coach-primary-goal-icons/promotion-svgrepo-com-1.svg',
			inactiveIconUrl: null,
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		{
			name: 'Network',
			activeIconUrl: 'https://undiscovered-dev-server.s3.us-east-2.amazonaws.com/coach-primary-goal-icons/global-1.svg',
			inactiveIconUrl: null,
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('tbl_coach_primary_goals', null, {});
	},
};
