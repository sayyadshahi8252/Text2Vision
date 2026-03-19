import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import Razorpay from "razorpay"
import { Transaction } from "../models/transaction.model.js";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const registerUser = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;
        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" })
        }
        const hashedpassword = await bcrypt.hash(password, 10)
        const existingUserName = await User.findOne({ username })

        if (existingUserName) {
            return res.status(400).json({ message: "Username already exists" })
        }
        const existingEmail = await User.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" })
        }
        const newUser = await User.create({
            username,
            email,
            password: hashedpassword
        })
        res.status(201).json({ message: "User registered successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const loginuser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const existinguser = await User.findOne({ email });
        if (!existinguser) {
            res.status(404).json({ message: "user not found" })
        }
        const originalpassword = await bcrypt.compare(password, existinguser.password)
        if (!originalpassword) {
            res.status(404).json({ message: "please write correct credentails" })
        }
        const accessToken = jwt.sign(
            {
                userId: existinguser._id,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "1h"
            }
        )

        const refreshToken = jwt.sign(
            {
                userId: existinguser._id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: "7d"
            }
        )

        existinguser.refreshToken = refreshToken;
        await existinguser.save()

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,     // must be true on HTTPS
            sameSite: "none", // allow cross-domain
            maxAge: 60 * 60 * 1000
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(201).json({
            message: "User login successfully", user: {
                userId: existinguser._id,
                username: existinguser.username,
                email: existinguser.email,
                credits: existinguser.credits,
                refreshToken: existinguser.refreshToken,
            }, accessToken
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const userdata = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({ message: "user credits fetched ", user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const credits = async (req, res) => {
    try {
        const credits = req.user.credits;
        res.status(200).json({ message: "user credits fetched ", credits })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


const logoutUser = async (req, res) => {
    try {
        const userId = req.user._id;
        await User.findByIdAndUpdate(userId, {
            refreshToken: null,
        });

        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });

        res.status(200).json({
            message: "User logged out successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_ID,
});

const paymentRazorpay = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized user" });
        }

        const userId = req.user._id;
        const { planId } = req.body;

        if (!planId) {
            return res.status(400).json({ message: "Plan missing" });
        }

        let credits, amount, plan;

        switch (planId) {
            case "Starter":
                credits = 8;
                amount = 10;
                plan = "Starter";
                break;

            case "Pro":
                credits = 220;
                amount = 200;
                plan = "Pro";
                break;

            case "Elite":
                credits = 500;
                amount = 399;
                plan = "Elite";
                break;

            default:
                return res.status(400).json({ message: "Invalid plan" });
        }

        const newTransaction = await Transaction.create({
            userId,
            plan,
            amount,
            credits,
        });

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: newTransaction._id,
        };

        const order = await razorpayInstance.orders.create(options);

        return res.status(200).json({
            success: true,
            order,
            key: process.env.RAZORPAY_KEY_ID,
        });

    } catch (error) {
        console.log("RAZOR ERROR:", error);
        return res.status(500).json({ message: error.message });
    }
};


const verifyRazorpay = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET_ID)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid signature",
            });
        }
        const orderInfo = await razorpayInstance.orders.fetch(
            razorpay_order_id
        );

        const transaction = await Transaction.findById(orderInfo.receipt);

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found",
            });
        }

        if (transaction.payment === true) {
            return res.status(400).json({
                message: "Payment already verified",
            });
        }
        const user = await User.findById(transaction.userId);

        user.credits += transaction.credits;
        await user.save();
        transaction.payment = true;
        transaction.paymentId = razorpay_payment_id;

        await transaction.save();

        return res.status(200).json({
            success: true,
            message: "Payment verified & credits added",
            credits: user.credits,
        });

    } catch (error) {
        console.log("VERIFY ERROR:", error);
        return res.status(500).json({ message: error.message });
    }
};
export { registerUser, loginuser, credits, userdata, logoutUser, paymentRazorpay, verifyRazorpay }