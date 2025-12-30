import { login, register, valid } from "../Controller/user.controller";
import express from "express";
import multer from "multer";
import rateLimiter from "../middleware/ratelimiter";
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() })

router.post('/signup',rateLimiter(10,2),upload.single('file'),register)
router.post('/signin',rateLimiter(10,2),upload.none(),login)
router.get('/valid',valid)

export default router;