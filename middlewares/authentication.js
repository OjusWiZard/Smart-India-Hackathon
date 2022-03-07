const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (err) return res.status(403).send({ result: false, message: "Invalid token!" });
        const user = await User.findOne({ phone: payload.phone }, { _id: 0, __v: 0 });
        req.user = user;
        next();
    });
};
