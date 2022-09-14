// const {MongoClient, ObjectId} = require('mongodb')


// const ConnectionURL= "mongodb://127.0.0.1:27017"
// const databaseName= "task-manager"

// const id= new ObjectId()

// MongoClient.connect(ConnectionURL,{useNewUrlParser:true},(error,client)=>{
//     if(error){
//         console.log(error)
//     }
//     console.log("Connected")

//     const db=client.db(databaseName)
//     db.collection("users").deleteOne({
//         age:27
//     }).then((result)=>{
//         console.log(result)
//     }).catch((error)=>{
//         console.log(error)
//     })
// }) 
