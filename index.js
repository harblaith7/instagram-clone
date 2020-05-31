const express = require("express");
const db = require("./database/db.js")
const mongodb = require("mongodb")
const app = express()


app.get("/", (req, res) => {
    res.send("Hello")
})


app.post("/test", (req, res) => {
    db.getDb()
    .collection("haha")
    .insertOne({
        name: "Laith",
        age: 23
    })
    .then(result => {
        res.send(result)
    })
    .catch(err => {
        res.status(500)
    })
})


db.initDb((err, db) => {
    if(err) {
        console.log(err)
    } else {
        app.listen(4000, () => {
            console.log("Now listening on port 4000")
        })
    }
})
