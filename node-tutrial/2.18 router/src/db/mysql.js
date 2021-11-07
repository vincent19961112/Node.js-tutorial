const mysql = require('mysql');
const {MYSQL_CONF} = require('../conf/db');

//創建鏈接對象
const con = mysql.createConnection(MYSQL_CONF)

//開始鏈接
con.connect()

// 統一執行 sql 的函數
function exec(sql) {
 const promise = new Promise((resolve,reject)=>{
   con.query(sql,(err,result)=>{
     if(err){
       reject(err)
       return
     }
       resolve(result)
    })
  })
 return promise
}

module.exports = {
 exec
}
