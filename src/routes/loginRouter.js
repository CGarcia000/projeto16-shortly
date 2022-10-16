import express from "express";

import * as loginController from '../controllers/login.controllers.js'

const loginRouter = express.Router();

loginRouter.post('/signup', loginController.signUp);

loginRouter.post('/signin', loginController.signIn);


export default loginRouter;