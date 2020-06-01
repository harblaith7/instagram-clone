const express = require("express")
const bodyParser = require("body-parser");
const db = require("./database/db");
const authRoutes = require("./routes/auth")
const checkAuth = require("./middleware/checksAuth")


const app = express()

// MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use("/auth", authRoutes)

db.initDb((err, _db) => {
    if(err){
        console.log(err)
    } else {
        app.listen(4000, () => {
            console.log("Now running on port 4000")
        })
    }
})


app.get("/questions", checkAuth, (req, res) => {
    res.send("Here is access to your questions")
})


