const router = require("express").Router()
const {check, validationResult} = require("express-validator")
const db = require("../database/db");
const bycrpt = require("bcrypt")
const jwt = require("jsonwebtoken")
const keys = require("../config/dev")
const checkAuth = require("../middleware/checkAuth")

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
        token
    })


})

// LOG IN ROUTE 
// PUBLIC
router.post("/login", [
    check("email", "Provide a valid email")
    .isEmail(),
    check("password", "Password is required")
    .not()
    .isEmpty()
], async (req, res) => {
    // VALID USER INPUT,
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body
    // CHECK IF USER EXISTS 
    let user = await db
    .getDb()
    .collection("users")
    .findOne({email})

    if(!user) return res.status(400).json({errors : [{msg: "Invalid Credentials"}]})

    // COMPARE PASSWORD IN THE DATABASE WITH PROVIDED PASSWORD
    let results = await bycrpt.compare(password, user.password)

    if(!results) return res.status(400).json({errors : [{msg: "Invalid Credentials"}]})

    // RETURN JSON WEB TOKEN
     // RETURN BACK A JSON WEB TOKEN 
     const token = jwt.sign({email}, keys.JWT_Secret)


     // RETURN THE TOKEN AND SUCCESS MESSAGE
     res.json({
         token,
         msg: "User logged in"
     })
})


// GETS USER BY TOKEN
// PRIVATE
router.get("/", checkAuth, async (req, res) => {

    // GET THE TOKEN FROM THE REQ   
    const email = req.user;

    const redis = require("redis")
    const redisUrl = "redis://127.0.0.1:6379";
    const client = redis.createClient(redisUrl);
    const util = require("util")
    client.get = util.promisify(client.get)


    const cachedUser = await client.get(email)

    if(cachedUser){
        return res.json({...JSON.parse(cachedUser)[0], fromCache: true})
    }

    
    
    // FIND AND RETURN USER
    try {
        const user = await db
        .getDb()
        .collection("users")
        .find({email})
        .project({"password": 0, "_id": 0})
        .toArray()

        client.set(email, JSON.stringify(user))
        
        res.json(user[0])
    } catch (error) {
        res.status(500).json({msg: "Server Error"})
    }



})



module.exports = router