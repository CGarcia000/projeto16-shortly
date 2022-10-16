import express from "express";

import * as urlControllers from '../controllers/url.controllers.js'

import { authenticateToken } from "../middleware/authorizations.middleware.js";

const urlRouter = express.Router();

urlRouter.post('/urls/shorten', authenticateToken, urlControllers.urlShorten); //authenticated
urlRouter.get('/urls/:id', urlControllers.returnUrl);

urlRouter.get('/urls/open/:shortUrl', urlControllers.redirectUrl);

urlRouter.delete('/urls/:id', authenticateToken, urlControllers.deleteUrl); //authenticated


export default urlRouter;