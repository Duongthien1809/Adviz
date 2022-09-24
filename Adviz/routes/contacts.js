const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactsController');

router.route('/contacts')
.get(contactController.getAllContact)
.post(contactController.createContact);

router.route('/contacts/:id')
.get(contactController.getContactByID)
.put(contactController.updateContactByID)
.delete(contactController.deleteContact);

module.exports = router;