const mongoose=require('mongoose')
const userschema=new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        Unique:true
    },
    password:{
        type:String
    },
    confirmpassword:{
        type:String
    }
       
    
},{timestamps:true})

module.exports=mongoose.model('userdata',userschema)


