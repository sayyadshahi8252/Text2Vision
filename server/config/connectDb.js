import mongoose from "mongoose";

const connectDb=async()=>{
    try {
       const connectdatabase=await mongoose.connect(`${process.env.DATABASE_URL}${process.env.DATABASE_NAME}`)  
       console.log("database connected successfully")
    } catch (error) {
        console.log("server error",error)
    }
}
export default connectDb;