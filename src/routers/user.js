const express=require('express')
const router= new express.Router()

const User=require('../models/user')

router.post('/users',async(req,res)=>{
    const user=new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.get('/users',async(req,res)=>{

    try{
        const user=await(User.find({}))
        res.status(201).send(user)
    } catch(e){
        res.status(500).send(e)
    }
})


router.get('/users/:id',async(req,res)=>{
    const _id=req.params.id
    try{
        const user= await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.status(201).send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.patch('/users/:id',async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowed=['name','password','email','age']
    const isvalid=updates.every((update)=>allowed.includes(update))
    try{
        const user=await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
        if(!user){
            return res.status(404).send()
        }
        res.status(201).send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.delete('/users/:id', async(req,res)=>{
    try{
        const user=await User.findByIdAndDelete(req.params.id)
        if(!user){
        res.status(404).send()
        }
        res.status(201).send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports= router