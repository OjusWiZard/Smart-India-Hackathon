const router = require("express").Router();
const authCheck = require("../middlewares/authentication");
const User = require("../models/User");

router.get("/", authCheck, (req, res) => {
    res.json(req.user);
});

module.exports = router;
