const router = require("express").Router();
const authCheck = require("../middlewares/authentication");
const CasteCert = require("../models/certificates/Caste");
const shortid = require("shortid");

router.get("/", authCheck, (req, res) => {
    CasteCert.find({ phone: req.user.phone }, { _id: 0, __v: 0 }, (err, data) => {
        if (err) return res.status(404);
        res.send({ result: true, data });
    });
});

router.get("/:sid", authCheck, (req, res) => {
    const { sid } = req.params;

    CasteCert.findOne({ sid }, { _id: 0, __v: 0 }, (err, data) => {
        if (err) return res.status(404);
        res.send({ result: true, data });
    });
});

router.post("/create", authCheck, async (req, res) => {
    await new CasteCert({
        sid: shortid.generate(),
        ...req.body,
    }).save();
    res.send({ result: true, sid });
});

module.exports = router;
