const express = require('express');

const router = express.Router();

const users = [
  {
  firstname:"john",
  lastname:"Doe",
  age:25
 },
 {
  firstname:"jahn",
  lastname:"Doe",
  age:24
 }
]

router.get('/', (req, res)=>{

 res.send(users);
})

router.post('/',(req,res)=>{
 console.log('POST ROUTER REACHED');

 res.send('POST ROUTE REACHED');
})

module.exports = router;