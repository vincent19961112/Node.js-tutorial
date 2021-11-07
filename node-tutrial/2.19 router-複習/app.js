const querystring = require('querystring')
const handleBlogRouter = require('./src/routers/blog')
const handleUserRouter = require('./src/routers/user')

const getPostData = (req) =>{
 const promise = new Promise((resolve,reject)=>{
  if(req.method !== 'POST'){
   resolve({})
   return 
  }
  if(req.headers['content-type'] !== 'applcation/json'){
   resolve({})
   return
  }
  let postData = ''
  req.on('data',chunk=>{
   postData+=chunk.toString()
  })
  req.on('end',()=>{
   if(!postData){
    resolve({})
    return
   }
   resolve(
    JSON.parse(postData)
   )
  })
 })
 return promise
}

const serverHandle = (req,res)=>{
 const url = req.url
 req.path = url.split('?')[0]

 req.query = querystring.parse(url.split('?')[1])

 getPostData(req).then(postData=>{
  req.body = postData
  const blogData = handleBlogRouter(req,res)
  if(blogData){
   res.end(
    JSON.stringify(blogData)
   )
   return
  }

  const userData = handleUserRouter(req,res)
  if(userData){
   JSON.stringify(userData)
  }
  return 
 })

 res.writeHead(404,{"Content-type":"text/plain"});
 res.write("404 Not Found\n")
 res.end()
}

module.exports = serverHandle