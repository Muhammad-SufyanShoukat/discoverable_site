const express = require('express');
const router = express.Router();
const {AuthController} = require('../controller/index.js');
const {AuthDataValidator} = require('../middleware/dataValidator/index');
const {ApiAuthValidator} = require('../middleware/authValidator/index');

router.post('/user/login',
/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API for user login',
    schema: {
        $email: 'demo@yopmail.com',
        $password: 'Abc@123',
    }
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}

#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
 #swagger.responses[400] = {
  description: 'Validation error'
 }
*/
	AuthDataValidator.userLogin, AuthController.userLogin);

router.post('/user/social_login',
/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API for user login',
    schema: {
        $firstName: 'New',
        $lastName: 'Coach1',
        $countryCode: '+91',
        $phone: '9876543210',
        $email: 'demo@yopmail.com',
        $socialId: '1234TestSocialID',
        $registrationType: 'google',
        $platformType: 'ios',
        $deviceId: '123456789XYZ',
        $platformVersion: 'v1.0.0'
    }
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}

#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
 #swagger.responses[400] = {
  description: 'Validation error'
 }
*/
	AuthDataValidator.socialLogin, AuthController.socialLogin);
router.post('/user/generate_access_token', ApiAuthValidator.validateRefreshToken, AuthController.generateAccessToken);
router.post('/admin/login',
/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API for admin login',
    schema: {
        $email: 'admin@yopmail.com',
        $password: 'Abc@123',
    }
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
 #swagger.responses[400] = {
  description: 'Validation error'
 }
*/
	AuthDataValidator.adminLogin, AuthController.adminLogin);
router.post('/admin/generate_access_token', ApiAuthValidator.validateRefreshToken, AuthController.generateAccessToken);

router.post('/user/signup_user',
/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API for signup user',
    schema: {
        $firstName: 'New',
        $lastName: 'Coach1',
        $countryCode: '+91',
        $phone: '9876543210',
        $email: 'demo@yopmail.com',
        $password: 'Abc@123'
        $registrationType: 'google',
        $platformType: 'ios',
        $deviceId: '123456789XYZ',
        $platformVersion: 'v1.0.0'
    }
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
 #swagger.responses[400] = {
  description: 'Validation error'
 }
*/
	AuthDataValidator.signupUser, AuthController.signupUser);

router.post('/user/validate_forgot_password_otp',
	/* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'API for validating otp',
        schema: {
            $phone: 9876543210,
            $email: 'demo@yopmail.com',
            $otp: 12345
        }
    }
    #swagger.parameters['x-api-key'] = {
          in: 'header',
          description: 'X-API key is required',
          required: true,
          type: 'string',
    }
    #swagger.parameters['platform'] = {
          in: 'header',
          description: 'Platform is required',
          required: true,
          type: 'string',
    }
    #swagger.responses[200] = {
      description: 'Success'
     }
     #swagger.responses[500] = {
      description: 'Internal server error'
     }
     #swagger.responses[404] = {
      description: 'Not found'
     }
     #swagger.responses[400] = {
      description: 'Validation error'
     }
    */
	AuthDataValidator.validateForgotPasswordOtp, AuthController.validateForgotPasswordOtp);

router.get('/user/coach_primary_goals_list',
	/* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'API for coach primary goals list',
    }
    #swagger.parameters['x-api-key'] = {
          in: 'header',
          description: 'X-API key is required',
          required: true,
          type: 'string',
    }
    #swagger.parameters['platform'] = {
          in: 'header',
          description: 'Platform is required',
          required: true,
          type: 'string',
    }
    #swagger.responses[200] = {
      description: 'Success'
     }
     #swagger.responses[500] = {
      description: 'Internal server error'
     }
     #swagger.responses[404] = {
      description: 'Not found'
     }
     #swagger.responses[400] = {
      description: 'Validation error'
     }
    */
	AuthController.coachPrimaryGoalsList);

router.get('/user/coach_selections_list',
	/* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'API for coach selections list',
    }
    #swagger.parameters['x-api-key'] = {
          in: 'header',
          description: 'X-API key is required',
          required: true,
          type: 'string',
    }
    #swagger.parameters['platform'] = {
          in: 'header',
          description: 'Platform is required',
          required: true,
          type: 'string',
    }
    #swagger.responses[200] = {
      description: 'Success'
     }
     #swagger.responses[500] = {
      description: 'Internal server error'
     }
     #swagger.responses[404] = {
      description: 'Not found'
     }
     #swagger.responses[400] = {
      description: 'Validation error'
     }
    */
	AuthController.coachSelectionsList);

router.get('/user/player_primary_goals_list',
	/* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'API for primary goals list',
    }
    #swagger.parameters['x-api-key'] = {
          in: 'header',
          description: 'X-API key is required',
          required: true,
          type: 'string',
    }
    #swagger.parameters['platform'] = {
          in: 'header',
          description: 'Platform is required',
          required: true,
          type: 'string',
    }
    #swagger.responses[200] = {
      description: 'Success'
     }
     #swagger.responses[500] = {
      description: 'Internal server error'
     }
     #swagger.responses[404] = {
      description: 'Not found'
     }
     #swagger.responses[400] = {
      description: 'Validation error'
     }
    */
	AuthController.playerPrimaryGoalsList);

router.get('/user/player_selections_list',
	/* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'API for player selections list',
    }
    #swagger.parameters['x-api-key'] = {
          in: 'header',
          description: 'X-API key is required',
          required: true,
          type: 'string',
    }
    #swagger.parameters['platform'] = {
          in: 'header',
          description: 'Platform is required',
          required: true,
          type: 'string',
    }
    #swagger.responses[200] = {
      description: 'Success'
     }
     #swagger.responses[500] = {
      description: 'Internal server error'
     }
     #swagger.responses[404] = {
      description: 'Not found'
     }
     #swagger.responses[400] = {
      description: 'Validation error'
     }
    */
	AuthController.playerSelectionsList);

router.get('/user/splash_screens_list',
	/* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'API for splash screens list',
    }
    #swagger.parameters['x-api-key'] = {
          in: 'header',
          description: 'X-API key is required',
          required: true,
          type: 'string',
    }
    #swagger.parameters['platform'] = {
          in: 'header',
          description: 'Platform is required',
          required: true,
          type: 'string',
    }
    #swagger.responses[200] = {
      description: 'Success'
     }
     #swagger.responses[500] = {
      description: 'Internal server error'
     }
     #swagger.responses[404] = {
      description: 'Not found'
     }
     #swagger.responses[400] = {
      description: 'Validation error'
     }
    */
	AuthController.splashScreensList);

router.post('/user/send_forgot_password_otp',
	/* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'API for sending forgot password otp',
        schema: {
            $email: 'demo@yopmail.com',
        }
    }
    #swagger.parameters['x-api-key'] = {
          in: 'header',
          description: 'X-API key is required',
          required: true,
          type: 'string',
    }
    #swagger.parameters['platform'] = {
          in: 'header',
          description: 'Platform is required',
          required: true,
          type: 'string',
    }
    #swagger.responses[200] = {
      description: 'Success'
     }
     #swagger.responses[500] = {
      description: 'Internal server error'
     }
     #swagger.responses[404] = {
      description: 'Not found'
     }
     #swagger.responses[400] = {
      description: 'Validation error'
     }
    */
	AuthDataValidator.sendForgotPasswordOtp, AuthController.sendForgotPasswordOtp);

module.exports = router;
