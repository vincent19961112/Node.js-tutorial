const fs = require('fs')
const { resolve } = require('path')
const path = require('path')


//callback hell
// function getFileName(fileName,callback){
//  const fullFileName = path.resolve(__dirname, 'files', fileName)
//  fs.readFile(fullFileName,(err,data)=>{
//   if(err){
//    console.log(err)
//    return
//   }
//   callback(
//    JSON.parse(data.toString())
//    )
//  })
// }

// getFileName('a.json',aData=>{
//  console.log('a data', aData)
//  getFileName(aData.next,bData=>{
//   console.log('b data',bData)
//   getFileName(bData.next, cData=>{
//    console.log('c data',cData)
//   })
//  })
// })

//promise 獲取文件內容
function getFileName(fileName){
 const promise = new Promise((resolve,reject)=>{
  const FullFileName = path.resolve(__dirname,'files',fileName)
  fs.readFile(FullFileName,(err,data)=>{
   if(err){
    reject(err)
    return
   }
   resolve(
    JSON.parse(data.toString())
    )
  })
 })
 return promise
}

getFileName('a.json').then(aData =>{
 console.log('a data', aData)
 return getFileName(aData.next)
}).then(bData=>{
 console.log('b data',bData);
 return getFileName(bData.next);
}).then(cData=>{
 console.log('c data',cData)
})