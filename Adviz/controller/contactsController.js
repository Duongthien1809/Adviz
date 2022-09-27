const Contact = require('../models/contactmodel');
const { ObjectID } = require('bson');
const contactModel = Contact.db.collection('contacts');
const fetch = require('node-fetch');

// get user by ID

const getContactByID = (req, res) => {
    contactModel.findOne({_id: ObjectID(req.params.id)}, (err, result) => {
        if(err) throw err;
        if(!result) return res.status(404).send('User not Found');
        res.send(result);
    });
    return console.log('User found successfully');
}

const updateContactByID = async (req, res) => {
    const url = "http://www.mapquestapi.com/geocoding/v1/address?key=cBdJO8Oy3mwHOkFoOUejjp7GOR95dAXW";
    const address = ""+ req.body.street +", "+ req.body.postcode +", " +  req.body.city +", "+req.body.country;
    const data = {
        "location": address,
        "options": {
          "thumbMaps": false
        }
      }
    const option = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
    };
    fetch(url,option)
    .then(response => {
        return response.json();
    })
    .then(data => {
        const currentLat = data.results[0].locations[0].displayLatLng.lat;
        const currentLng = data.results[0].locations[0].displayLatLng.lng;
        console.log(currentLat);
        console.log(currentLng);
        const updateContact = { 
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            street: req.body.street,
            postcode: req.body.postcode,
            city: req.body.city,
            country: req.body.country,
            phone: req.body.phone,
            birthday: req.body.birthday,
            isPrivate: req.body.isPrivate,
            owner: req.body.owner,
            lat: currentLat,
            lng: currentLng,
        }; 
        contactModel.findOneAndReplace({ _id: ObjectID(req.params.id) }, updateContact, (err, result) => {
            if(err) throw err;
            if(result.lastErrorObject.n === 0) return res.status(404).send({message: "contacts not Found! "});
            res.status(204).send('OK');
        });
    });

}
const createContact = (req, res) => {
    const url = "http://www.mapquestapi.com/geocoding/v1/address?key=cBdJO8Oy3mwHOkFoOUejjp7GOR95dAXW";
    const address = ""+ req.body.street +", "+ req.body.postcode +", " +  req.body.city +", "+req.body.country;
    const data = {
        "location": address,
        "options": {
          "thumbMaps": false
        }
      }
    const option = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
    };
    fetch(url,option)
    .then(response => {
        return response.json();
    })
    .then(data => {
        const currentLat = data.results[0].locations[0].displayLatLng.lat;
        const currentLng = data.results[0].locations[0].displayLatLng.lng;
        console.log(currentLat);
        console.log(currentLng);
        const contact = { 
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            street: req.body.street,
            postcode: req.body.postcode,
            city: req.body.city,
            country: req.body.country,
            phone: req.body.phone,
            birthday: req.body.birthday,
            isPrivate: req.body.isPrivate,
            owner: req.body.owner,
            lat: currentLat,
            lng: currentLng,
        }; 
        contactModel.insertOne(contact, (err, result) => {
            if(err) throw err;
            console.log("one is inserted")
            return res.status(201).send("successfully inserted");
        }); 
    });
    
}

const getAllContact = (req, res) => {
    contactModel.find({}).toArray( function(err, result) {
        if (err) throw err;
        res.send(result);       
        });
}

const deleteContact = (req, res) => {
    contactModel.findOneAndDelete({_id: ObjectID(req.params.id) }, (err, result) => {
        if(err) throw err;
        if(result.lastErrorObject.n === 0) return res.status(404).send("contacts not Found! ");
        res.status(204).send("successfully");
    });
}

module.exports = {
    getContactByID, updateContactByID, createContact, getAllContact, deleteContact,
}
