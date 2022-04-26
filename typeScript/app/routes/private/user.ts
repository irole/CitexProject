/* eslint-disable import/extensions */
import express from 'express';
import passport from 'passport';

const router = express.Router();

import ProfileController from "../../controllers/user/ProfileController";
import registerValidator from "../../validators/api/public/auth/RegisterValidator";
import validateRequest from "../../middlewares/ValidateRequest";


router.get('/:id', ProfileController.index);
router.delete('/:id/delete', ProfileController.destroy);
router.put('/:id/update',registerValidator.handle(), validateRequest.handle, ProfileController.update);
// router.put('/:id/update', registerValidator.handle(), validateRequest.handle, ProfileController.update);

export {router as userRouter};
