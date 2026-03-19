import mongoose from 'mongoose';

const transactionSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    credits:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    plan:{
        type:String,
        required:true
    },
     payment:{
        type:Boolean,
       default:false
    },
    date:{
        type:Number
    }
},{timestamps:true})

export const Transaction=mongoose.model("Transaction",transactionSchema)