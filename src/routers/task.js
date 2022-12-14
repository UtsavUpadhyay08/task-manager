const express=require('express')
const router=new express.Router()

const Task=require('../models/tasks')

router.post('/tasks',async(req,res)=>{
    const task=new Task(req.body)
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/tasks',async(req,res)=>{
    try{
        const task=await Task.find({})
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/tasks/:id',async(req,res)=>{
    const _id=req.params.id
    try{
        const task=await Task.findById(_id)
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id',async(req,res)=>{
    const updates= Object.keys(req.body)
    const allowed=['desc','completed']
    const isValid=updates.every((update)=>allowed.includes(update))
    if(!isValid){
        return res.status(400).send("Invalid Updates")
    }
    try{
        const task=await Task.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true})
        if(!task){
            res.status(404).send()
        }
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id',async(req,res)=>{
    try{
        const task=await Task.findByIdAndDelete(req.params.id)
        if(!task){
            res.status(404).send()
        }
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports= router