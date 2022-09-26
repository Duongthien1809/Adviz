<sup>
name: Hoang Thien Duong
matrikelnummer: S0577508
</sup>

# Adviz Webseite
***
Aviz ist eine Webapplikation, welche basieren auf nodejs und html, css, javascript.

## Literature
1. [Vorbeireitung](#1-vorbeireitung)
* [Nodejs Dependencies](#nodejs-dependencies)
* [Installation](#installation)
* [Collection hinterlegen](#collection-hinterlegen)
* [Projekt starten](#projekt-starten)
2. [Nutzung](#2-nutzung)
* [Login](#login)

### 1. Vorbeireitung
installieren den projekt und gehen zu der Projekt Lokale:
```
./<user>/../Adviz

```
#### Nodejs Dependencies
***
um den porjekt zum Laufen zu bringen, müssen Sie ein paar Sachen erledigen. folgen Sie die folgenden Anweisungen.
#### Installation
```
npm install
```
mit diesen Command wird alle nötige Dependencies für den Projekt installiert.
#### Collection hinterlegen
***
mit diesen command kann man erst die `contacts` und `users` collection hinterlegen und Daten hinzufügen.
```
node database.js
```
#### Projekt starten
um den projekt zu starten, benutzen Sie diesen Command:
```
npm start
```
oder 
```
nodemon app.js
```
nach dem diesen Command ausgeführt, wird diesen Output auf Ihren Terminal zeigen
![alt npm_start](./Adviz/public/images/readmeImages/npmstart.png "npm start")

das zeigt, dass der Projekt erfolgreich gestartet ist. 

### 2. Nutzung
***
jetzt öffnen Sie Ihren Browser und geben diesen url [`https://localhost:3000` ](https://localhost:3000) ein.

den Login Seit wird wie Unter angezeigt

![login](./Adviz/public/images/readmeImages/Login.png "Login Page")

#### Login
***
##### Admin
+ Username: admina
+ Password: password
##### Normalo
+ Username: normalo
+ Password: password

Bei falschen Username oder Password, wird das angezeigt

![falschepassword_or_username](./Adviz/public/images/readmeImages/falscheusername_or_password.png "falsche password or username")

wenn Password oder Password sind korrekt, wird Benutzer zu Homepage geleitet

![homepage](./Adviz/public/images/readmeImages/homepage_admina.png "Homepage")
##### Welcome Message

Benutzer wird mit admin role `Welcome, Amina` oder mit normalo role  `Welcome, Normalo` gezeigt.

##### Show Mine 

wenn `Show Mine` gedrückt ist, wird alle Kontakte mit gleichen von Benutzer role geben. 
1. Als Amina eingelogt

![admin_showmine](./Adviz/public/images/readmeImages/Show_mine_admin.png "showmine admin")


2. Als Normalo eingelogt

![normalo_showmine](./Adviz/public/images/readmeImages/showmine_normalo.png "shownmine normalo")

##### Show All
* Admina: 
Alle Kontakte von role `admin` und `normalo` inklusive die private Kontakte werden   angezeigt.
* Normalo: 
Alle Kontakte von role `normalo` und  nicht private Kontakte von role `admin` werden angezeigt.

##### Add New
wenn Add new gedrückt ist, wird den Add Kontackt Form gezeigt.

![add-new](./Adviz/public/images/readmeImages/addnew.png "add new")


Wenn Ausfüllen fertig ist: 

![add-new-ausgefüllt](./Adviz/public/images/readmeImages/addnew_ausgefuellt.png "add new ausgefuellt")

können Sie Add drücken. Kontakt wird in Datenbank gespeichert und Sie werden gleichzeitig an Homepage zurzück geleitet. Von Homepage können sie entweder auf [Show Mine](#show-mine) oder [Show All](#show-all) drücken um den neuen Kontakt zu sehen.
##### Update/Delete Kontakt
Von der Homepage können Kontakte sehen und genaue Lokale von allen Kontakte sehen. 
Wenn sie auf jeweiligen Kontakt drücken werden Sie zu Update Form gezeigt.

+ Hinweis: 
    + Als `normalo` können Sie nur die Kontakte mit ownner als `normalo` ändern(update oder delete).
    + Als `admin` können Sie alle Kontakte ändern(update oder delete). 

wenn Sie kontakte geändert haben, werden Sie zu Homepage zurzück geleitet. 

![update-form](./Adviz/public/images/readmeImages/update_form.png "update-form")

#### Logout

mit Logout button können Sie ausloggen und werden Sie zu Login Form gezeigt, damit Sie wieder einloggen können.

![Login](./Adviz/public/images/readmeImages/Login.png)

