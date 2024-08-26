const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// protected middleware
// only logged in users can access the route
const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	)
		token = req.headers.authorization.split(" ")[1];
	else if (req.cookies.id) token = req.cookies.id;

	if (!token)
		return res
			.status(401)
			.json({ message: "You are not authorized. No token specified." });

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await User.findById(decoded.id).select("-password");
		if (!req.user) {
			return res.status(401).json({
				message: "User not found, authorization failed.",
			});
		}

		next();
	} catch (error) {
		res.status(401).json({ message: "You are not authorized" });
	}
});

//@deprecated
const authenticateToken = (req, res, next) => {
	next();
};

// role based auth middleware.
// only the specified can access the route
// used after the protect middleware
// e.g. authorize("admin"), authorize(["user", "admin"])
const authorize = (...roles) => {
	return (req, res, next) => {
		if (req.user && roles.includes(req.user.roles)) {
			next();
		} else {
			res.status(403).json({
				message:
					"Forbidden: You are not authorized to access this route",
			});
		}
	};
};

module.exports = { protect, authorize, authenticateToken };
