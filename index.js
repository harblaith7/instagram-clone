const express = require("express")
const bodyParser = require("body-parser");
const db = require("./database/db");
const authRoutes = require("./routes/auth")
const checkAuth = require("./middleware/checksAuth")

const app = express();

// MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// CORS 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


// ROUTES
app.use("/api/auth", authRoutes)


app.get("/", (req, res) => {
    res.send("hello")
})

db.initDb((err, _db) => {
    if(err){
        console.log(err)
    } else {
        app.listen(4000, () => {
            console.log("Now running on port 4000")
        })
    }
})



/*
const express = require("express")
const bodyParser = require("body-parser");
const db = require("./database/db");
const authRoutes = require("./routes/auth")
const checkAuth = require("./middleware/checksAuth")


const app = express()

// MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// CORS 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*")
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({})
    }
})

// ROUTES
app.use("/api", authRoutes)

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


*/