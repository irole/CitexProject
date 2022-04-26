// Packages
import express from 'express';
import {userRouter} from "./user";

const router = express.Router();

// Routes
router.use('/user', userRouter);

export {router as privateRouter};
