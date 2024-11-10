import express from "express";
import {loginController, registerController, testController} from '../controllers/authController.js'
import { requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routing

//Register
router.post('/register',registerController);
//LOGIN || POST
router.post('/login',loginController);

//test routes
router.get('/test',requireSignIn,testController)
export default router;
