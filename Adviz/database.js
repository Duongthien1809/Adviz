// hier wird alle Collection und data in AdvizDb gespeichert werden
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


//Create a database named "mydb":
var url = process.env.MONGODB_URL;

// insert data to collection
MongoClient.connect(url, (err, client) => {
    if (err) throw err;
    const db = client.db("advizDB");
    const contacts = [
        {
            "firstname": "Bob Privat Admin",
            "lastname": "Kater",
            "street": "Alexanderplatz 1",
            "postcode": "10178",
            "city": "Berlin",
            "country": "Deutschland",
            "phone": "+17662018872",
            "birthday": "1998-12-13",
            "isPrivate": true,
            "owner": "admin",
            "lat": 52.52127,
            "lng": 13.41268
        },
        {
            "firstname": "Alice normalo public",
            "lastname": "Kater",
            "street": "Straße am Flugplatz 66C",
            "postcode": "12487",
            "city": "Berlin",
            "country": "Deutschland",
            "phone": "+4915140033818",
            "birthday": "1998-12-13",
            "isPrivate": false,
            "owner": "normalo",
            "lat": 52.43542,
            "lng": 13.50893
        },
        {
            "firstname": "Bob public admin",
            "lastname": "test",
            "street": "85 Heerstraße",
            "postcode": "56329",
            "city": "St. Goar - St Goar",
            "country": "Deutschland",
            "phone": "+1464545446",
            "birthday": "2022-09-20",
            "isPrivate": false,
            "owner": "admin",
            "lat": 39.547706,
            "lng": -84.214082
        },
        {
            "firstname": "Alice private normalo",
            "lastname": "Duong",
            "street": "Engelstrasse 17",
            "postcode": "77716",
            "city": "Haslach im Kinzigtal",
            "country": "Deutschland",
            "phone": "+17662018872",
            "birthday": "2022-09-20",
            "isPrivate": true,
            "owner": "normalo",
            "lat": 48.27804,
            "lng": 8.08753
        }
    ];
    const users = [
        {
            "username": "normalo",
            "password": "password",
            "role": "normalo",
        },
        {
            "username": "admina",
            "password": "password",
            "role": "admin",
        }
    ];
    db.collection("contacts").insertMany(contacts, (err, result) => {
        if (err) throw err;
        console.log("insert completed!")
        client.close();
    });
    db.collection("users").insertMany(users, (err, result) => { 
        if (err) throw err;
        console.log("insert completed!")
        client.close();
    });
});