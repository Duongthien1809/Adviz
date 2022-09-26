let loggedIn = false;
let currentUser = {};
let contactBook = [];
let currentContactID = "";
let currentOwner = "";
let currentLat = 0;
let currentLng = 0;

function login() {
    if (loggedIn) {
        return false;
    }

    let username = document.getElementById("user").value;
    let password = document.getElementById("password").value;        
    let request = {username, password};
    console.log(JSON.stringify(request));
    url = "http://localhost:3000/users/login";

    fetch(url,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.error){
              alert(data.error);
          }else{
              currentUser = data;
              login_user(username);
              setmap();
              showMyContacts();
              return false;
          }
        })
        .catch((error) => {
            document.getElementById("loginFailed").style.display = "block";
        });
    resetContacts();
    document.getElementById("loginFailed").style.display = "none";

    return false;
}

function setmap() {
    L.mapquest.key = 'FrbcAtR0UAEtA4yHA9mxPgj5RVCKEADA';
    L.mapquest.open = true;
    const mq = L.mapquest.map('mymap', {
        center: [52.50143,13.40479],
        layers: L.mapquest.tileLayer('map'),
        zoom: 20,
    });
    mq.addControl(L.mapquest.control());
}

async function setmarker(adress, postCode, stadt, land){
    const location = adress + ", " + postCode + ", " + stadt + ", " + land;
    await L.mapquest.geocoding().geocode(location);
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
    document.getElementById("loginFailed").style.display = "none";
    document.getElementById("loginContainer").style.display = "flex";
    document.getElementById("mainContainer").style.display = "none";
    loggedIn = false;
}

function resetContacts() {
    // set own location
    // document.getElementById("locationPointers").innerHTML = '<div class="location"><img src="images/location_pointer.png" alt="Workplace" class="pointerImg" ><span class="tooltiptext">YOU</span></div>'
    document.getElementById("contactsTable").innerHTML = "";
}

async function showAllContacts() {
    resetContacts();

    url = "http://localhost:3000/contacts";
    await fetch(url).then(res => {return res.json()})
    .then(data => {
        contactBook = data;
        contactBook.forEach(contact => {
            if(contact.isPrivate === false || currentUser.role === "admin" || currentUser.role === contact.owner) {
                showContact(contact, contact._id, contact.owner);
            }
        });
    });
}

async function showMyContacts() {
    resetContacts()
    url = "http://localhost:3000/contacts";
    await fetch(url).then(res => {return res.json()})
    .then(data => { 
        data.forEach(contact => {
            if  (contact.owner === currentUser.role) {
                showContact(contact, contact._id, contact.owner);
            }
        });
    });
}

function showContact(contact, contactId, owner) {
    // get data for lat and lng
    addresstoLatLng(contact.street, contact.postcode, contact.city);
    //show the table list
    document.getElementById("contactsTable").innerHTML +=
        "<tr class='contactCard' onclick='showUpdateContact(" + JSON.stringify(contactId) + ", \"" + owner + "\")'>" +
        "<td>" + contact.firstname + "</td>" +
        "</tr>";
    document.getElementById("locationPointers").innerHTML +=  setmarker(contact.street,contact.postcode, contact.city, contact.country);
}

function showAddContact() {
    addContactDiv = document.getElementById("addContact");
    addContactDiv.style.display = "flex";
    addContactDiv.scrollIntoView({behavior: 'smooth'});
    document.getElementById("menuContainer").style.display = "none";
    document.getElementById("updateContact").style.display = "none";
}

async function closeAddContact() {
    document.getElementById("loginContainer").style.display = "none";
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
    if(document.getElementById("addContactIsPrivate").checked){
        isPrivate = true;
    }else{
        isPrivate = false;
    }
    const contact = {
            firstname: firstName,
            lastname: lastName,
            street: street,
            postcode: postCode,
            city: city,
            country: country,
            phone: phone,
            birthday: birthday,
            isPrivate: isPrivate,
            owner: currentUser.role,
            lat:currentLat,
            lng: currentLng,
    };
    url = "http://localhost:3000/contacts"
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
    });
    showMyContacts();
    closeAddContact();
    return false;
}

function showUpdateContact(contactId, owner) {
    document.getElementById("menuContainer").style.display = "none";
    document.getElementById("updateContact").style.display = "flex";
    url = `http://localhost:3000/contacts/${contactId}`;
    currentContactID = contactId;
    if(currentUser.role == owner || currentUser.role == "admin"){
        fetch(url).then(res => {return res.json()})
        .then(contact => { 
        addresstoLatLng(contact.street, contact.postcode, contact.city);
        document.getElementById("updateContactFirstName").value = contact.firstname;
        document.getElementById("updateContactLastName").value = contact.lastname;
        document.getElementById("updateContactStreet").value = contact.street;
        document.getElementById("updateContactPostCode").value = contact.postcode;
        document.getElementById("updateContactCity").value = contact.city;
        document.getElementById("updateContactCountry").value = contact.country;
        document.getElementById("updateContactPhone").value = contact.phone;
        document.getElementById("updateContactBirthday").value = contact.birthday;
        if (contact.isPrivate == true) {
            document.getElementById("updateContactIsPrivate").checked = true;
        } else {
            document.getElementById("updateContactIsPrivate").checked = false;
        }
        currentOwner = contact.owner;
    });
    }else{
        alert("keine Recht admin Contact zu ändern!!");
        closeUpdateContact();
    }
        
}

function updateContact() {
        firstName = document.getElementById("updateContactFirstName").value;
        lastName = document.getElementById("updateContactLastName").value;
        street = document.getElementById("updateContactStreet").value;
        postCode = document.getElementById("updateContactPostCode").value;
        city = document.getElementById("updateContactCity").value;
        country = document.getElementById("updateContactCountry").value;
        phone = document.getElementById("updateContactPhone").value;
        birthday = document.getElementById("updateContactBirthday").value;
        if(document.getElementById("updateContactIsPrivate").checked) {
            isPrivate = true;
        }else{
            isPrivate = false;
        }
    const contact = {
        firstname: firstName,
        lastname: lastName,
        street: street,
        postcode: postCode,
        city: city,
        country: country,
        phone: phone,
        birthday: birthday,
        isPrivate: isPrivate,
        owner: currentOwner,
        lat: currentLat,
        lng: currentLng,
    };
    url = `http://localhost:3000/contacts/${currentContactID}`
    fetch(url, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
    });
    closeUpdateContact();
    return false;
}

function deleteContact() {
    url = `http://localhost:3000/contacts/${currentContactID}`
    fetch(url, {
        method: "DELETE",
    });
    resetContacts();
    closeUpdateContact();
}

function userToUpper(user) {
    return user.charAt(0).toUpperCase() + user.slice(1);
}

async function addresstoLatLng(street, postcode, city) {
    const url = "http://www.mapquestapi.com/geocoding/v1/address?key=cBdJO8Oy3mwHOkFoOUejjp7GOR95dAXW";
    const address = ""+ street +", "+ postcode +", " +  city +" ";
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
    await fetch(url,option)
    .then(response => {
        return response.json();
    })
    .then(data => {
        currentLat = data.results[0].locations[0].displayLatLng.lat;
        currentLng = data.results[0].locations[0].displayLatLng.lng; 
    });
}