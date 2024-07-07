import { User } from '../models/userModel.js';
import jwt from "jsonwebtoken";

// controller for generating refresh and access tokens
const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        // generate access token and refresh token
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // updating refresh token of user
        user.refreshToken = refreshToken;

        // saving the refresh tokent to database without validation
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken };
    } catch (error) {
        res.status(500).json({ error: "Something went wrong while generating refresh and access tokens" });
    }
}

// controller for signup
export const signup = async (req, res) => {
    const { firstName, lastName, email, password, cnfpassword } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            if (password === cnfpassword) {
                const newUser = new User({ firstName, lastName, email, password });
                await newUser.save();
                return res.status(201).json({ message: "User registered successfully." })
            } else {
                return res.status(400).json({ error: "Password not matches." });
            }
        } else {
            return res.status(401).json({ error: "Email already exists" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error !" });
    }
}

// controller for login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "User not found !" });
        }

        const passwordMatch = await user.comparePassword(password);

        if (passwordMatch) {
            // calling generateAccessTokenAndRefreshTokens and destructuring tokens
            const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

            const loggedInUser = await User.findById(user._id).select("-password");

            // creating options for cookie configuration
            const options = {
                httpOnly: true,
                secure: true,
                sameSite: 'None'
            }

            // setting cookies in the response
            return res
                .status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .json({
                    message: 'Login Successful',
                    user: loggedInUser, accessToken, refreshToken
                });
        } else {
            return res.status(401).json({ message: "Password doesn't matches !" });
        }

    } catch (err) {
        return res.status(500).json({ error: "Internal server error !" })
    }
}

export const getLoggedInUserDetails = async (req, res) => {
    return res.status(200).json({ currentUser: req.user });
}