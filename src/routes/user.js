const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/user');

router.get('/', (req,res)=>{
   res.render('index');
})

router.post('/signup',async (req,res)=>{
   const user=new User(req.body);
   console.log(user);
   try{
      await user.save();
      //const token= await user.generateAuthToken();
      res.status(201).send({user:user,status:201});
   }catch(e){
      console.log(e);
      res.status(400).send(e);
   }
});

router.post('/login',async (req,res)=>{
   console.log(req.body);
   try{
      const user=await User.findByCredentials(req.body.email,req.body.password);
      const token= await user.generateAuthToken();
      res.cookie('auth',token);
      res.status(200).send({user,status:200});
   }catch(e){
      console.log(e);
   }
});

router.get('/dashboard', auth, (req,res)=>{
   res.render('dashboard',{login:req.isLoggedIn,name:req.user.name});
})

router.get('/logout', (req,res)=>{
   res.clearCookie('auth');
   res.redirect('/');
})

module.exports = router;