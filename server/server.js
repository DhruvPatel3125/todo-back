const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');

app.use(cors());

connectDB();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api',require('./routes/todo-routes'))

app.get('/', (req,res)=> {
    res.send('Hello, World!');
})
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})
