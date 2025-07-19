import { json, Request, Response } from "express"
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
                message: "product already exists",
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
            message: "File upload failed",
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
    try {
        const products = await product.find({productType})
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

export const getproductbyId = async (req:Request,res:Response) => {
    const productId = req.params.id
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
    try {
        const products = await order.create({
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
            message: "here is your Products",
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
    try {
        const products = await order.find({
            userId
        })
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