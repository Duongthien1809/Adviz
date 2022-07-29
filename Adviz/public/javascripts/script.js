
let loggedIn = false
let currentUser = {}
let userAdmina = {username: "admina", password: "password", role: "admin"};
let userNormalo = {username: "normalo", password: "password", role: "normal"};
let users = [userAdmina, userNormalo]
let contactBook = {
    admina: [
        {
            firstName: "Alice private admin",
            lastName: "A.",
            street: "Wilhelminenhofstraße 7",
            postCode: "12459",
            city: "Berlin",
            country: "Deutschland",
            phone: "+49123456789",
            birthday: "1998-12-13",
            isPrivate: true,
        },
        {
            firstName: "Bob public admin",
            lastName: "B.",
            street: "Kirchenallee 34",
            postCode: "20099",
            city: "Hamburg",
            country: "Deutschland",
            phone: "+49123456789",
            birthday: "1995-01-20",
            isPrivate: false,

        },
    ],
    normalo: [
        {
            firstName: "Charlie private normalo",
            lastName: "C.",
            street: "Straße am Flugplatz 66C",
            postCode: "12487",
            city: "Berlin",
            country: "Deutschland",
            phone: "+49123456789",
            birthday: "2003-05-05",
            isPrivate: true,
        },
        {
            firstName: "Dora public normalo",
            lastName: "D.",
            street: "Fraunhoferstr. 26",
            postCode: "10587",
            city: "Berlin",
            country: "Deutschland",
            phone: "+49123456789",
            birthday: "2000-10-10",
            isPrivate: false,
        },

    ]
}

function login() {
    if (loggedIn) {
        return false
    }
    let user = document.getElementById("user").value;
    let password = document.getElementById("password").value;
    document.getElementById("loginFailed").style.display = "none";
    for (let known_user of users) {

        if (user == known_user.username && password == known_user.password) {
            currentUser = known_user;
            login_user(user);
            setmap();
            showMyContacts();
            return false
        }
    }

    document.getElementById("loginFailed").style.display = "block";

    return false
}

function setmap() {
    const mapkey = L.mapquest.key = 'FrbcAtR0UAEtA4yHA9mxPgj5RVCKEADA';
    L.mapquest.open = true;
    const mq = L.mapquest.map('mymap', {
        center: [52.5, 13.4],
        layers: L.mapquest.tileLayer('map'),
        zoom: 10
    });
    mq.addControl(L.mapquest.control());
}

function setmarker(adress, postCode, stadt, land){
    const location = adress + ", " + postCode + ", " + stadt + ", " + land;
    console.log(location)
    L.mapquest.geocoding().geocode(location);
}

function login_user(user) {
    // nach dem Einlogen wird es so zeigt: 
    // maincontainer: Contactliste, map und drei button
    // welcome message
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("mainContainer").style.display = "flex";
    document.getElementById("welcomeMsg").innerHTML = "Welcome, " + userToUpper(user) + "!";
    // auf true gesetzt um logout zu können
    loggedIn = true;
    
}

function logout() {
    if (!loggedIn) {
        return false;
    }
    document.getElementById("loginContainer").style.display = "flex";
    document.getElementById("mainContainer").style.display = "none";
    loggedIn = false;
}

function resetContacts() {
    // set own location
    // document.getElementById("locationPointers").innerHTML = '<div class="location"><img src="images/location_pointer.png" alt="Workplace" class="pointerImg" ><span class="tooltiptext">YOU</span></div>'
    document.getElementById("contactsTable").innerHTML = ""
}

function showAllContacts() {
    resetContacts()

    for (user of users) {
        for (let i = 0; i < contactBook[user['username']].length; i++) {
            contact = contactBook[user['username']][i]
            if (contact['isPrivate'] === false || currentUser['role'] === "admin" || user === currentUser) {
                showContact(contact, i, user['username'])
            }
        }
    }
}

function showMyContacts() {
    resetContacts()
    for (let i = 0; i < contactBook[currentUser['username']].length; i++) {
        showContact(contactBook[currentUser['username']][i], i, currentUser['username'])
    }
}

function showContact(contact, contactId, owner) {
    //show the table list
    document.getElementById("contactsTable").innerHTML +=
        "<tr class='contactCard' onclick='showUpdateContact(" + contactId + ", \"" + owner + "\")'>" +
        "<td>" + contact['firstName'] + "</td>" +
        "</tr>"
    document.getElementById("locationPointers").innerHTML +=  setmarker(contact['street'],contact['postCode'], contact['city'], contact['country']);
}

function showAddContact() {
    addContactDiv = document.getElementById("addContact")
    addContactDiv.style.display = "flex"
    addContactDiv.scrollIntoView({behavior: 'smooth'});
    document.getElementById("menuContainer").style.display = "none";
    document.getElementById("updateContact").style.display = "none";
}

async function closeAddContact() {
    document.getElementById("addContact").style.display = "none";
    document.getElementById("menuContainer").style.display = "flex";
    
}

async function closeUpdateContact() {
    document.getElementById("menuContainer").style.display = "flex";
    document.getElementById("updateContact").style.display = "none";
}

function createContact() {
    firstName = document.getElementById("addContactFirstName").value;
    lastName = document.getElementById("addContactLastName").value;
    street = document.getElementById("addContactStreet").value;
    postCode = document.getElementById("addContactPostCode").value;
    city = document.getElementById("addContactCity").value;
    country = document.getElementById("addContactCountry").value;
    phone = document.getElementById("addContactPhone").value;
    birthday = document.getElementById("addContactBirthday").value;
    isPrivate = document.getElementById("addContactIsPrivate").checked;
    let contact = {
        firstName: firstName,
            lastName: lastName,
            street: street,
            postCode: postCode,
            city: city,
            country: country,
            phone: phone,
            birthday: birthday,
            isPrivate: isPrivate,
    }
    // contactBook[currentUser['username']].push({
    //     firstName: firstName,
    //     lastName: lastName,
    //     street: street,
    //     postCode: postCode,
    //     city: city,
    //     country: country,
    //     phone: phone,
    //     birthday: birthday,
    //     isPrivate: isPrivate,
    // })
    console.log(JSON. stringify(contact));
    showMyContacts()
    closeAddContact()
    return false
}

async function showUpdateContact(contactId, owner) {
    document.getElementById("menuContainer").style.display = "none";
    document.getElementById("updateContact").style.display = "flex";
    contact = contactBook[owner][contactId]
    document.getElementById("updateContactFirstName").value = contact['firstName'];
    document.getElementById("updateContactLastName").value = contact['lastName'];
    document.getElementById("updateContactStreet").value = contact['street'];
    document.getElementById("updateContactPostCode").value = contact['postCode'];
    document.getElementById("updateContactCity").value = contact['city'];
    document.getElementById("updateContactCountry").value = contact['country'];
    document.getElementById("updateContactPhone").value = contact['phone'];
    document.getElementById("updateContactBirthday").value = contact['birthday'];
    if (contact['isPrivate']) {
        document.getElementById("updateContactIsPrivate").checked = true;
    } else {
        document.getElementById("updateContactIsPrivate").checked = false;
    }
    console.log(document.getElementById("updateContactIsPrivate").value);
}

function updateContact() {
    closeUpdateContact()
    return false
}

function deleteContact() {
    console.log(contactBook);
    console.log(document.getElementById("update-form"))
    closeUpdateContact()
}

function userToUpper(user) {
    return user.charAt(0).toUpperCase() + user.slice(1)
}