const { getList } = require('../controller/blog');
const { SuccessModel } = require('../model/resModel')

const handleBlogRouter = (req,res)=>{

 const method = req.method;

 if(method ==='GET' && req.path === '/api/blog/list'){
  const author = req.query.author || ''
  const keyword = req.query.keyword || ''
  const listData = getList(author,keyword);
  return new SuccessModel(listData)
 }
 if(method === 'GET' && req.path === 'api/blog/detail'){
  const id = req.query;
  const data = getDetail(id)
  return new SuccessModel(data)
 }
 if(method ==='POST' && req.path ==='/api/blog/new'){
  return ''
 }
 if(method === 'POST' && req.path ==='/api/blog/update'){
  return ''
 }
 if(method === 'POST' && req.path === 'api/blog/delete'){
  return ''
 }
}