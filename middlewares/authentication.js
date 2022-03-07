const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = (req, res, next) => {
    const authHeader = req.headers["x-auth-token"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) return res.status(403).send({ result: false, message: "Unauthorized User" });
        const user = User.findOne({ phone: payload.phone });
        req.user = user;
        next();
    });
};
