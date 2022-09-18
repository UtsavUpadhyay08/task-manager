const mongoose=require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    usenewurlParser: true,  
})

const Task= mongoose.model('Task',{
    desc:{
        type: String,
        required: true,
        trim:true
    },
    completed:{
        type: Boolean,
        default: false
    }
})