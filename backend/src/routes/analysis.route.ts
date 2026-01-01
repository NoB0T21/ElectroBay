import express from "express";
import middleware from "../middleware/middleware";
import { getAnalysisData } from "../Controller/analysis.controller";

const router = express.Router();

router.get('/data',middleware,getAnalysisData)

export default router;