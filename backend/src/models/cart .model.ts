import mongoose, { Schema, Types } from "mongoose";

interface cartProp{
    userId: Types.ObjectId,
    items: ICartItem[]
}

interface ICartItem {
  product: Types.ObjectId
  quantity: number
}


const CartItemSchema: Schema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
})

const cartSchema:Schema<cartProp> = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'user'
    },
    items: [CartItemSchema],

})

const cart =mongoose.model<cartProp>("Cart", cartSchema);
export default cart