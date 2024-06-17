const { CONNECTION_STRING } = require("../constant")
const mongoose = require("mongoose")

mongoose.connect(CONNECTION_STRING).then(()=>{
    console.log("MongoDB connect successfully");
}).catch((error)=>{
    console.log("MongoDB connection failed");
})

const Users = mongoose.model("Users",{
    username:String,
    email:String,
    password:String
})
const Images = mongoose.model("Images",{
    email:String,
    imageUrl:String
})
module.exports = {
    Users,
    Images
}