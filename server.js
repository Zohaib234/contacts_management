const express = require('express');
const errorhandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');

const dotenv = require('dotenv').config();

const app = express()
connectDB();

const port = process.env.PORT || 30001;



// accepts data from clients in json format

app.use(express.json());

app.use(errorhandler);
app.use('/api/contacts',require('./routes/contactRoutes'));
app.use('/users',require('./routes/userRoutes'))
app.get('/', (req,res)=>{

    res.json({message: "home page"});
})



app.listen(port,()=>{

    console.log(`server is running on port ${port}`);
})