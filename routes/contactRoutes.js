const express = require('express')

const router = express.Router();

const {getContacts,getContact,createContact,deleteContact,updateContact} = require('../controllers/contactControllers');


// get all contacts
router.get('/',getContacts);

// get individual contact

router.get('/:id',getContact);

// post a contact

router.post('/',createContact);

// put a contact

router.put('/:id',updateContact);

// delete a contact

router.delete('/:id',deleteContact);

module.exports = router;