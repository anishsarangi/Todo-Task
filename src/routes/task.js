const express= require('express');
const Task=require('../models/task');
const auth= require('../middleware/auth');
const router = express.Router();

router.post('/tasks',auth, async (req,res)=>{
    const task= new Task({
        ...req.body,
        owner: req.user._id
    })
    try{
        await task.save();
        res.status(201).send({status:201});

    }catch(e){
        res.status(500).send();
    }
});

router.get('/tasks',auth, async(req,res)=>{
    try{
        var tasks = await Task.find({owner:req.user._id});
        console.log(tasks);
        res.render('tasks',{tasks,login:req.isLoggedIn,name:req.user.name});
    }catch(e){
        res.status(400).send(e);
    }
});

router.delete('/tasks/:id',auth, async(req,res)=>{
    try{
        const _id=req.params.id;
        const deletedUser=await Task.findOneAndDelete({_id,owner:req.user._id});

        if(!deletedUser){
            return res.status(404).send();
        }

        res.send(deletedUser);
    }catch(e){
        res.status(500).send();
    }
})

module.exports = router;