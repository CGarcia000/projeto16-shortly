import express from "express";

import * as usersControllers from '../controllers/users.controllers.js'

import { authenticateToken } from "../middleware/authorizations.middleware.js";

const usersRouter = express.Router();

usersRouter.get('/users/me', authenticateToken, usersControllers.returnUser); //authenticated

export default usersRouter;