const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require("../models/userModel");

// protected middleware
// only logged in users can access the route
const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("You are not authorized");
        }
    }

    if (!token){
        res.status(401);
        throw new Error("Not authorized. No token");
    }
});

// role based auth middleware.
// only the specified can access the route
// used after the protect middleware
// e.g. authorize("admin"), authorize(["user", "admin"])
const authorize = (...roles) => {
    return (req, res, next) => {
        if (req.user && roles.includes(res.user.role)){
            next();
        } else {
            res.status(403).json({message: "Forbidden: You are not authorized to access this route"});
        }
    }
}

module.exports = { protect, authorize };