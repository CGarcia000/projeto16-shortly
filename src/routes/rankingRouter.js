import express from "express";

import * as rankingController from '../controllers/ranking.controllers.js'

const rankingRouter = express.Router();

rankingRouter.get('/ranking', rankingController.returnRanking); // authenticated



export default rankingRouter;