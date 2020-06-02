const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient;
const keys = require("../config/dev")


let _db;

// Initializing a database connection 
const initDb = callback => {
    // Is the database already initialized
    if(_db){
        return callback(null, _db)
    }
    // If it is not initialized we will initialize the connect 
    MongoClient.connect(keys.MongoURI, { useUnifiedTopology: true } )
    .then(client => {
        _db = client.db();
        callback(null, _db)
    })
    .catch(err => {
        callback(err)
    })
}


// Get the database connection
const getDb = () => {
    if(!_db){
        throw new Error("Database is not connected")
    }
    return _db
}


module.exports = {
    initDb,
    getDb
}