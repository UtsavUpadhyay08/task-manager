const mongoose=require('mongoose')
const validator=require('validator')

const User=mongoose.model('User',{
    name:{
        type:String,
        trim:true,
        required: true,
    },
    email:{
        type: String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is Invalid")
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim:true,
        minlength: 7,
        validate(value){
            // let ans=0
            if(value.toLowerCase().includes("password")){
                throw new Error("Please set your password to something else")
            }
        }
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

module.exports=User