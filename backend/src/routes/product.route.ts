import express from "express";
import multer from "multer";
import { addproduct, Createorder, getallorder, getorder, getproduct, getproductbyId, getproductbyType, homepageData, updateorder, updatepayment, updateproduct, updatesale, updatesale2 } from "../Controller/product.controller";
import middleware from "../middleware/middleware";
import cachs from "../middleware/cach.data";
import rateLimiter from "../middleware/ratelimiter";
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() })

router.post('/Add',upload.array('file'),addproduct)
router.post('/sale1/123',upload.single('file'),updatesale)
router.post('/sale2/123',upload.array('file'),updatesale2)
router.put('/update/:id',upload.array('file'),updateproduct)
router.get('/Get',rateLimiter(10,2),middleware,getproduct)
router.get('/homepage',rateLimiter(10,2),cachs,middleware,homepageData)
router.get('/item/:id',middleware,getproductbyId)
router.post('/order',middleware,Createorder)
router.get('/order/get',middleware,getorder)
router.get('/adminorder/get',middleware,getallorder)
router.patch('/updateorder/:id',middleware,updateorder)
router.patch('/updatepayment/:id',middleware,updatepayment)
router.get('/:type',rateLimiter(10,3),middleware,getproductbyType)

export default router;