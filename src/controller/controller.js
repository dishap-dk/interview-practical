const model=require('../model/model')
const mongoose=require('mongoose')
const validation=require('../validation/validation')



const userRegister=async function (req,res){
    try{
        let data= req.body
if(Object.keys(data).length==0){
    return res.status(400).send({status:false, msg:"data cannot be empty"})
}
const{firstName,lastName,email,password,confirmpassword}=data

if(!firstName)
return res.status(400).send({status:false, msg:"firstname required"})

if(!lastName)
return res.status(400).send({status:false, msg:"lastNameame required"})

if(!password)
return res.status(400).send({status:false, msg:"password required"})
if(!validation.passtest(password))
return res.status(400).send({status:false, msg:"please check the format of password "})


if(!confirmpassword)
return res.status(400).send({status:false, msg:"confirmpassword required"})
if(!validation.passtest(confirmpassword))
return res.status(400).send({status:false, msg:"please check the format of confirmpassword "})


if(!email)
return res.status(400).send({status:false, msg:"email required"})


if(!validation.emailtest(email))
return res.status(400).send({status:false, msg:"please check the format of email "})

let checkEmail=await model.findOne({email:email})
if(checkEmail)
return res.status(400).send({status:false, msg :"already present email"})

let createdata=await model.create(data)
return res.status(201).send({status:true, msg :"successfully registered", data:createdata})

}catch(err){
    return res.status(500).send({status:false, msg:err.message})
    }
}

const userlogin=async function(req,res){
    let data= req.body

    const {email,password,...a}=data
    if(Object.keys(data).length==0)
    return res.status(400).send({status:false, msg:"should contain email id and password"})
// if(Object.keys(a).length>0)
// return res.status(400).send({status:false, msg:"should contain only  email id and password"})

if(!email || !password)
return res.status(400).send({status:false, msg:"email and password is compulsory"})

let details=await model.findOne({email:email, password:password})
console.log(details)
if(!details)
return res.status(404).send({status:false, msg :"no user found with this details"})


return res.status(200).send({status:true, msg:"successfull", data:details})
}



const getAllDetails=async function(req,res){

    let userId= req.params.user_id

     let isValid = mongoose.Types.ObjectId.isValid(userId)
        if (isValid == false) return res.status(400).send({ status : false, msg: "Invalid length of userId" })

    let getAll=await model.findById(userId)
    if(!getAll)
    return res.status(404).send({status:false, msg :"no data found"})
    return res.status(200).send({status:true, msg :getAll})
}



const allusers=async function(req,res){
try{
let alldata=await model.find().sort({firstName:-1})
return res.status(200).send({status:true,msg :alldata})


}catch(err){
    res.status(500).send({status:false, msg :err.message})
}
}



    module.exports={userRegister,userlogin,getAllDetails,allusers}