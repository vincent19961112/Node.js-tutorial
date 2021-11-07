const env = process.env.NODE_ENV;

let MYSQL_CONF
let REDIS_CONF

if(env === 'dev'){
  // MySQL
  MYSQL_CONF= {
  host: 'localhost',
  user:'root',
  password:'v19961112',
  port:'3306',
  database:'myblog'
  }

  //Redis
  REDIS_CONF={
    port: 6379,
    host:'127.0.0.1'
  }
}
if(env === 'production'){
  // MySQL
  MYSQL_CONF= {
  host: 'localhost',
  user:'root',
  password:'v19961112',
  port:'3306',
  database:'myblog'
  }

  //Redis
  REDIS_CONF={
    port: 6379,
    host:'127.0.0.1'
  }
}

module.exports = {
 MYSQL_CONF,
 REDIS_CONF
}