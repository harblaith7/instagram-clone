const router = require("express").Router();
const db = require("../database/db");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const keys = require("../configs/dev")


router.post("/signup", (req, res, next) => {
    // Checks if user email is already in the database
    db.getDb()
    .collection("users")
    .findOne({email: req.body.email})
    .then(user => {
        if(user){
            return res.status(409).json({
                message: "This user already exists"
            })
        } else {
            // Hash our password
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({
                        message: "something went wrong"
                    })
                }
                // Creates new user document and stores it in database
                db.getDb()
                .collection("users")
                .insertOne({
                    email: req.body.email,
                    password: hash
                })
                .then(response => {
                    res.json(response)
                })
                .catch(err => {
                    res.status(500).json(err)
                })

            })
            
        }
    })
    .catch(err => {
        return res.status(500).json(err)
    })
    
})

router.post("/login" , (req, res, next) => {
    // Check if user exists in database
    db.getDb()
    .collection("users")
    .findOne({email: req.body.email})
    .then(user => {
        // User doesn't exist
        if(!user){
            return res.status(500).json({
                message: "Auth failed"
            })
        }
        // User exists, check to see if password matches;
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(err){
                return res.json({
                    message: "Auth failed"
                })
            }
            if(result){
                // Create JWT
                const token = jwt.sign({email: user.email, userId: user._id}, keys.JWT_KEY, {expiresIn: "1h"})
                return res.status(400).json({
                    message: "Auth Successful",
                    token
                })
            }
            return res.status(409).json({
                message: "Auth failed"
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            message: "Auth failed"
        })
    })
})

module.exports = router

