const mongdb = require("mongodb");
const {MongoClient} = mongdb;
const keys = require("../configs/dev")

let _db;

const initDb = callback => {
    if(_db){
        console.log("We already have a connection")
        return callback(null, _db)
    }
    MongoClient.connect(keys.mongoURI, { useUnifiedTopology: true })
    .then(client => {
        _db = client.db()
        callback(null, _db)
    })
    .catch(err => {
        callback(err)
    })
}

const getDb = callback => {
    if(!_db){
        throw Error("Database not initialized")
    }
    return _db
}


module.exports = {
    initDb,
    getDb
}

/*
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const keys = require("../configs/dev")

let _db;

const initDb = callback => {
    if(_db){
        console.log("Database is already initialized");
        return callback(null, _db)
    }
    MongoClient.connect(keys.mongoURI, { useUnifiedTopology: true })
    .then(client => {
        _db = client.db()
        callback(null, _db)
    })
    .catch(err => {
        callback(err)
    })
}

const getDb = () => {
    if(!_db){
        throw Error("Database not initialized")
    }
    return _db
}


module.exports = {
    initDb,
    getDb
}

*/