const router = require("express").Router()
const {check, validationResult} = require("express-validator")
const db = require("../database/db");
const bycrpt = require("bcrypt")
const jwt = require("jsonwebtoken")
const keys = require("../config/dev")

// SIGN UP ROUTE 
// PUBLIC
router.post("/signup", [
    check("firstName", "The first name is required")
    .not()
    .isEmpty(),
    check("lastName", "The last name is required")
    .not()
    .isEmpty(),
    check("email", "Provide a valid email")
    .isEmail(),
    check("password", "Provide a password that is greater than 6 characters")
    .isLength({min: 6})
], async (req, res) => {

    // VALIDATE USER INPUT
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // CHECK IF OUR USER ALREADY EXISTS

    const {firstName, lastName, email, password} = req.body

    let user = await db
    .getDb()
    .collection("users")
    .findOne({email})

    if(user){
        return res.status(400).json({errors : [{msg: "The user already exists"}]})
    }

    // HASH THE PASSWORD
    let hashPassword = await bycrpt.hash(password, 10)

    // CREATE AND SAVE THE USER DOCUMENT INTO THE DB
    user = await db
    .getDb()
    .collection("users")
    .insertOne({
        firstName,
        lastName,
        email,
        password: hashPassword
    })


    // RETURN BACK A JSON WEB TOKEN 
    const token = jwt.sign({email}, keys.JWT_Secret)


    // RETURN THE TOKEN AND SUCCESS MESSAGE
    res.json({
        token,
        msg: "User created"
    })


})

// LOG IN ROUTE 
// PUBLIC
router.post("/login", [], (req, res) => {
    // VALID USER INPUT,

    // CHECK IF USER EXISTS 

    // COMPARE PASSWORD IN THE DATABASE WITH PROVIDED PASSWORD

    // RETURN JSON WEB TOKEN
})


// GETS USER BY TOKEN
// PRIVATE




module.exports = router