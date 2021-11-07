const mysql = require('mysql')

//創建鏈接對象
const con = mysql.createConnection({
 host: 'localhost',
 user:'root',
 password:'v19961112',
 port:'3306',
 database:'myblog'
})

// 開始連接
con.connect()

const sql = `insert into blogs(title,content,createtime,author) values('標題C','內容C',1546870349518,'zhangan')
;`;
con.query(sql,(err,result)=>{
 if(err){
  console.log(err)
  return 
 } 
 console.log(result)
})

con.end();

