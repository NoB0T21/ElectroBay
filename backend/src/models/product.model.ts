import mongoose, { Schema, Types } from "mongoose";

interface Post{
    name: string,
    description: string,
    price: number,
    ratings:number,
    images:string,
    owner:Types.ObjectId
    createdAt:string,
}

const productSchema:Schema<Post> = new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    ratings:{
        type:Number
    },
    images:[{
        type:String
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'user'
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

const product = mongoose.model<Post>('Product',productSchema)
export default product