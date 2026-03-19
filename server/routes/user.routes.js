import express from 'express'
import {registerUser,loginuser,credits,userdata,logoutUser,paymentRazorpay,verifyRazorpay} from '../controllers/user.controller.js'
import { protect } from '../middlewares/auth.middleware.js'

const router=express.Router()

router.post("/register",registerUser)
router.post("/login",loginuser)
router.get("/test",protect,credits)
router.get("/userdata",protect,userdata)
router.post("/logout", protect, logoutUser);
router.post("/pay-razor",protect,paymentRazorpay)
router.post("/verify-razor",protect,verifyRazorpay)
export default router