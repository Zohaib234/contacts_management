

const asyncHandler = require('express-async-handler');

const userModel= require('../models/userModel');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const registerUser = asyncHandler( async (req,res)=>{

    const {username,email,password} = req.body;

    if(!username || !email || !password){

        res.status(400);
        throw new Error("all fields are mendatory")
    }
     
    const availableuser = await userModel.findOne({email})

    if(availableuser){

        res.status(400);
        throw new Error("User already exists")
    }

    // encrypted password

    const hashedpassword = await bcrypt.hash(password,10);

    const newuser = await userModel.create({
        username,
        email,
        password: hashedpassword
    })

    console.log(`user created ${newuser}`);

    if(newuser){
       
        res.status(201).json({_id:newuser._id, email:newuser.email});

    }
    else{
       res.status(400);
       throw new Error("user not created")
    }

    
})

const loginUser =  asyncHandler( async (req,res)=>{

     
    const {email,password} = req.body;

    console.log(email , password);

    if(!email || !password){

      res.status(400);
      throw new Error("all fields are mendatory");
    }

    const user =  await userModel.findOne({email});

    console.log(user);
    if(user &&  await bcrypt.compare(password,user.password)){

        const accessToken = jwt.sign({

            user:{
                username:user.username,
                email:user.email,
                id:user.id
            },

        }, "zohaib3031",{expiresIn:"10m"});
        res.json({accessToken:accessToken});
    }
    else{
        res.status(401);
        throw new Error('not found')
    }

   
})


const currentUser = asyncHandler( async (req,res)=>{

    res.json({message:" current user"});
})

module.exports = {registerUser,currentUser,loginUser};
