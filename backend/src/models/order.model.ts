
import mongoose, { Schema, Types } from "mongoose";

interface Post{
    userId: Types.ObjectId,
    productId: Types.ObjectId[],
    productName: string[],
    Fullname: string,
    PhoneNo: number,
    Address: string,
    City: string,
    State: string,
    Pincode: number,
    price: number,
    payment: boolean,
    createdAt:string,
}

const orderSchema:Schema<Post> = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    productId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
    }],
    productName:[{
        type:String,
        required:true
    }],
    Fullname:{
        type:String,
        required:true
    },
    PhoneNo:{
        type:Number,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    },
    Pincode:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    payment:{
        type:Boolean,
        default:false
    },
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

const order = mongoose.model<Post>('Order',orderSchema)
export default order