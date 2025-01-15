import { NextFunction, Request,Response } from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export const userMiddleware = async (req: Request,res: Response,next: NextFunction)=>{
    const header = req.headers["authorization"];
    try{
        const decoded = jwt.verify(header as string, JWT_SECRET) as JwtPayload;
        if(decoded){
            req.userId = decoded.id;
            next();
        }else{
            res.status(401).json({
                message:"Unauthorized User"
            })
        }
    }catch(e:any){
        res.status(500).json({
            message:"Internal Server error",
            error:e.message
        })
    }
}