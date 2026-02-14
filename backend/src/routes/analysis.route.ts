import express from "express";
import middleware from "../middleware/middleware";
import rateLimiter from "../middleware/ratelimiter";
import cachs from "../middleware/cach.admin";
import { getAnalysisData } from "../Controller/analysis.controller";

const router = express.Router();

router.get('/data',rateLimiter(10,40),cachs,middleware,getAnalysisData)

export default router;