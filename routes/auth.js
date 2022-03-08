const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const twilio = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const authCheck = require("../middlewares/authentication");

router.post("/get", (req, res) => {
    const { to } = req.body;
    console.log("RECEIVED");
    twilio.verify
        .services(process.env.TWILIO_SERVICE_SID)
        .verifications.create({ to, channel: "sms" })
        .then((data) => {
            if (data.status == "pending") return res.send({ result: true, message: "OTP Sent" });
            res.status(400).send({ result: false, error: "Error Occured!" });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({ result: false, error: "Error Occured!" });
        });
});

router.post("/verify", (req, res) => {
    const { to, otp, name, email } = req.body;

    twilio.verify
        .services(process.env.TWILIO_SERVICE_SID)
        .verificationChecks.create({ to, code: otp })
        .then(async (data) => {
            if (data.status == "approved") {
                const user = await User.findOne({ phone: data.to });
                if (!user)
                    await new User({
                        name,
                        email,
                        phone: data.to,
                    }).save();

                const token = jwt.sign({ name, email, phone: data.to }, process.env.JWT_SECRET);
                return res.send({ result: true, token });
            }
            res.status(400).send({ result: false, error: "Error Occured!" });
        });
});

router.post("/status", authCheck, (req, res) => {
    const { body } = req.body;

    twilio.messages
        .create({
            messagingServiceSid: "MGe90d0f75e1b8474da365b980ac505979",
            to: req.user.phone,
            body,
        })
        .then((response) => {
            if (response.status === "accepted") return res.send({ result: true, message: "Message Sent!" });
            res.status(500).send({ result: false, error: "Error Occured!" });
        })
        .catch((err) => console.log(err));
});

module.exports = router;
