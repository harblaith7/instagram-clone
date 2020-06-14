const router = require("express").Router()
const db = require("../database/db");
const checkAuth = require("../middleware/checkAuth")
const {check, validationResult} = require("express-validator");



router.post("/", checkAuth, [
    check("tweet", "Tweet cannot be empty")
    .not()
    .isEmpty()
], async (req, res) => {
    // CHECKING IF TWEET IS EMPTY
    console.log(req.body, "???")
    const errors = validationResult(req)
    console.log(errors)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    console.log("running")

    // SAVING TWEET TO DATABASE
    const {tweet} = req.body;

    try {
        const userTweet = await db
        .getDb()
        .collection("tweets")
        .insertOne({
            tweet,
            user: req.user
        })

        console.log(userTweet, "sadasd")
        
        res.json(userTweet)
    } catch (error) {
        console.log(error)
        res.json(error)
    }

})


module.exports = router