const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const commonConfig = require('./config/common.config');
const {ApiAuthValidator} = require('./middleware/authValidator/index');
const indexRouter = require('./routes/index');
const fileUpload = require('express-fileupload');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const {AuthController, UserController} = require('./controller/index.js');
const {UserService} = require('./services/index.js');

global.appRoot = path.resolve(__dirname);

const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(fileUpload());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse requests of content-type: application/json
app.use(bodyParser.json({limit: '50mb'}));

app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.static(path.join(__dirname, './.well-known')));

// ios app links
app.get('/.well-known/apple-app-site-association', (req, res) => {
    res.sendFile(path.join(__dirname, './.well-known', 'apple-app-site-association'));
});

// android app links
app.get('/.well-known/assetlinks.json', (req, res) => {
    res.sendFile(path.join(__dirname, './.well-known', 'assetlinks.json'));
});

// index route
app.get('/', (req, res) => {
	res.json({message: 'Welcome to Undiscovered Recruits APIs.'});
});

app.get('/verification', (req, res) => {
	res.sendFile(path.join(__dirname, './templates/verification_page.html'));
});

app.post('/users/validate_verification_code/:verificationCode',	AuthController.validateVerificationCode);

// Schools List
app.post('/university/schools_list', AuthController.schoolsList);

// Profile deep link
app.get('/users/profile/:userId', UserService.profileDeepLink);

// Video reels deep link
app.get('/users/videos/:videoReelId', UserService.videosDeepLink);

app.use('/api/'+commonConfig.API_VERSION, ApiAuthValidator.validateApiKey, indexRouter);

// swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	res.status(404).json({status: false, message: '404! Not Found'});
});

// error handler
app.use(function(err, req, res, next) {
	console.log(err);
	res.status(400).json({status: false, message: '400! Bad Request', errors: err.errors});
});

app.listen(process.env.PORT || '2027', () => {
	console.log(`Server is running on port: ${process.env.PORT || '2027'}`);
});

