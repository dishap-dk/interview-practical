const mongoose=require('mongoose')
const express=require('express')
const route=require('./route/route')
const { application } = require('express')



const app=express()
app.use(express.json())
mongoose.connect("mongodb+srv://Dishap:gn6kyXLuhnBE1EJK@cluster0.bwp65jf.mongodb.net/interviewdb?retryWrites=true&w=majority",{useNewUrlParser:true})
.then(()=>console.log("mongo db is connected succesffuly"))
.catch((err)=>console.log(err))

app.use('/',route)

app.listen(process.env.PORT || 3000 , function(){
    console.log('express app running on the port'+(process.env.PORT ||3000))
})
