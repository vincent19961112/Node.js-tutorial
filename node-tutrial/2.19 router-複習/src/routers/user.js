const {} = require('../controller/user');
const { SuccessModel,ErrorModel } = require('../model/resModel')

const handleUserRouter = (req,res)=>{
 const method = req.method
 if(method ==='POST' && req.path ==='/api/user/login'){
  return
 }
}

module.exports = handleUserRouter