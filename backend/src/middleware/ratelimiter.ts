import { Request, Response, NextFunction } from "express";
import redis from "../Db/redis";

const rateLimiter = (seconds:number,Requests:number) => {
  return  async (req:Request, res:Response, next:NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress;
    if(!ip){
        res.status(500).json({
            message: 'Some Error occured',
            success: false
        })
        return;
    }

    const request = await redis.incr(ip);
    let ttl
    if(request === 1){
        await redis.expire(ip,seconds);
        ttl = seconds;
    }else{
        ttl = await redis.ttl(ip)
    }

    if(request>Requests && ttl > 0){
      res.status(429).json({
        message: "Too Many Requests, Try again later",
        success: false,
      })
      return
    }
    next();
  }
}

export default rateLimiter
