const express=require('express')
const app=express()
const port=process.env.PORT || 3000

require('./db/mongoose')
const User=require('./models/user')
const Task=require('./models/tasks')
app.use(express.json())


app.post('/users',async(req,res)=>{
    const user=new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    }
    catch(e){
        res.status(500).send(e)
    }
})

app.get('/users',async(req,res)=>{

    try{
        const user=await(User.find({}))
        res.status(201).send(user)
    } catch(e){
        res.status(500).send(e)
    }
})


app.get('/users/:id',async(req,res)=>{
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

app.patch('/users/:id',async(req,res)=>{
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

app.delete('/users/:id', async(req,res)=>{
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

app.post('/tasks',async(req,res)=>{
    const task=new Task(req.body)
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

app.get('/tasks',async(req,res)=>{
    try{
        const task=await Task.find({})
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

app.get('/tasks/:id',async(req,res)=>{
    const _id=req.params.id
    try{
        const task=await Task.findById(_id)
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

app.patch('/tasks/:id',async(req,res)=>{
    const updates= Object.keys(req.body)
    const allowed=['desc','completed']
    const isValid=updates.every((update)=>allowed.includes(update))
    if(!isValid){
        return res.status("400").send("Invalid Updates")
    }
    try{
        const task=await Task.findById(req.params.id)
        if(!task){
            res.status(404).send()
        }
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

app.delete('/tasks/:id',async(req,res)=>{
    try{
        const task=Task.findByIdAndDelete(req.params.id)
        if(!task){
            res.status(404).send()
        }
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

app.listen(port,()=>{
    console.log("Server is listening on port 3000")  
})