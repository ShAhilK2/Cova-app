

import { getAuth } from "firebase-admin/auth";
import { firebaseAdmin } from "../config/firebase.js";
import { User } from "../models/user.model.js";

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
          
        return res.status(200).json({user });
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
}