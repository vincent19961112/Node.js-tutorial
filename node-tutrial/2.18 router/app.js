const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user');

// 獲取 cookie 的過期時間
const getCookieExpires = ()=>{
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  console.log('d.toGMTString() is ',d.toGMTString())
  return d.toGMTString()
}

// session 數據
const SESSION_DATA ={}

const getPostData = (req) =>{
 const promise = new Promise((resolve, reject)=>{
  if(req.method !== 'POST'){
   resolve({})
   return
  }
  if(req.headers['content-type'] !== 'application/json'){
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

const serverHandle = (req, res) =>{

 //設置返回格式 JSON
 res.setHeader('Content-type', 'application/json')

 // 獲取 path
 const url = req.url;
 req.path = url.split('?')[0];
 
 // 解析 query
 req.query = querystring.parse(url.split('?')[1])

 // 解析 cookie
 req.cookie = {}
 const cookieStr = req.headers.cookie || '';
 cookieStr.split(';').forEach(item => {
   if(!item){
     return
   }
   const arr = item.split('=')
   const key = arr[0].trim()
   const val = arr[1].trim()
   req.cookie[key] = val
 })

 // 解析 session
 let needSetCookie = false
 let userId = req.cookie.userid
 if(userId){
   if(!SESSION_DATA[userId]){
     SESSION_DATA[userId] = {}
    } 
  } else {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    SESSION_DATA[userId] = {}
  }
  req.session = SESSION_DATA[userId]

 // 處理 post data
 getPostData(req).then(postData=>{
  req.body = postData

  // 處理 blog 路由
  //  const blogData = handleBlogRouter(req,res)
  //  if(blogData){
  //   res.end(
  //    JSON.stringify(blogData)
  //   )
  //   return 
  //  }

   const blogResult = handleBlogRouter(req,res)
    if(blogResult){
      blogResult.then(blogData=>{
        if(needSetCookie){
           res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        res.end(
        JSON.stringify(blogData)
        )
    })
    return 
  }


  //  const userData = handleUserRouter(req,res)
  //  if(userData){
  //   res.end(
  //    JSON.stringify(userData)
  //   )
  //   return 
  //  }
    const userResult = handleUserRouter(req,res)
    if(userResult){
      userResult.then(userData=>{
            if(needSetCookie){
           res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)

        }
          res.end(
            JSON.stringify(userData)
          ) 
      })
      return 
    }

   res.writeHead(404,{"Content-type":"text/plain"});
   res.write("404 Not Found\n")
   res.end()
 })


}

module.exports = serverHandle

// process.env.NODE_ENV