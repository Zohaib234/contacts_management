const mongoose = require('mongoose');

const connectDB =  async()=>{

  try{
    
    const connect = await mongoose.connect("mongodb://127.0.0.1/zohaib");
    console.log("Database connected \n " , connect.connection.host , connect.connection.name );

  }
  catch(err){
    console.log(err.message);
  }

}

module.exports = connectDB;