const mongoose = require('mongoose');
const validator= require('validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        validate: (value)=>{
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email-id");
            }
        }   
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength:8,
        validate: (value)=>{
            if(value.toLowerCase().includes('password')){
                throw new Error("The password can't contain the term password");
            }
        }
    }
})

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner',
})

userSchema.methods.toJSON = function(){
    const user=this;
    const userObject=user.toObject();
    delete userObject.password;
    return userObject;
}

userSchema.methods.generateAuthToken = async function(){
    const user=this;
    const token= jwt.sign({_id:user._id.toString()},'thisismynewcourse', { expiresIn: '1h' });
    return token;
}

userSchema.statics.findByCredentials = async (email,password)=>{
    console.log(email,password)
    const user= await User.findOne({ email });
    if(!user){
        throw new Error('Unable to login, invalid user email-id');
    }
    const isMatch= await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error('Password did not matched');
    }
    return user;
}

userSchema.pre('save',async function(next){
    const user=this;
    if(user.isModified('password')){
        user.password= await bcrypt.hash(user.password,8);
    }
    next();
})

const User=mongoose.model('User',userSchema);

module.exports = User;
