import express from "express";
import middleware from "../middleware/middleware";
import { addtocart, getcart, subtocart } from "../Controller/cart.controller";
const router = express.Router();

router.get('/get',middleware,getcart)
router.get('/remove1/:id',middleware,subtocart)
router.get('/:id',middleware,addtocart)

export default router;