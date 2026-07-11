// const jwt = require("jsonwebtoken");
// const blacklistTokenModel = require("../models/blacklist.model");

// const authUser = async (req, res, next) => {
//     try {
//         console.log("Cookies:", req.cookies);

//         const token = req.cookies?.token;

//         if (!token) {
//             return res.status(401).json({
//                 message: "Token not provided"
//             });
//         }

//         const blacklisted = await blacklistTokenModel.findOne({ token });

//         if (blacklisted) {
//             return res.status(401).json({
//                 message: "Token is invalid"
//             });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         req.user = decoded;

//         next();

//     } catch (err) {
//         console.log(err);

//         return res.status(401).json({
//             message: "Invalid Token"
//         });
//     }
// };

// module.exports = { authUser };

const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklist.model");

const authUser = async (req, res, next) => {
    try {
        console.log("Cookies:", req.cookies);

        const token = req.cookies?.token;
        console.log("Token:", token);

        if (!token) {
            console.log("❌ No token found");
            return res.status(401).json({
                message: "Token not provided"
            });
        }

        const blacklisted = await blacklistTokenModel.findOne({ token });
        console.log("Blacklisted:", blacklisted);

        if (blacklisted) {
            console.log("❌ Token is blacklisted");
            return res.status(401).json({
                message: "Token is invalid"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded:", decoded);

        req.user = decoded;
        next();

    } catch (err) {
        console.error("JWT Error:", err);
        return res.status(401).json({
            message: "Invalid Token",
            error: err.message
        });
    }
};

module.exports = { authUser };