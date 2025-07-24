import { Request, Response } from "express"
import product from "../models/product.model"
import order from "../models/order.model"
import uuid4 from "uuid4"
import supabase from "../Db/supabase"

interface File {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    buffer: Buffer,
    size: number,
}

export const addproduct = async (req:Request,res:Response) => {
    const {name,description,productType,price,offerprice} = req.body
    const files= req.files as File[];
    if(!name||!description||!productType||!price||!offerprice){
        return res.status(400).json({
            message: 'Require all fields',
            success: false
        })
    }

    try {
        const existingProduct = await product.findOne({name})
        if(existingProduct){
            return res.status(202).json({
                message: "Product already exists",
                success: false,
        })}

        const uploadedImages: { url: string; path: string }[] = [];

        for (const file of files) {
            const cleanName = file.originalname.split(" ").join("");
            const uniqueFilename = `${uuid4()}-${cleanName}`;

            const { data, error } = await supabase.storage
                .from(`${process.env.BUCKET}`)
                .upload(uniqueFilename, file.buffer, {
                    contentType: file.mimetype,
                    cacheControl: "3600",
                    upsert: false,
                });

            if (error) {
                return res.status(500).json({
                message: "Image Upload Failed",
                success: false,
                });
            }

            const publicUrlData = await supabase.storage
                .from(`${process.env.BUCKET}`)
                .getPublicUrl(uniqueFilename);

            uploadedImages.push({
                url: publicUrlData.data.publicUrl,
                path: uniqueFilename,
            });
        }

        const user = await product.create({
            productType: productType,
            name: name,
            description: description,
            price: price,
            offerprice:offerprice,
            images:uploadedImages,
        })
        if(!user){
            return res.status(500).json({
                message: "Some Error occure",
                success: false,
        })}

        return res.status(201).json({
            message: "Product added successfully",
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

export const getproduct = async (req:Request,res:Response) => {
    try {
        const products = await product.find({})
        return res.status(201).json({
            message: "here is your Products",
            products,
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

export const getproductbyType = async (req:Request,res:Response) => {
    const productType = req.params.type
    let sortedFiles
    let sort =typeof req.query?.sort === 'string' ? req.query.sort : '';

    if(!productType){
        return res.status(400).json({
            message: 'Require all fields',
            success: false
        })
    }

    try {
        const products = await product.find({productType})
        if (sort==='A-Zasc') {
            sortedFiles = products.sort((a:any, b:any) => 
                a.name.localeCompare(b.name)
            );
        }else if(sort==='A-Zdesc') {
            sortedFiles = products.sort((a:any, b:any) => 
                b.name.localeCompare(a.name)
            );
        }else if(sort==='Price-desc') {
            sortedFiles = products.sort((a:any, b:any) =>
                b.price - a.price
            );
        }else if(sort==='Price-asc') {
            sortedFiles = products.sort((a:any, b:any) =>
                a.price - b.price
            );
        } else {
            sortedFiles = products
        }

        return res.status(201).json({
            message: "here is your Products",
            products:sortedFiles,
            success: true,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

export const getproductbyId = async (req:Request,res:Response) => {
    const productId = req.params.id
    if(!productId){
        return res.status(400).json({
            message: 'Require all fields',
            success: false
        })
    }

    try {
        const products = await product.findById({_id:productId})
        return res.status(201).json({
            message: "here is your Products",
            products,
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

export const Createorder = async (req:Request,res:Response) => {
    const userId = req.user._id
    const {productId,productName,price} = req.body
    const {Fullname,PhoneNo,Pincode,Address,City,State} = req.body.formData
    if(!Fullname || !PhoneNo || !Pincode || !Address || !City || !State || !productName || !price){
        return res.status(400).json({
            message: 'Require all fields',
            success: false
        })
    }

    try {
        const orders = await order.create({
            userId,
            productId,
            productName,
            Fullname,
            PhoneNo,
            Pincode,
            Address,
            City,
            State,
            price
        })
        return res.status(201).json({
            message: "Your Order has been Placed",
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

export const getorder = async (req:Request,res:Response) => {
    const userId = req.user._id
    if(!userId){
        return res.status(400).json({
            message: 'Require all fields',
            success: false
        })
    }

    try {
        const orders = await order.find({
            userId
        })
        return res.status(201).json({
            message: "here is your Orders",
            orders,
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

export const getallorder = async (req:Request,res:Response) => {
    try {
        const orders = await order.find()
        return res.status(201).json({
            message: "here is your Orders",
            orders,
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

export const updateorder = async (req:Request,res:Response) => {
    const orderId = req.params.id
    const {payment} = req.body
    if(!orderId || !payment){
        return res.status(400).json({
            message: 'Require all fields',
            success: false
        })
    }

    try {
        const orders = await order.findOneAndUpdate({_id:orderId},{payment})
        return res.status(201).json({
            message: "here is your Products",
            orders,
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}