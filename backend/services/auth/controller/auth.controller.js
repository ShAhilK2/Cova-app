

import { getAuth } from "firebase-admin/auth";
import { firebaseAdmin } from "../config/firebase.js";
import { User } from "../models/user.model.js";
import redis from "../../../shared/redis/redis.js";
import crypto from "crypto";

export const login = async (req, res) => {
    try {
        const {token} = req.body;
        const decoded = await getAuth(firebaseAdmin).verifyIdToken(token);


        let user = await User.findOne({ firebaseUid: decoded.uid });

        if(!user) {
            user = await User.create({
                firebaseUid: decoded.uid,
                email: decoded.email,
                name: decoded.name,
                picture: decoded.picture
            });
        }


        const sessionId = crypto.randomUUID();

        await redis.set(`session:${sessionId}`,JSON.stringify(
            {userId: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            }
        ), "EX", 7 * 24 * 60 * 60);     // 7 days

         

        res.cookie("sessionId", sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
}


export const logOut = async (req, res) => {
    try {
        const {sessionId} = req?.cookies;

        await redis.del(`session:${sessionId}`);
        res.clearCookie("sessionId");

        return res.status(200).json({message: "Logged out"});
    } catch (error) {
        console.error("Error logging out:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}