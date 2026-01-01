
import mongoose, { Date, Schema, Types } from "mongoose";

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
    createdAt:Date,
    status: string,
    paymentmode: string
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
    paymentmode:{
        type: String, 
        enum: ['Cash On Delivery', 'Online'], 
        default: 'Cash On Delivery'
    },
    status:{
        type: String, 
        enum: ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'], 
        default: 'Processing'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const order = mongoose.model<Post>('Order',orderSchema)
export default order