const mongoose=require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    usenewurlParser: true,
})

const User=mongoose.model('User',{
    name:{
        type:String,
        required: true
    },
    age:{
        type:Number,
        validate(value){
            if(value<0){
                throw new mongoose.Error("Age must be positive")
            }
        }
    }
})

const me=new User({
    name:"DEF",
    age: 24
})

me.save().then(()=>{
    console.log(me)
}).catch((error)=>{
    console.log("Error! ",error)
})

const task=mongoose.model('tasks',{
    desc: {
        type: String
    },
    completed:{
        type: Boolean
    }
})

const you=new User2({
    desc: "This is to check something",
    completed:false
})

// you.save().then(()=>{
//     console.log(you)
// }).catch((error)=>{
//     console.log("error ",error)
// })

