

const asyncHanlder = require('express-async-handler');

const Contacts = require('../models/contactModel');
// all contacts 
const getContacts = asyncHanlder( async (req,res)=>{

    const contacts = await Contacts.find();

    res.status(200).json(contacts);

});

// individual contacts

const getContact = asyncHanlder( async (req,res)=>{
     
    const individual = await Contacts.findById(req.params.id);
     if(!individual){
        res.status(404);
        throw new Error("not found");
     }
    res.json(individual);
});

// create a contact 

const createContact =  asyncHanlder( async (req,res)=>{

   const {name , email } = req.body;

   console.log(name , email);

   if(name==null || email==null){

    res.status(400);
    throw new Error("all fields are mendatory")
   }

   const contact = await Contacts.create({
    name,
    email
   });





    res.status(201).json(contact);
   
    
});

// update contact


const updateContact = asyncHanlder( async (req,res)=>{

    const individual = await Contacts.findById(req.params.id);
    if(!individual){
       res.status(404);
       throw new Error("not found");
    }

    const updatedcontact = await Contacts.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new :true} 
        );
     

    res.json(updatedcontact);
});

// delete contact 


const deleteContact = asyncHanlder( async (req,res)=>{

    const individual = await Contacts.findById(req.params.id);
    if(!individual){
       res.status(404);
       throw new Error("not found");
    }

    await Contacts.findByIdAndRemove(req.params.id);

    res.json(individual);
});


module.exports = {getContact ,getContacts,createContact,updateContact,deleteContact};