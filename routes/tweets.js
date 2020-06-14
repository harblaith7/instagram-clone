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
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // SAVING TWEET TO DATABASE
    const {tweet} = req.body;

    const userTweet = await db
        .getDb()
        .collection("tweets")
        .insertOne({
            tweet,
            user: req.user
        })

    console.log(userTweet)
    
    res.json(userTweet)

})


module.exports = router