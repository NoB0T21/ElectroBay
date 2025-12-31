import mongoose, { Schema, Types } from "mongoose";

interface Sale {
  url1: string
  path1: number
  url2: string
  path2: number
  background: number
  discount: number
}


const saleSchema: Schema = new Schema({
  url1: {
    type:String,
    required: true,
  },
  path1: {
    type: String,
    required: true,
  },
  url2: {
    type:String,
    required: true,
  },
  path2: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
})

const sale2 =mongoose.model<Sale>("Sale2", saleSchema);
export default sale2