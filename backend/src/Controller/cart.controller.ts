import {Request, Response } from "express"
import CartModel from '../models/cart .model'
import mongoose, { Types } from "mongoose"
import product from "../models/product.model"

export const getcart = async (req:Request, res:Response) =>{
  const userId = req.user._id
  if(!userId){
    return res.status(400).json({
        message: 'Require all fields',
        success: false
    })
  }
  try {
    let cart = await CartModel.findOne({userId:userId})
    let products
    if (!cart) {
      return res.status(200).json({ message: 'No Product',success: true });
    } else {
      const productIds = cart.items.map(item => item.product);
      products = await product.find({
        _id: { $in: productIds as Types.ObjectId[] }
      })
    }
    const cartdata = {
      cart,
      products
    }
    return res.status(200).json({ message: 'Take Your Cart',cartdata,success: true });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
  
}

export const addtocart = async (req:Request, res:Response) =>{
  const productId = req.params.id
  const userId = req.user._id.toString()
  if(!userId || !productId){
    return res.status(400).json({
        message: 'Require all fields',
        success: false
    })
  }
  try {
    let cart = await CartModel.findOne({userId:userId})
    if (!cart) {
      cart = new CartModel({
        userId,
        items: [{ product: productId, quantity: 1 }],
      });

      await cart.save();
      return res.status(200).json({ message: 'Product added to cart',success: true });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );
      
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        const objectProductId = new mongoose.Types.ObjectId(productId);
        cart.items.push({ product: objectProductId, quantity: 1 });
      }

      await cart.save();
      return res.status(200).json({ message: 'Product added to cart',success: true });
    }
  } catch (error) {
        return res.status(500).json({ message: 'Server Error' });
  }
}

export const subtocart = async (req:Request, res:Response) =>{
    const productId = req.params.id
    const userId = req.user._id
    if(!userId || !productId){
      return res.status(400).json({
          message: 'Require all fields',
          success: false
      })
    }
    try {
      let cart = await CartModel.findOne({userId:userId})
      if (!cart) {
        cart = new CartModel({
          userId,
          items: [{ product: productId, quantity: 1 }],
        });

      await cart.save();
      return res.status(200).json({ message: 'Product remove from cart',success: true });
      } else {
        const itemIndex = cart.items.findIndex(
          (item) => item.product.toString() === productId
        );
        if (itemIndex > -1) {
          if (cart.items[itemIndex].quantity > 1) {
            // Decrement quantity
            cart.items[itemIndex].quantity -= 1;
          } else {
            // Remove item from cart
            cart.items.splice(itemIndex, 1);
          }
          
          await cart.save();
          return res.status(200).json({ message: 'Product remove from cart',success: true });
        } else {
          return res.status(200).json({ message: 'nothing to remove',success: true });
        }
      }
    } catch (error) {
        return res.status(500).json({ message: 'Server Error' });
    }

}