import express from "express"
import {generateImage} from "../controllers/ImageGenerate.controller.js"
import { protect } from "../middlewares/auth.middleware.js";
const router=express.Router()

router.post("/generateimage",protect,generateImage)

export default router;