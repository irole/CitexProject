/* eslint-disable import/extensions */
import express from 'express';


const router = express.Router();

// Middleware
// eslint-disable-next-line
import validateRequest from '../../middlewares/ValidateRequest';
// Validators
import registerValidator from '../../validators/api/public/auth/RegisterValidator';
import loginValidator from "../../validators/api/public/auth/LoginValidator";
// Controllers
import registerController from "../../controllers/auth/RegisterController";
import loginController from "../../controllers/auth/LoginController";


router.post('/register', registerValidator.handle(), validateRequest.handle, registerController.process);
router.post('/login', loginValidator.handle(), validateRequest.handle, loginController.process);


router.get('/logout', (req: any, res: any) => {
    req.logout();
    res.clearCookie('jwt-token');
    res.json('logout');
});
export {router as authRouter};
