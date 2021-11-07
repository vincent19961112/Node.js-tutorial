const express = require('express')
const router = express.Router()

// Getting all
router.get('/',(req,res)=>{
 res.send('Hello World')
})
// Getting One
router.get(':id',(req,res)=>{

})
// Creating one
router.post('/',(req,res)=>{

})
// Updating One
router.patch('/',(req,res)=>{

})
// Deleting One
router.delete('/',(req,res)=>{

})
module.exports = router