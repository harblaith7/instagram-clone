const express = require("express")
const auth = require("./routes/auth")
const db = require("./database/db")

const app = express()

// MIDDLEWARES 
app.use(express.json())

// ROUTE 
app.use("/api/auth", auth)

const PORT = process.env.PORT || 5000

db.initDb((err, db) => {
    if(err){
        console.log(err)
    } else {
        app.listen(PORT, () => {
            console.log(`Now listening on port ${PORT}`)
        })
    }
})


