'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('tbl_splash_screens', [{
			title: null,
			body: null,
			backgroundImageUrl: 'https://undiscovered-dev-server.s3.us-east-2.amazonaws.com/splash-screens/splash-screen-1.png',
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		{
			title: 'Welcome to Undiscovered Recruits',
			body: 'Discover top basketball talent and streamline your recruiting process with our powerful app. Let\'s get started',
			backgroundImageUrl: 'https://undiscovered-dev-server.s3.us-east-2.amazonaws.com/splash-screens/splash-screen-2.jpeg',
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		{
			title: 'Explore Basketball Prospects',
			body: 'Browse through detailed player profiles, including stats, highlights, and personal information. Find the perfect fit for your team!',
			backgroundImageUrl: 'https://undiscovered-dev-server.s3.us-east-2.amazonaws.com/splash-screens/splash-screen-3.png',
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		{
			title: 'Effortless Recruitment',
			body: 'Utilize our advanced recruitment tools to schedule tryouts, communicate with prospects, and track your recruiting progress seamlessly.',
			backgroundImageUrl: 'https://undiscovered-dev-server.s3.us-east-2.amazonaws.com/splash-screens/splash-screen-4.png',
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('tbl_splash_screens', null, {});
	},
};
