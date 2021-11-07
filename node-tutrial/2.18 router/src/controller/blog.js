const { exec } = require('../db/mysql');
 
const getList = (author, keyword) =>{
   let sql = `select * from blogs where 1=1 `
   if(author) {
      sql += `and author='${author}'`
   }
   if(keyword){
      sql += `and title like '%${keyword}%'`
   }
   sql +=`order by createTime desc;`

   return exec(sql)
}

const getDetail = (id)=>{
 const sql = `select * from blogs where id = '${id}'`
 return exec(sql).then(rows =>{
    return rows[0]
 })
}

const newBlog = (blogData = {})=>{
   //blogData 是一個部落格對象，包含 title content author 屬性
   const title = blogData.title
   const author = blogData.author
   const content = blogData.content
   const createTime = Date.now()

   const sql =`insert into blogs (title,content,author,createTime)values('${title}','${content}','${author}','${createTime}')`

   return exec(sql).then(insertData=>{
      console.log('insertData is ',insertData);
      return {
         id: insertData.insertId
      }
   })
}

const updateBlog = (id,blogData ={})=>{
   // id 就是要更新部落格的 id
   // blogData 是一個部落格對象，包含 title content 屬性
   const title = blogData.title
   const content = blogData.content

   const sql = `update blogs set title='${title}',content='${content}'where id='${id}'`
   return exec(sql).then(updateData=>{
      console.log('updateData is ',updateData)
      if(updateData.affectedRows > 0 ){
         return true
      }
      return false
   })

}

const delBlog = (id, author)=>{
   // id 就是要刪除部落格的 id
   const sql = `delete from blogs where id='${id}' and author='${author}'`
   return exec(sql).then(delData=>{
      if(delData.affectedRows > 0){
         return true
      }
      return false
   })
}

module.exports = {
 getList,
 getDetail,
 newBlog,
 updateBlog,
 delBlog
}