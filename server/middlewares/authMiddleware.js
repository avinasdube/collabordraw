import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

export const verifyJWT = async (req, res, next) => {
    try {
        const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "");

        if (!accessToken) {
            return res.status(401).json({ error: "Unauthorized request." });
        }

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        );

        if (!user) {
            return res.status(401).json({ error: "Invalid Access Token." });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({ error: "Unauthorized request !" })
    }
}