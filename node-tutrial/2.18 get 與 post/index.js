const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req,res)=>{
 
 const method = req.method;
 const url = req.url;
 const path = url.split('?')[0];
 const query = querystring.parse(url.split('?')[1]);

 res.setHeader('Content-type','application/json');

 const resData = {
  method,
  url,
  path,
  query
 }

 if(method === "GET"){
  res.end(JSON.stringify(resData))
 }
 if(method === "POST"){
  req.on('data',chunk=>{
   let postData = '';
   postData += chunk.toString();  
   req.on('end',()=>{
   resData.postData = postData;
   res.end(JSON.stringify(resData))
  })
  })
  
 }
})

server.listen('8000');
console.log('ok')