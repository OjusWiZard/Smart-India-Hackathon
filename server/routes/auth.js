const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const messagebird = require("messagebird")(process.env.ACCESS_KEY);

router.post("/get", (req, res) => {
    const { recipient } = req.body;

    messagebird.verify.create(recipient, (err, data) => {
        if (err) return res.status(500).send({ result: false, error: err });

        console.log(data);
        if (data.status == "sent") return res.send({ result: true, id: data.id });
        res.status(400).send({ result: false, message: "Error Occured!" });
    });
});

router.post("/verify", (req, res) => {
    const { id, otp, name } = req.body;

    messagebird.verify.verify(id, otp, async (err, data) => {
        if (err) return res.status(500).send({ result: false, error: err });

        console.log(data);
        if (data.status == "verified") {
            const user = await User.findOne({ phone: data.recipient });
            if (!user)
                await new User({
                    name,
                    phone: data.recipient,
                }).save();

            const token = jwt.sign({ name, phone: data.recipient }, process.env.JWT_SECRET);
            return res.send({ result: true, token });
        }
        res.status(400).send({ result: false, message: "Error Occured!" });
    });
});

module.exports = router;
