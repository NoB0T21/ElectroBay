import express from "express";
import multer from "multer";
import { addproduct, Createorder, getorder, getproduct, getproductbyId, getproductbyType } from "../Controller/product.controller";
import middleware from "../middleware/middleware";
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() })

router.post('/Add',upload.array('file'),addproduct)
router.get('/Get',middleware,getproduct)
router.get('/:type',middleware,getproductbyType)
router.get('/item/:id',middleware,getproductbyId)
router.post('/order',middleware,Createorder)
router.get('/order/get',middleware,getorder)

export default router;