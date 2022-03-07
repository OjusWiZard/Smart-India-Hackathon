const router = require("express").Router();
const authCheck = require("../middlewares/authentication");
const CasteCert = require("../models/certificates/Caste");

router.get("/details/:sid", authCheck, (req, res) => {
    const { sid } = req.params;

    CasteCert.findOne({ sid }, (err, data) => {
        if (err) return res.status(404);
        res.send({ result: true, data });
    });
});

router.post("/create", authCheck, (req, res) => {});

module.exports = router;
