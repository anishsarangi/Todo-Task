const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next)=>{
    try{
        const token= req.header('Authorization') || req.cookies.auth;
        const decode= jwt.verify(token,'thisismynewcourse');
        const user = await User.findOne({_id:decode._id});
        console.log(user);
        if(!user){
            throw new Error();
        }
        req.token= token;
        req.isLoggedIn= true
        req.user= user;
        next();
    }catch(e){
        res.status(401).send({"error":"Please Authenticate"});
    }
}

module.exports = auth;