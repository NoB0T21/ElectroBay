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

interface Data {
    product: string,
    _id: string,
    quantity: number,
}

export const addproduct = async (req:Request,res:Response) => {
    const {name,description,productType,price,offerprice,background,stock} = req.body
    const files= req.files as File[];
    const backgroundColors = JSON.parse(background);
    if(!name||!description||!productType||!price||!offerprice||!stock){
        return res.status(400).json({
            message: 'Require all fields',
            success: false
        })
    }

    try {
        const existingProduct = await product.findOne({name})
        if(existingProduct){
            return res.status(401).json({
                message: "Product already exists",
                success: false,
        })}

        const uploadedImages: { url: string; path: string; background:string[] }[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
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
                background:backgroundColors[i]
            });
        }

        const user = await product.create({
            productType: productType,
            name: name,
            description: description,
            price: price,
            offerprice:offerprice,
            stock:stock,
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

export const updateproduct = async (req:Request,res:Response) => {
    const {name,description,productType,price,offerprice,background,index,stock,images} = req.body
    const productId = req.params.id
    const files= req.files as File[];
    const backgroundColors = JSON.parse(background);
    const imagess = JSON.parse(images);
    const indexss = JSON.parse(index);
    if(!name||!description||!productType||!price||!offerprice||!stock){
        return res.status(400).json({
            message: 'Require all fields',
            success: false
        })
    }

    const updateQuery: any = {
      $set: {
        productType,
        name,
        description,
        price,
        offerprice,
        stock,
      },
    }

    try {
        const uploadedImages: { url: string; path: string; background:string[] }[] = imagess;
        const uploadedImagess: { background:string[] }[] = [];
        if(files){
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
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

                if(data){
                    const {data,error} = await supabase
                        .storage
                        .from(`${process.env.BUCKET}`)
                        .remove([uploadedImages[indexss[i]].path]);
                }


                uploadedImages[indexss[i]] = {
                    url: publicUrlData.data.publicUrl,
                    path: uniqueFilename,
                    background:backgroundColors[i]
                }
            }
        }
            for (let i = 0; i < backgroundColors.length; i++){
                uploadedImagess.push({
                    background:backgroundColors[i]
                });
            }

        if (uploadedImages && uploadedImages.length > 0) {
            if (uploadedImagess && uploadedImagess.length > 0) {
                uploadedImagess.forEach((img: any, index: number) => {
                    uploadedImages[index].background = img.background
                })
            }
            updateQuery.$set.images = uploadedImages
        }

        const updatedProduct = await product.findByIdAndUpdate(
            productId,
            updateQuery,
            { new: true }
        )
        if(!updatedProduct){
            return res.status(500).json({
                message: "Some Error occure",
                success: false,
        })}

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
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
    const {products,productName,price} = req.body
    const {Fullname,PhoneNo,Pincode,Address,City,State} = req.body.formData
    if(!Fullname || !PhoneNo || !Pincode || !Address || !City || !State || !productName || !price || !products?.length){
        return res.status(400).json({
            message: 'Require all fields',
            success: false
        })
    }
    let productIds: string[] = []
    for (const item of products){
        const productQytUpdate = await product.findById(item.product)
        if(productQytUpdate){
            if(productQytUpdate.stock >= item.quantity){
                productQytUpdate.stock-= item.quantity
                await productQytUpdate.save()
            }else{
                return res.status(404).json({
                    message: `${productQytUpdate.name} Out of Stock`,
                    success: false,
                });
            }
        }else{
            return res.status(404).json({
                message: "Product not found",
                success: false,
            });
        }
        productIds.push(item.product)
    }
    try {
        const orders = await order.create({
            userId,
            productId:productIds,
            productName,
            Fullname,
            PhoneNo,
            Pincode,
            Address,
            City,
            State,
            price
        })
        return res.status(200).json({
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

export const homepageData = async (req:Request,res:Response) => {
    try {
        const count = await product.countDocuments();
        const limit = 8;
        const random = count > limit
        ? Math.floor(Math.random() * (count - limit))
        : 0;
        const products = await product.find()
            .skip(random)
            .limit(8);
        return res.status(201).json({
            message: "here is your Orders",
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