const express = require("express");
const db = require("./database/db.js")
const mongodb = require("mongodb")
const authRoutes = require("./routes/auth")
const app = express()


app.get("/", (req, res) => {
    res.send("Hello")
})


app.use("/auth", authRoutes)


db.initDb((err, db) => {
    if(err) {
        console.log(err)
    } else {
        app.listen(4000, () => {
            console.log("Now listening on port 4000")
        })
    }
})
