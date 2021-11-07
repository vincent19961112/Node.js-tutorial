const { login } = require('../controller/user') 
const { SuccessModel,ErrorModel } = require('../model/resModel')

const handleUserRouter = (req,res)=>{
 const method = req.method;
 
 // 登入
 if(method === "POST" && req.path === '/api/user/login'){
  const {username, password } = req.body
  // const { username, password } =req.query
  const result = login(username,password)
  return result.then(data=>{
    if(data.username){

     req.session.username = data.username
     req.session.realname = data.realname

     console.log('req session is ',req.session)

     return new SuccessModel()
    }
     return new ErrorModel('登入失敗')
   })
 }

}

module.exports = handleUserRouter