const express = require("express");
const router = express.Router();
const db = require("../database/db");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const keys = require('../configs/dev')


router.post("/signup", (req, res, next) => {

    db.getDb()
    .collection("users")
    .findOne({email: "harblaith77@gmail.com"})
    .then(user => {
        if(user){
            res.status(409).json({
                message: "email already exists"
            })
            return
        } else {
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
        }
    })

    
})

router.post("/login", (req, res, next) => {
    
    db.getDb()
    .collection("users")
    .findOne({
        email: "harblaith77@gmail.com"
    })
    .then(user => {
        if(!user){
            return res.send("Auth Failed")
        }
        bcrypt.compare("password", user.password, (err, result) => {
            if(err){
                return res.send("Auth failed")
            }
            if(result){
                const token = jwt.sign(
                    {
                    email: user.email,
                    userId: user._id
                    },
                    keys.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                )
                return res.json({
                    message: "Auth successful",
                    token
                })
            }
            return res.send("Auth failed")
        })
    })
})

router.post("/lala", (req, res, next) => {
    res.send("bitch")
})

module.exports = router;