'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('tbl_player_personality_questions', [{
			questions: 'How would you describe your coaching philosophy, and what values do you prioritize in your players?',
			choices: ['Emphasizing teamwork and discipline', 'Focusing on individual player development', 'Balancing strategic play and creativity'],
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		{
			questions: 'Can you share insights into the team\'s playing style and how it aligns with my strengths as a player?',
			choices: ['Fast-paced and aggressive', 'Possession-oriented and tactical', 'Adaptable to different game scenarios'],
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		{
			questions: 'How do you support the individual development of players throughout their college careers?',
			choices: ['Individualized skill sessions with coaches', 'Access to state-of-the-art training facilities', 'Integration of sports psychology and mental conditioning'],
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		{
			questions: 'What type of team culture do you aim to foster, and how do you see me contributing to that culture?',
			choices: ['Strong emphasis on leadership and camaraderie', 'Supportive and inclusive team culture', 'Competitive but respectful environment'],
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		{
			questions: 'How does your coaching staff support players academically, and what resources are available for student-athletes?',
			choices: ['Dedicated academic advisors for student-athletes', 'Tutoring services and study group initiatives', 'Flexible schedules to accommodate academic commitments'],
			status: '1',
			isDeleted: '0',
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('tbl_player_personality_questions', null, {});
	},
};
