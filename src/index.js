const express=require('express')
const userRouter=require('./routers/user')
const taskRouter=require('./routers/task')

const app=express()
const port=process.env.PORT || 3000
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


require('./db/mongoose')

app.listen(port,()=>{
    console.log("Server is listening on port 3000")  
})