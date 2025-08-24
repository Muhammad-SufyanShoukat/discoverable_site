'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('tbl_player_primary_goals', [{
			name: 'Discover Coaches',
			activeIconUrl: 'https://undiscovered-dev-server.s3.us-east-2.amazonaws.com/primary-goal-icons/search-zoom-in.svg',
			inactiveIconUrl: null,
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		{
			name: 'Expand Program Options',
			activeIconUrl: 'https://undiscovered-dev-server.s3.us-east-2.amazonaws.com/primary-goal-icons/school-svgrepo-com+1.svg',
			inactiveIconUrl: null,
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		{
			name: 'Stay Informed about Events',
			activeIconUrl: 'https://undiscovered-dev-server.s3.us-east-2.amazonaws.com/primary-goal-icons/Group.svg',
			inactiveIconUrl: null,
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		{
			name: 'Connect with Peers',
			activeIconUrl: 'https://undiscovered-dev-server.s3.us-east-2.amazonaws.com/primary-goal-icons/Vector.svg',
			inactiveIconUrl: null,
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('tbl_player_primary_goals', null, {});
	},
};
