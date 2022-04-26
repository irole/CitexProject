/* eslint-disable import/extensions */
import express from 'express';
import passport from 'passport';

const router = express.Router();

import ProfileController from "../../controllers/user/ProfileController";
import registerValidator from "../../validators/api/public/auth/RegisterValidator";
import validateRequest from "../../middlewares/ValidateRequest";


router.get('/:userId', ProfileController.index);
router.delete('/:userId', ProfileController.destroy);
router.put('/:userId',registerValidator.handle(), validateRequest.handle, ProfileController.update);

export {router as userRouter};
