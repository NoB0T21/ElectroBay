import { Request, Response } from "express"
import product from "../models/product.model"
import order from "../models/order.model"
import uuid4 from "uuid4"
import supabase from "../Db/supabase"
import sale from "../models/sale.model"
import sale2 from "../models/sale2.model"

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

export const updatesale = async (req:Request,res:Response) => {
    const {background, discount} = req.body
    const files= req.file as Express.Multer.File
    if(!background||!discount){
        return res.status(400).json({
            message: 'Require all fields',
            success: false
        })
    }

    const updateQuery: any = {
      $set: {
        background,
        discount,
      },
    }

    let uploadedImages: {background:string; discount:string; url: string; path: string};
    let uploadedImagess: {background:string; discount:string;};
    try {
        if(files){const file = files;
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
           
            uploadedImages = {
                background,
                discount,
                url: publicUrlData.data.publicUrl,
                path: uniqueFilename,
            }
            if (uploadedImages) {
                updateQuery.$set = uploadedImages
            }
        }else{
            uploadedImagess = {
                background,
                discount
            }
            if (uploadedImagess) {
                updateQuery.$set = uploadedImagess
            }
        }
            
            const updatedProduct = await sale.findOneAndUpdate(
                {name: 'aaa'},
                updateQuery
            )
            if(!updatedProduct){
                return res.status(500).json({
                    message: "Some Error occure",
                    success: false,
            })}
                if(updatedProduct){
                    const {data,error} = await supabase
                    .storage
                    .from(`${process.env.BUCKET}`)
                    .remove([updatedProduct.path.toString()]);
                }

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

export const updatesale2 = async (req: Request, res: Response) => {
  const { discount, inx } = req.body
  const files = req.files as Express.Multer.File[]

  if (discount === undefined || inx === undefined) {
    return res.status(400).json({
      message: 'Require all fields',
      success: false,
    })
  }

  try {
    const uploadedImages: { url: string; path: string }[] = []

    // ⬆️ Upload images
    for (const file of files) {
      const cleanName = file.originalname.replace(/\s+/g, '')
      const uniqueFilename = `${uuid4()}-${cleanName}`

      const { error } = await supabase.storage
        .from(process.env.BUCKET!)
        .upload(uniqueFilename, file.buffer, {
          contentType: file.mimetype,
          cacheControl: '3600',
          upsert: false,
        })

      if (error) {
        return res.status(500).json({
          message: 'Image Upload Failed',
          success: false,
        })
      }

      const { data } = supabase.storage
        .from(process.env.BUCKET!)
        .getPublicUrl(uniqueFilename)

      uploadedImages.push({
        url: data.publicUrl,
        path: uniqueFilename,
      })
    }

    // 🧠 Build update object safely
    const updateSet: any = { discount }

    if (uploadedImages.length === 1) {
      if (inx == 0) {
        updateSet.url1 = uploadedImages[0].url
        updateSet.path1 = uploadedImages[0].path
      } else if (inx == 1) {
        updateSet.url2 = uploadedImages[0].url
        updateSet.path2 = uploadedImages[0].path
      }
    }

    if (uploadedImages.length === 2) {
      updateSet.url1 = uploadedImages[0].url
      updateSet.path1 = uploadedImages[0].path
      updateSet.url2 = uploadedImages[1].url
      updateSet.path2 = uploadedImages[1].path
    }

    // 🔄 Update DB
    const oldData = await sale2.findOneAndUpdate(
      { name: 'bbb' },
      { $set: updateSet },
      { new: false }
    )

    if (oldData) {
      if (updateSet.path1 && oldData.path1 && updateSet.path1 !== oldData.path1) {
        await supabase.storage
          .from(process.env.BUCKET!)
          .remove([oldData.path1.toString()])
      }

      if (updateSet.path2 && oldData.path2 && updateSet.path2 !== oldData.path2) {
        await supabase.storage
          .from(process.env.BUCKET!)
          .remove([oldData.path2.toString()])
      }
    }

    return res.status(200).json({
      message: 'Sale updated successfully',
      success: true,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Internal server error',
      success: false,
    })
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
    const {products,productName,price,PaymentMode} = req.body
    const {Fullname,PhoneNo,Pincode,Address,City,State} = req.body.formData
    if(!Fullname || !PhoneNo || !Pincode || !Address || !City || !State || !productName || !price || !products?.length || !PaymentMode){
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
            price,
            paymentmode:PaymentMode,
            status:'Processing'
        })
        return res.status(200).json({
            message: "Your Order has been Placed",
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
    const {status} = req.body
    if(!orderId || !status){
        return res.status(400).json({
            message: 'Require all fields',
            success: false
        })
    }

    try {
        const orders = await order.findOneAndUpdate({_id:orderId},{status})
        return res.status(200).json({
            message: "Product status updated",
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

export const updatepayment = async (req:Request,res:Response) => {
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
        return res.status(200).json({
            message: "Product status updated",
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
        const sale1 = await sale.findOne({name: 'aaa'})
        const sale11 = await sale2.findOne({name: 'bbb'})
        return res.status(201).json({
            message: "here is your Orders",
            products,
            sale1,
            sale11,
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}