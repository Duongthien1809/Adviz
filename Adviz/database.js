// hier wird alle Collection und data in AdvizDb gespeichert werden
const MongoClient = require('mongodb').MongoClient;


//Create url:
var url = "mongodb://localhost:27017";
// connect with database
const client = new MongoClient(url);
// insert data to collection
async function run(){
    try {
        await client.connect();
        const db = client.db("advizDB");
        const user = db.collection("users");
        const contact = db.collection("contacts");
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
                "street": "Maulbeerallee",
                "postcode": "14469",
                "city": "Potsdam",
                "country": "Deutschland",
                "phone": "+1464545446",
                "birthday": "2022-09-20",
                "isPrivate": false,
                "owner": "admin",
                "lat": 52.40415,
                "lng": 13.02578
            },
            {
                "firstname": "Alice private normalo",
                "lastname": "Duong",
                "street": "Nostitzstraße 51",
                "postcode": "10961",
                "city": " Berlin",
                "country": "Deutschland",
                "phone": "+17662018872",
                "birthday": "2022-09-20",
                "isPrivate": true,
                "owner": "normalo",
                "lat": 52.52913,
                "lng": 13.33364
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

        // insert data to collections
        const res_user = await user.insertMany(users);
        const res_contact = await contact.insertMany(contacts);

        // display the results
        console.log(res_user);
        console.log(res_contact);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);
