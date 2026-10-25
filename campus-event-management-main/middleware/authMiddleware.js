const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    try {

        // Read Authorization Header
        const authHeader = req.headers.authorization;
        console.log("Authorization Header:", authHeader);

        // Check if token exists
        if (!authHeader) {
            return res.status(401).json({
                message: "Access Denied. No Token Provided."
            });
        }

        // Extract JWT
        const token = authHeader.split(" ")[1];
        console.log("Token:", token);

        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("Decoded User:", decoded);

        // Store user information in request
        req.user = decoded;

        // Continue to controller
        next();

    } catch (error) {

        console.log("JWT Error:", error);

        return res.status(401).json({
            message: "Invalid Token"
        });

    }

};

module.exports = verifyToken;