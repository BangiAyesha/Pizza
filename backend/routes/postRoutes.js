const express = require("express");
const router = express.Router();
const Userdetails = require("../db/Userdetails");

router.post("/loginusers", (req, res) => {
    console.log(req.body);
    // let email = req.body.email;
    // let password = req.body.password;
    Userdetails.findOne({ email: req.body.email }, (err, data) => {
        if (data) {
            if (req.body.password === data.password) {
                let payload = {
                    oid: req.body.email,
                };
                const token = jwt.sign(payload, jwtSecret, {
                    expiresIn: 1060000,
                });
                console.log(token);
                res.send({ flag: 1, message: "Login Success", token: token });
            } else {
                res.send({ flag: 0, message: "Password not matched" });
            }
        } else {
            res.send({ err: 0, message: "User not registered" });
        }
    });
});

module.exports = router;
