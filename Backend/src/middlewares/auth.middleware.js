const jwt = require('jsonwebtoken')
const blacklistTokenModel = require('../models/blacklist.model')

const authUser = async (req, res, next) => {

    // getting token from cookies
    const token = req.cookies.token

    // if token not found
    if (!token) {
        return res.status(401).json({
            message: 'Token not provided'
        })
    }

    // checking if token is blacklsted
    const isTokenBlacklisted = await blacklistTokenModel.findOne({token})

    if(isTokenBlacklisted) {
        return res.status(401).json({
            message: 'Token is invalid'
        })
    }

    // if token found
    try {

        // verifying token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // setting it in request
        req.user = decoded

        next()

    } catch (err) {
        return res.status(401).json({
            message: 'Invalid Token'
        })
    }

}

module.exports = {authUser}