import mongoose, { Schema, Types } from "mongoose";

interface Sale {
  url: string
  path: number
  background: number
  discount: number
}


const saleSchema: Schema = new Schema({
  url: {
    type:String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
})

const sale =mongoose.model<Sale>("Sale", saleSchema);
export default sale