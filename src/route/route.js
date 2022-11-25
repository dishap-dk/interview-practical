const express= require('express')
const router=express.Router()
const controller=require('../controller/controller')

router.get('/test-me', function(req,res){
    return res.send({status:"successfull"})
})

router.post('/userRegister',controller.userRegister)
router.post('/userLogin',controller.userlogin)

router.get('/all',controller.allusers)

router.get('/getAllDetails/:user_id',controller.getAllDetails)


module.exports=router