import express from "express";
import multer from "multer";
import { addproduct, Createorder, getallorder, getorder, getproduct, getproductbyId, getproductbyType, homepageData, updateorder, updatepayment, updateproduct } from "../Controller/product.controller";
import middleware from "../middleware/middleware";
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() })

router.post('/Add',upload.array('file'),addproduct)
router.put('/update/:id',upload.array('file'),updateproduct)
router.get('/Get',middleware,getproduct)
router.get('/homepage',middleware,homepageData)
router.get('/item/:id',middleware,getproductbyId)
router.post('/order',middleware,Createorder)
router.get('/order/get',middleware,getorder)
router.get('/adminorder/get',middleware,getallorder)
router.patch('/updateorder/:id',middleware,updateorder)
router.patch('/updatepayment/:id',middleware,updatepayment)
router.get('/:type',middleware,getproductbyType)

export default router;