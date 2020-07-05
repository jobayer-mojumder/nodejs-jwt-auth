const jwt = require("jsonwebtoken");


var validation = (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
        // Remove Bearer from string
        token = token.slice(7);
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                return res.status(400).json({
                    success: 401,
                    message: "Invalid Token..."
                });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        return res.status(400).json({
            success: 400,
            message: "Access Denied! Unauthorized User"
        });
    }
}
module.exports = validation