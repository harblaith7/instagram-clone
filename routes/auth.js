const express = require("express")
const router = express.Router()
const {check, validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const db = require("../database/db")


// Sign up route
router.get("/signup", [
    check("firstName", "First name is required")
        .not()
        .isEmpty(),
    check("lastName", "Last name is required")
        .not()
        .isEmpty(),
    check("email", "Please provide a valid email")
        .isEmail(),
    check("password", "The must be greater than 6 and smaller than 50 character")
        .isLength({min: 6, max: 50})
], (req, res, next) => {
   // CHECK IF OUR INPUT FIELDS ARE VALID
   const errors = validationResult(req);
   if(errors.errors.length){
       return res.status(400).json(errors.array())
   }

   const {firstName, lastName, email, password} = req.body

   // HASH OUR PASSWORD
   bcrypt.hash(password, 10, (err, hash) => { 
       if(err){
           return res.status(400).json({
               message: "Something went wrong"
           })
       }
       // SAVE THE USER DOCUMENT INTO MONGODB
       db.getDb()
       .collection("users")
       .insertOne({
           firstName,
           lastName,
           email,
           password: hash
       })
       .then(response => {
           return res.status(200).json(response)
       })
       .catch(err => {
           res.status(400).json({
             message: "Something went wrong"
           })
       })
   })

   
   
})


module.exports = router