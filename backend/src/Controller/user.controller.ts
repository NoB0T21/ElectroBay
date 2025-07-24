import { Request, Response } from "express"
import {OAuth2Client} from 'google-auth-library'
import jwt, { JwtPayload } from 'jsonwebtoken'
import supabase from "../Db/supabase"
import uuid4 from "uuid4"
import userModel from '../models/user.model'
import cartModel from '../models/cart .model'
import ownerModel from '../models/admin.model'

const client = new OAuth2Client(process.env.GOOGLE_ID)

interface User extends JwtPayload {
    _id:string,
    name:string,
    email:string,
    password:string
}

export const register = async (request: Request, response: Response) => {
    const file = request.file as Express.Multer.File;
    const {name, email, password, picture} = request.body
    if(!name||!email||!password){
        return response.status(400).json({
            message: 'Require all fields',
            success: false
        })
    }

    try {
        const existingUsers = await userModel.findOne({email})
        if(existingUsers){
            return response.status(202).json({
                message: "User already exists",
                user: existingUsers,
                success: false,
        })}

        const files = file?.originalname.split(" ").join("");
        const uniqueFilename = `${uuid4()}-${files}`;
        let pictureuri
        if(file){
            const { data, error } = await supabase.storage
            .from(`${process.env.BUCKET}`)
            .upload(uniqueFilename, file?.buffer, {
                contentType: file?.mimetype,
                cacheControl: "3600",
                upsert: false,
            });
            if (error) {
                response.status(500).json({
                    message: "Server error",
                    success: false,
                });
                return
            }

            const publicUrlData = await supabase.storage
            .from(`${process.env.BUCKET}`)
            .getPublicUrl(`${uniqueFilename}`);

            pictureuri=publicUrlData.data.publicUrl
        }

        const hashPassword = await userModel.hashpassword(password)
        const user = await userModel.create({
            name,
            email,
            picture:pictureuri || picture,
            password:hashPassword
        })
        if(!user){
            return response.status(500).json({
                message: "Some Error occure",
                success: false,
        })}

        const cart = await cartModel.create({userId:user._id,})
        const token = await user.generateToken()

        return response.status(201).json({
            message: "User created successfully",
            user,
            token,
            success: true,
        });
    } catch (error) {
        return response.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

export const login = async (request: Request, response:Response) => {
    const {email, password} = request.body
    if(!email||!password){
        return response.status(400).json({
            message: 'Require all fields',
            success: false
        })
    }
    try {
        const user = await userModel.findOne({email})
        if(!user){
            const admin = await ownerModel.findOne({email})
            if(admin){
                const isMatch = await admin.comparePassword(password, admin.password)
                if(!isMatch){
                    return response.status(202).json({
                        message: "password or email is incorrect",
                        success: false,
                })}

                const token = await admin.generateToken()
                return response.status(201).json({
                    message: "User login successfully",
                    user: admin,
                    token,
                    success: true,
                });
            }
            return response.status(202).json({
                message: "password or email is incorrect",
                success: false,
        })}

        const isMatch = await user.comparePassword(password, user.password)
        if(!isMatch){
            return response.status(202).json({
                message: "password or email is incorrect",
                success: false,
        })}

        const token = await user.generateToken()
        return response.status(201).json({
            message: "User login successfully",
            user,
            token,
            success: true,
        });
    } catch (error) {
        return response.status(500).json({
            message: "Internal server error",
            success: false,
          });
    }
}

export const valid = async (req: Request, res:any) => {
    const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Access Token required' });
        return;
      }
    
      const accessToken = authHeader.split(' ')[1];
      try {
        const user = jwt.verify(accessToken, process.env.SECRET_KEY || 'default') as User
        if(!user){
            return res.status(200).json({
                message: "not verified",
                success: false,
            })
        }
        if(user?.email==='admin@gmail.com'){
            return res.status(200).json({
            message: "verified",
            user:'admin',
            success: true,
        })
        }
        return res.status(200).json({
            message: "verified",
            success: true,
        })
      } catch (err) {
        try {
            const googleInfo = await client.getTokenInfo(accessToken);
            if(!googleInfo){
                return res.status(200).json({
                    message: "not verified",
                    success: false,
                })
            }
            
            return res.status(200).json({
                message: "verified",
                success: true,
            })
        } catch (err) {
            return res.status(200).json({
                message: "not verified",
                success: false,
            })
        }
    }
}