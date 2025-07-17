import mongoose, { Schema, Types } from "mongoose";

interface cartProp{
    userId: Types.ObjectId,
    cartList: Types.ObjectId[]
}

const cartSchema:Schema<cartProp> = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'user'
    },
    cartList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    }]
})

const cart =mongoose.model<cartProp>("Cart", cartSchema);
export default cart