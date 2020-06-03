const express = require("express")
const router = express.Router()
const {check, validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const db = require("../database/db");
const keys = require("../config/dev");
const jwt = require("jsonwebtoken")


// SIGN UP ROUTE 
router.post("/signup", [
    check("firstName", "First name is required")
        .not()
        .isEmpty(),
    check("lastName", "Last name is required")
        .not()
        .isEmpty(),
    check("email", "Please provide a valid email")
        .isEmail(),
    check("password", "Password must be greater than 6 and less than 50 characters")
        .isLength({min: 6, max: 50})
], (req, res) => {
    // Validate user input 
    const {firstName, lastName, email, password} = req.body
    const {errors} = validationResult(req)
    if(errors.length){
        return res.status(409).json({
            ourErrors : errors
        })
    }

    // Validate the user email doesnt already exist 
    db.getDb()
    .collection("users")
    .findOne({email})
    .then(user => {
        if(user) return res.status(400).json({message: "User is already registered"})
        // hash the password  
        bcrypt.hash(
            password,
            10,
            (err, hash) => {
                if(err){
                    return res.status(500).json({message: "Hashing went wrong"})
                }
                // store the user document
                db.getDb()
                .collection("users")
                .insertOne({
                    firstName,
                    lastName,
                    email,
                    password: hash
                })
                .then(user => {
                   // return a json web token 
                   const token = jwt.sign(
                       {email: user.email, id: user._id},
                       keys.JWT_Secret,
                        {expiresIn: "1h"}
                   )
                   return res.status(200).json({
                       message: "User created",
                       token
                   })
                })
                .catch(err => {
                    return res.status(500).json({message: "User generation went wrong"})
                })
            }
        )
    })
    .catch(err => {
        res.status(500).json({
            message: "Something went wrong"
        })
    })
  
})



// LOG USER IN ROUTE
router.post("/login", [
    check("email", "Please provide a valid email")
        .isEmail(),
    check("password", "Please provide a password")
        .not()
        .isEmpty()
], (req, res) => {
    const {errors} = validationResult(req)
    if(errors.length) return res.status(400).json({message : "Auth Failed"})

    const {password, email} = req.body
    // CHECK IF EMAIL IS IN DATABASE    
    db.getDb()
    .collection("users")
    .findOne({email})
    .then(user => {
        if(!user) return res.status(400).json({message : "Auth Failed"})
        bcrypt.compare(password, user.password, (err, result) => {
            if(!result) return res.status(400).json({message : "Auth Failed"})
            // RETURN A JSON WEB TOKEN
            const token = jwt.sign(
                {email: user.email, id: user._id},
                keys.JWT_Secret,
                 {expiresIn: "1h"}
            )
            return res.status(200).json({
                message: "Auth Successful",
                token
            })
        })
    })
    .catch(err => {
        res.status(400).json({
            message: "Auth Failed"
        })
    })
})


module.exports = router