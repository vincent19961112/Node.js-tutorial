const getList = (author,keyword) =>{
 return [
  {
   id:1,
   title:'title A',
   content:'content A',
   createTime: 1546610391112,
   author:'vincent'
  },
  {
   id:2,
   title:'title B',
   content:'content B',
   createTime: 1546614568112,
   author:'steven'
  }
 ]
}

const getDetail = (id) =>{
 return [
    {
   id:1,
   title:'title A',
   content:'content A',
   createTime: 1546610391112,
   author:'vincent'
  },
 ]
}

module.exports = {
 getList,
 getDetail
}