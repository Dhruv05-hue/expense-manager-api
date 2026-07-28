const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const auth = req.headers.authorization;

    if (!auth) {
        return res.status(401).json({
            
            success: false,
            message: "Token not found"
        });
    }

    if (!auth || !auth.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Authorization token is required."
    });
}

    const token = auth.split(" ")[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();
    } catch (error) {
    
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
}

module.exports = authMiddleware;