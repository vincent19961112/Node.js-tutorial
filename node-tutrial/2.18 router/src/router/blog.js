const { 
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog 
} = require('../controller/blog');
const { SuccessModel,ErrorModel } = require('../model/resModel');

// 統一的登入驗證函數
const loginCheck = (req) =>{
  if(!req.session.username){
     return Promise.resolve(new ErrorModel('尚未登入')) 
  }
}

const handleBlogRouter = (req,res) =>{
  const method = req.method;
  const id = req.query.id;

 //獲取部落格列表文章
 if(method === "GET" && req.path === "/api/blog/list"){
   const author = req.query.author || '';
   const keyword = req.query.keyword || '';
  //  const listData = getList(author,keyword);
  //  return new SuccessModel(listData)
   const result = getList(author, keyword)
   return result.then(listData =>{
     return new SuccessModel(listData)
   })
 }
 //獲取一篇文章
 if(method === "GET" && req.path === "/api/blog/detail"){
  //  const data = getDetail(id);
  // return new SuccessModel(data)
  const result = getDetail(id)
  return result.then(data=>{
    return new SuccessModel(data)
  })
 }
 // 新建一篇文章
 if(method === "POST" && req.path === '/api/blog/new'){
  // const data = newBlog(req.body)
  // return new SuccessModel(data)

  const loginCheckResult = loginCheck(req)
  if(loginCheckResult){
    return loginCheckResult
  }

  req.body.author = req.session.username
  const result = newBlog(req.body)
  return result.then(data=>{
    return new SuccessModel(data)
  })

 }
 // 更新一篇文章
 if(method === "POST" && req.path === '/api/blog/update'){

  const loginCheckResult = loginCheck(req)
  if(loginCheckResult){
    return loginCheckResult
  }

  const result = updateBlog(id,req.body)
  return result.then(val=>{
    if(val){
      return new SuccessModel()
    }else{
      return new ErrorModel('更新部落格失敗')
    } 
  })
 }
 //刪除一篇文章
 if(method === "POST" && req.path ==="/api/blog/delete"){

  const loginCheckResult = loginCheck(req)
  if(loginCheckResult){
    return loginCheckResult
  }

  req.body.author = req.session.username
  const result = delBlog(id,author)
  return result.then(val=>{
    if(val){
      return new SuccessModel()
    }else{
      return new ErrorModel('刪除部落格失敗')
    }
  })
 }
}
module.exports = handleBlogRouter