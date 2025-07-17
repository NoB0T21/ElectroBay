import { login, register, valid } from "../Controller/user.controller";
import express from "express";
import multer from "multer";
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() })

router.post('/signup',upload.single('file'),register)
router.post('/signin',upload.none(),login)
router.get('/valid',valid)

export default router;