const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const twilio = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

router.post("/get", (req, res) => {
    const { to } = req.body;

    twilio.verify
        .services(process.env.TWILIO_SERVICE_SID)
        .verifications.create({ to, channel: "sms" })
        .then((data) => {
            console.log(data);
            if (data.status == "pending") return res.send({ result: true, message: "OTP Sent" });
            res.status(400).send({ result: false, error: "Error Occured!" });
        });
});

router.post("/verify", (req, res) => {
    const { to, otp, name } = req.body;

    twilio.verify
        .services(process.env.TWILIO_SERVICE_SID)
        .verificationChecks.create({ to, code: otp })
        .then(async (data) => {
            console.log(data);
            if (data.status == "approved") {
                const user = await User.findOne({ phone: data.to });
                if (!user)
                    await new User({
                        name,
                        phone: data.to,
                    }).save();

                const token = jwt.sign({ name, phone: data.to }, process.env.JWT_SECRET);
                return res.send({ result: true, token });
            }
            res.status(400).send({ result: false, error: "Error Occured!" });
        });
});

module.exports = router;
