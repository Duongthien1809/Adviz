let loggedIn = false
let currentUser = {}
let userAdmina = {username: "admina", password: "password", role:"admin"};
let userNormalo = {username: "normalo", password: "password", role:"normal"};
let users = [userAdmina, userNormalo]
let contactBook = {
    admina: [
        {
            firstName: "Alice",
            lastName: "A.",
            street: "test street A",
            postCode: 12345,
            city: "test city A",
            country: "test county A",
            phone: "+49 123 456789",
            birthday: "01.01.2000",
            isPrivate: true,
            x: 120,
            y: -420,
        },
        {
            firstName: "Bob",
            lastName: "B.",
            street: "test street B",
            postCode: 12345,
            city: "test city B",
            country: "test county B",
            phone: "+49 123 456789",
            birthday: "01.01.2000",
            isPrivate: false,
            x: 80,
            y: -230,
        },
    ],
    normalo: [
        {
            firstName: "Charlie",
            lastName: "C.",
            street: "test street C",
            postCode: 12345,
            city: "test city C",
            country: "test county C",
            phone: "+49 123 456789",
            birthday: "01.01.2000",
            isPrivate: true,
            x: 50,
            y: -340,
        },
        {
            firstName: "Dora",
            lastName: "D.",
            street: "test street D",
            postCode: 12345,
            city: "test city D",
            country: "test county D",
            phone: "+49 123 456789",
            birthday: "01.01.2000",
            isPrivate: false,
            x: 180,
            y: -170,
        },

    ]
}
function login() {
    if (loggedIn) {
        return false
    }
    user = document.getElementById("user").value;
    password = document.getElementById("password").value;
    document.getElementById("loginFailed").style.display = "none";
    for (const known_user of users) {

        if (user == known_user.username && password == known_user.password) {
            currentUser = known_user
            login_user(user);
            return false
        }
    }
    
    document.getElementById("loginFailed").style.display = "block";
     
    return false
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
    // alle vorgegebene Kontakte werden angezeigt
    showMyContacts()
}
function resetContacts() {
    // set own location
    document.getElementById("locationPointers").innerHTML = '<div class="location"><img src="images/location_pointer.png" alt="Workplace" class="pointerImg" ><span class="tooltiptext">YOU</span></div>'
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
    document.getElementById("contactsTable").innerHTML += 
        "<tr class='contactCard' onclick='showUpdateContact(" + contactId + ", \"" + owner + "\")'>" +
            "<td>"+contact['firstName']+"</td>"+
        "</tr>"
        document.getElementById("locationPointers").innerHTML += 
            '<div class="location" style="left: '+contact['x']+'px; top: '+contact['y']+'px;">' +
                '<img src="images/location_pointer.png" alt="Workplace" class="pointerImg" >' +
                '<span class="tooltiptext">'+userToUpper(contact['firstName'])+'</span>' +           
            '</div>'
}

function showAddContact() {
    addContactDiv = document.getElementById("addContact")
    addContactDiv.style.display = "flex"
    addContactDiv.scrollIntoView({ behavior: 'smooth' });
}
async function closeAddContact() {
    await new Promise(resolve => {
        document.getElementById("menuContainer").scrollIntoView({ behavior: 'smooth' })
        setTimeout(() => {
            resolve("");
        }, 500);
    })
    document.getElementById("addContact").style.display = "none";
}
async function closeUpdateContact() {
    await new Promise(resolve => {
        document.getElementById("menuContainer").scrollIntoView({ behavior: 'smooth' })
        setTimeout(() => {
            resolve("");
        }, 500);
    })
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
    isPrivate = document.getElementById("addContactIsPrivate").value;
    // Generate random coordinates for now...
    x = Math.floor(Math.random() * 200) + 50;
    y = -(Math.floor(Math.random() * 450) + 50);
    contactBook[currentUser['username']].push({firstName: firstName, lastName: lastName, street: street, postCode: postCode, city: city, country: country, phone: phone, birthday: birthday, isPrivate: isPrivate, x: x, y: y})
    showMyContacts()
    closeAddContact()
    return false
}

function showUpdateContact(contactId, owner) {
    updateContactDiv = document.getElementById("updateContact")
    updateContactDiv.style.display = "flex"
    updateContactDiv.scrollIntoView({ behavior: 'smooth' });

    contact = contactBook[owner][contactId]
    document.getElementById("updateContactFirstName").value = contact['firstName'];
    document.getElementById("updateContactLastName").value = contact['lastName'];
    document.getElementById("updateContactStreet").value = contact['street'];
    document.getElementById("updateContactPostCode").value = contact['postCode'];
    document.getElementById("updateContactCity").value = contact['city'];
    document.getElementById("updateContactCountry").value = contact['country'];
    document.getElementById("updateContactPhone").value = contact['phone'];
    document.getElementById("updateContactBirthday").value = contact['birthday'];
    document.getElementById("updateContactIsPrivate").value = contact['isPrivate'];
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

function logout() {
    if (!loggedIn) {
        return false;
    }
    document.getElementById("loginContainer").style.display = "flex";
    document.getElementById("mainContainer").style.display = "none";
    loggedIn = false;
}

function userToUpper(user) {
    return user.charAt(0).toUpperCase() + user.slice(1) 
}