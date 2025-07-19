import mongoose, { Schema, Types } from "mongoose";

interface Post{
    productType: string,
    name: string,
    description: string,
    price: number,
    offerprice: number,
    ratings:number,
    images:[{
        url: string,
        path: string
    }],
    createdAt:string,
}

const productSchema:Schema<Post> = new mongoose.Schema({
    productType:{
        type:String,
        required:true
    },
    name:{
        type:String,
        unique:true,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    offerprice:{
        type:Number,
        required:true
    },
    ratings:{
        type:Number
    },
    images:[{
        url:{
            type:String,
            required:true
        },
        path:{
            type:String,
            required:true
        }
    }],
    createdAt:{
        type:String,
        default: () => {
        const now = new Date();
        // Convert UTC to IST (UTC + 5:30)
        const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
        const istTime = new Date(now.getTime() + istOffset);
        return istTime.toISOString();
    }}
})

const product = mongoose.model<Post>('Product',productSchema)
export default product