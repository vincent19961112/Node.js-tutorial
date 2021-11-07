const express = require('express');

const bodyParser = require('body-parser');

const usersRoutes = require('./routers/users');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/users', usersRoutes);

app.get('/', (req,res)=> res.send('Hello from Homepage.'));

app.listen(PORT, ()=>console.log(`server Running on port: http://localhost:${PORT}`))