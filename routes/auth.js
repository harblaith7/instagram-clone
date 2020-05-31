const express = require("express");
const router = express.Router();
const db = require("../database/db");
const bcrypt = require("bcrypt")


router.post("/signup", (req, res, next) => {
    bcrypt.hash("password", 10, (err, hash) => {
        if(err){
            res.send(err)
        } else {
            db.getDb()
            .collection("users")
            .insertOne({
                firstName: "Laith",
                lastName: "Harb",
                email: "harblaith77@gmail.com",
                password: hash
            })
            .then(response => {
                res.send(response)
            })
            .catch(error => {
                res.send(error)
            })
        }
    })
})

router.post("/lala", (req, res, next) => {
    res.send("bitch")
})

module.exports = router;