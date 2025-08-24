const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js'];
const dotenv = require('dotenv');
dotenv.config();

const doc = {
	info: {
		version: '1.0.0',
		title: '',
		description: 'Api Documentation of Undiscovered Recruits',
	},
	host: `localhost:${process.env.PORT}`,
	basePath: '/api/v1/',
	schemes: ['http', 'https'],
	consumes: ['application/json'],
	produces: ['application/json'],
	servers: [
		{
			url: 'http://localhost:2027/',
			description: 'Local Sever',
		},
	],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {});
