import {OAuth2Client} from 'google-auth-library'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import userModel from '../models/user.model';
import adminModel from '../models/admin.model';

const client = new OAuth2Client(process.env.GOOGLE_ID)

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const middleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Access Token required' });
    return;
  }

  const accessToken = authHeader.split(' ')[1];

  try {
    const user = jwt.verify(accessToken, process.env.SECRET_KEY || 'default');
    req.user = user;

    const admin = await adminModel.findOne({email:req.user.email})
    if(admin) req.user = admin

    next();
  } catch (err) {
    try {
      const googleInfo = await client.getTokenInfo(accessToken);
      const existingUsers = await userModel.findOne({email:googleInfo.email})

      req.user = existingUsers;
      
      next();
    } catch (err) {
      res.status(403).json({ message: 'Invalid or expired token' });
    }
  }
};
export default middleware;