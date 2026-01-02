import { NextFunction, Request, Response } from 'express'
import redis from '../Db/redis';

const cachData = async (req:Request, res:Response, next:NextFunction) => {
    const cacheKey = `data:`

    const cached = await redis.get(cacheKey);
    if (cached) {
        res.status(200).json(JSON.parse(cached));
        return
    }else {
        next()
    }
}

export default cachData;