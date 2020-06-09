const jwt = require("jsonwebtoken")
const keys = require("../config/dev")


module.exports = (req, res, next) => {
    // GET TOKEN FROM THE HEADER
    const token = req.header("x-auth-token")
    

    // CHECK IF THE TOKEN EXISTS    
    if(!token) return res.status(400).json({msg: "No token found"})
    
    // DECODE THE TOKEN
    try {
        
        jwt.verify(token, keys.JWT_Secret, (err, decoded) => {
            
            if(err) return res.status(400).json({msg: "Token cannot be decoded"})
            console.log(decoded)
            req.user = decoded.email
            next()
        }) 
    } catch (error) {
        console.error('something wrong with auth middleware');
        res.status(500).json({ msg: 'Server Error' });
    }
}