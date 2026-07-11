const userModel = require("../models/user.model");
const blacklistTokenModel = require('../models/blacklist.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/**
 * 
 * @name registerUserController 
 * @description register a new user
 * @access Public
 */
const registerUserController = async (req, res) => {

    const { username, email, password } = req.body

    // empty field
    if (!username || !email || !password) {
        return res.status(400).json({
            message: 'Please enter all the required fields'
        })
    }

    // if user exists
    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "Username or email already exists"
        })
    }

    // password hashing
    const hash = await bcrypt.hash(password, 10)

    // creating user
    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    // creating token
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    // setting token in cookie

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "None" : "Lax",
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    })

}

/**
 * @name loginUserController
 * @description login an user, add token in blacklist, clear token from cookies
 * @access Public
 */
const loginUserController = async (req, res) => {

    const { email, username, password } = req.body

    // if user exists
    const user = await userModel.findOne({
        $or: [{ email }, { username }]
    })

    if (!user) {
        return res.status(400).json({
            message: 'Invalid username or email'
        })
    }

    // password verification
    const isPasswordValid = await bcrypt.compare(password, user.password)

    // token generate
    const token = await jwt.sign({
        id: user._id,
        username: user.username
    },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    // setting token into cookies
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "None" : "Lax",
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
        message: 'User Logged In successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

/**
 * @name logoutUserController
 * @description logout an user
 * @access Public
 */
const logoutUserController = async (req, res) => {

    // getting token from cookies
    const token = req.cookies.token

    // storing token in DB
    if (token) {
        await blacklistTokenModel.create({ token })
    }

    // clearing token from cookies
    res.clearCookie("token", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "None" : "Lax",
    });

    res.status(200).json({
        message: 'User logged out successfully'
    })

}

/**
 * @name getMeController
 * @description get current logged in user's details
 * @access Private
 */
const getMeController = async (req, res) => {

    // it stores current logged in user's data

    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: 'User details fetched successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    })

}

module.exports = { registerUserController, loginUserController, logoutUserController, getMeController }