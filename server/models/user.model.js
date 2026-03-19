import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    credits:{
        type:Number,
        default:3
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})

export const User=mongoose.model("User",userSchema)