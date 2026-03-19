import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
export const protect=async(req,res,next)=>{
    try {
        // console.log("accessToken",req.cookies.accessToken)
        //  console.log("refreshToken",req.cookies.refreshToken)
         const accessToken=req.cookies.accessToken;
         if(!accessToken){
            res.status(404).json({message:"Unauthorizes user"})
         }
         let decode=jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)
         if(!decode){
            return res.status(401).json({ message: "Invalid token" });
         }
         const user=await User.findById(decode.userId).select("-password")
         if(!user){
            res.status(404).json({message:"unauthorized user not found"})
         } 
         req.user=user
        next()
       
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}