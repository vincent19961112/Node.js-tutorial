const redis = require('redis')

// 創建客戶端
const redisClient = redis.createClient(6379,'127.0.0.1')
redisClient.on('error',err=>{
 console.error(err)
})

// 測試
redisClient.set('myname','zhangsan2',redis.print)
redisClient.get('myname',(err,val)=>{
 if(err){
  console.error(err)
  return
 }
 console.log('val',val)
})

// 退出
redisClient.quit()