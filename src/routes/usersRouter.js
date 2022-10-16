import express from "express";

import * as usersControllers from '../controllers/users.controllers.js'

const usersRouter = express.Router();

usersRouter.get('/users/me', usersControllers.returnUser); //authenticated

export default usersRouter;