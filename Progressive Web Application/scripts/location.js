var IndexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if(self.IndexedDB) {
    console.log('IndexedDB is supported.');
}

var database;
var transaction;
var DBRequest = self.IndexedDB.open('LocationDB', 1);

var locationsBaguio = [
    { locationID: 1, name: 'Baguio General Hospital', address: 'Baguio General Hospital Driveway', contact: '(074) 661-7910', image: 'images/locations/baguiogeneralhospital.jpg', x_coord: 16.40107403869452, y_coord: 120.59601187705995},
    { locationID: 2, name: 'Baguio Medical Center', address: '9 Military Cutoff Road', contact: '(074) 304-3873', image: 'images/locations/baguiomedcenter.jpg', x_coord: 16.4019900481756, y_coord: 120.59747099876405},
    { locationID: 3, name: 'Hospital of the Sacred Heart', address: 'Assumption Road', contact: '(074) 442-5701 to 02', image: 'images/locations/hospitalsample.jpg', x_coord: 16.417309410344853, y_coord: 120.59795916080475},
    { locationID: 4, name: 'Notre Dame de Chartres', address: '25 Main Building, General Luna Road', contact: '(074) 619-8530', image: 'images/locations/hospitalsample.jpg', x_coord: 16.41535917898586, y_coord: 120.59850096702577},
    { locationID: 5, name: 'Assumption Medical Diagnostic Center, Inc.', address: 'VFM Building, 10 Assumption Road', contact: '(074) 443-9580', image: 'images/locations/hospitalsample.jpg', x_coord: 16.41360875, y_coord: 120.59738539604751},
    { locationID: 6, name: 'Pines City Doctors Hospital', address: 'Magsaysay Avenue', contact: '(074) 445-3020', image: 'images/locations/hospitalsample.jpg', x_coord: 16.4269155, y_coord: 120.59469167932693},
    { locationID: 7, name: 'Philippine Red Cross', address: '39 Harrison Road', contact: '(074) 424-7953', image: 'images/locations/hospitalsample.jpg', x_coord: 16.4122177, y_coord: 120.5963337},
    { locationID: 8, name: 'Baguio City Police Station 1', address: 'Naguilian Road', contact: '424-2697', image: 'images/locations/policestationsample.jpg', x_coord: 16.412449, y_coord: 120.579358 },
    { locationID: 9, name: 'Baguio City Police Station 2', address: 'Camdas', contact: '661-1255', image: 'images/locations/policestationsample.jpg', x_coord: 16.425757, y_coord: 120.593742 },
    { locationID: 10, name: 'Baguio City Police Station 3', address: 'Pacdal Circle', contact: '300-9113 / 424-0670', image: 'images/locations/policestationsample.jpg', x_coord: 16.416707, y_coord: 120.615552 },
    { locationID: 11, name: 'Baguio City Police Station 4', address: 'PEZA, Loakan', contact: '305-9114 / 424-0992', image: 'images/locations/policestationsample.jpg', x_coord: 16.379593, y_coord: 120.619338 },
    { locationID: 12, name: 'Baguio City Police Station 5', address: 'Legarda, Marcos Highway', contact: '442-0629 / 300-9115', image: 'images/locations/policestationsample.jpg', x_coord: 16.401514, y_coord: 120.593555 },
    { locationID: 13, name: 'Baguio City Police Station 6', address: 'Aurora Hill', contact: '300-9116 / 424-2174', image: 'images/locations/policestationsample.jpg', x_coord: 16.426235, y_coord: 120.606191 },
    { locationID: 14, name: 'Baguio City Police Station 7', address: 'Central Business District', contact: '661-1489', image: 'images/locations/bcpostation7.jpg', x_coord: 16.414404, y_coord: 120.592207 },
    { locationID: 15, name: 'Baguio City Police Station 8', address: 'Camp 7, Kennon Road', contact: '424-2681', image: 'images/locations/policestationsample.jpg', x_coord: 16.391862, y_coord: 120.599899 },
    { locationID: 16, name: 'Baguio City Police Station 9', address: 'Irisan', contact: '424-8834', image: 'images/locations/policestationsample.jpg', x_coord: 16.430057, y_coord: 120.548613 },
    { locationID: 17, name: 'Baguio City Police Station 10', address: 'Green Valley, Marcos Highway', contact: '422-2662', image: 'images/locations/policestationsample.jpg', x_coord: 16.388915, y_coord: 120.575467 },
    { locationID: 18, name: 'Baguio City Central Fire Station', address: 'No. 1, Corner Abanao and Kayang Streets', contact: '160 / (074) 442-2222 / (074) 443-7089', image: 'images/locations/firestationsample.jpg', x_coord: 16.414757, y_coord: 120.591727 }
];

var locationsTrinidad = [
    { locationID: 1, name: 'Benguet General Hospital', address: 'Halsema Highway, La Trinidad', contact: '(074) 442-3165', image: 'images/locations/benguetgeneralhospital.jpg', x_coord: 16.450765, y_coord: 120.589133 },
    { locationID: 2, name: 'Cordillera Hospital of the Divine Grace', address: 'Puguis, La Trinidad', contact: '(074) 620-5692', image: 'images/locations/hospitalsample.jpg', x_coord: 16.452586, y_coord: 120.574424 },
    { locationID: 3, name: 'Camp Dangwa Hospital', address: 'Barangay Alapang, La Trinidad', contact: '(074) 422-5515', image: 'images/locations/hospitalsample.jpg', x_coord: 16.464979, y_coord: 120.598705 },
    { locationID: 4, name: 'Assumption Medical Diagnostic Center', address: 'Bontoc Road, La Trinidad', contact: '(074) 422-3906', image: 'images/locations/hospitalsample.jpg', x_coord: 16.446049, y_coord: 120.591062 },
    { locationID: 5, name: 'Philippine Red Cross', address: 'BeGH Compound, Km. 5 La Trinidad', contact: '(074) 422-2796', image: 'images/locations/hospitalsample.jpg', x_coord: 16.450857, y_coord: 120.589391 },
    { locationID: 6, name: 'La Trinidad Police Station', address: 'Km. 5 Pico, La Trinidad', contact: '(074) 309-1019', image: 'images/locations/bcpocarregionaloffice.jpg', x_coord: 16.447812, y_coord: 120.590238 },
    { locationID: 7, name: 'Km. 6 Police Outpost', address: 'Km. 6 La Trinidad', contact: '(074) 309-1019', image: 'images/locations/policestationsample.jpg', x_coord: 16.455317, y_coord: 120.589478 },
    { locationID: 8, name: 'La Trinidad Fire Station', address: 'Cabanao Road, La Trinidad', contact: '(074) 422-4700', image: 'images/locations/firestationsample.jpg', x_coord: 16.460805, y_coord: 120.588766 }
];

DBRequest.onerror = function(event) {
    console.log('Error loading database.');
};

DBRequest.onsuccess = function(event) {
    database = DBRequest.result;
    console.log('Database initialised.');

    getAllBaguioLocations();
    getAllTrinidadLocations();

    /**
     * 
     * Unused functions for adding and retrieving
     * data from IndexedDB database.
     * 
     * addLocationBaguio();
     * addLocationTrinidad();
     * readBaguioLocation();
     * readTrinidadLocation();
     * getDataBaguio();
     * getDataTrinidad();
     * 
     */
};

DBRequest.onupgradeneeded = function(event) {
    var database = event.target.result;

    database.onerror = function(event) {
        console.log('Error loading database.');
    };

    var baguioLocObjStore = database.createObjectStore('baguioLocations', { keypath: 'locationID', autoIncrement: true });

    baguioLocObjStore.createIndex('locationID', 'locationID', { unique: true });
    baguioLocObjStore.createIndex('name', 'name', { unique: false });

    locationsBaguio.forEach(function(locationsBaguio) {
        var dbAddRequest = baguioLocObjStore.add(locationsBaguio);

        dbAddRequest.onsuccess = function(event) {
            console.log('[Location Object Store: BAGUIO] Location added successfully: ' + event.target.result);
        };

        dbAddRequest.onerror = function(event) {
            console.log('[Location Object Store: BAGUIO] Error adding location.');
        };
    });

    var trinidadLocObjStore = database.createObjectStore('trinidadLocations', { keypath: 'locationID', autoIncrement: true });

    trinidadLocObjStore.createIndex('locationID', 'locationID', { unique: true });
    trinidadLocObjStore.createIndex('name', 'name', { unique: false });

    locationsTrinidad.forEach(function(locationsTrinidad) {
        var dbAddRequest = trinidadLocObjStore.add(locationsTrinidad);

        dbAddRequest.onsuccess = function(event) {
            console.log('[Location Object Store: TRINIDAD] Location added successfully: ' + event.target.result);
        };

        dbAddRequest.onerror = function(event) {
            console.log('[Location Object Store: TRINIDAD] Error adding location.');
        };
    });

    console.log('Locations object store created.');
};

function getNearestEmergencyCenters() {

    var locationData = [];

    var baguioLocObjStore = database.transaction('baguioLocations').objectStore('baguioLocations');

    baguioLocObjStore.openCursor().onsuccess = function(event) {

        var cursor = event.target.result;
        
        if (cursor) {

            locationData.push( [cursor.value.locationID, cursor.value.name, cursor.value.address, cursor.value.contact, cursor.value.image, cursor.value.x_coord, cursor.value.y_coord] );

            cursor.continue();

        } else {
            console.log('[BAGUIO LOCATIONS] Data access completed.');
        };
        
    };

    var errorResponse = document.getElementById('pubservicesgeolocfunction');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(userLocation);
    } else {
        errorResponse.innerHTML = '<p>There was an error processing the request.</p>';
    };

    function userLocation(position) {
        nearestLocation(position.coords.latitude, position.coords.longitude);
    };

    function DegToRad(deg) {
        return deg * Math.PI / 180;
    };

    function pythagorasEquirectangular(userLatitude, userLongitude, targetLatitude, targetLongitude) {

        userLatitude = DegToRad(userLatitude);
        userLongitude = DegToRad(userLongitude);
        targetLatitude = DegToRad(targetLatitude);
        targetLongitude = DegToRad(targetLongitude);

        var earthRadius = 6371;
        var x = (targetLongitude - userLongitude) * Math.cos((userLatitude + targetLongitude) / 2);
        var y = (targetLatitude - userLongitude);
        var distance = Math.sqrt(x * x + y * y) * earthRadius;
        return distance;

    };

    function nearestLocation(latitude, longitude) {

        var minimumDifference = 99999;
        var closestLocation;

        for (index = 0; index < locationData.length; index++) {

            var difference = pythagorasEquirectangular(latitude, longitude, locationData[index][5], locationData[index][6]);

            if (difference < minimumDifference) {

                closestLocation = locationData[index];
                minimumDifference = difference;

            };
        };

        var locationImage, locationName, locationAddressHeader, locationAddress, locationContactHeader, locationContact, locationNameText, locationAddressHeaderText, locationAddressText, locationContactHeaderText, locationContactText;

        locationImage = document.createElement('img');
        locationName = document.createElement('h3');
        locationAddressHeader = document.createElement('h4');
        locationAddress = document.createElement('p');
        locationContactHeader = document.createElement('h4');
        locationContact = document.createElement('p');

        locationImage.setAttribute('src', closestLocation[4]);
        locationImage.setAttribute('alt', closestLocation[1]);

        locationName = document.createElement('h3');
        locationAddressHeader = document.createElement('h4');
        locationAddress = document.createElement('p');
        locationContactHeader = document.createElement('h4');
        locationContact = document.createElement('p');

        locationNameText = document.createTextNode(closestLocation[1]);
        locationAddressHeaderText = document.createTextNode('Address:');
        locationAddressText = document.createTextNode(closestLocation[2]);
        locationContactHeaderText = document.createTextNode('Contact Number:');
        locationContactText = document.createTextNode(closestLocation[3]);

        locationName.appendChild(locationNameText);
        locationAddressHeader.appendChild(locationAddressHeaderText);
        locationAddress.appendChild(locationAddressText);
        locationContactHeader.appendChild(locationContactHeaderText);
        locationContact.appendChild(locationContactText);

        document.getElementById('pubservicesgeolocfunction').appendChild(locationImage);
        document.getElementById('pubservicesgeolocfunction').appendChild(locationName);
        document.getElementById('pubservicesgeolocfunction').appendChild(locationAddressHeader);
        document.getElementById('pubservicesgeolocfunction').appendChild(locationAddress);
        document.getElementById('pubservicesgeolocfunction').appendChild(locationContactHeader);
        document.getElementById('pubservicesgeolocfunction').appendChild(locationContact);

    };

};

function getAllBaguioLocations() {

    console.log('Reading location data in BAGUIO...');

    var baguioLocObjStore = database.transaction('baguioLocations').objectStore('baguioLocations');

    baguioLocObjStore.openCursor().onsuccess = function(event) {
        
        var cursor = event.target.result;

        if (cursor) {

            var locationListItem;
            var name, locationImage, addressHeader, addressInfo, contactHeader, contactInfo;
            var nameText, addressHeaderText, addressInfoText, contactHeaderText, contactInfoText;

            locationListItem = document.createElement('li');
            name = document.createElement('h3');
            locationImage = document.createElement('img');
            addressHeader = document.createElement('h4');
            addressInfo = document.createElement('p');
            contactHeader = document.createElement('h4');
            contactInfo = document.createElement('p');

            nameText = document.createTextNode(cursor.value.name);
            addressHeaderText = document.createTextNode('Address: ');
            addressInfoText = document.createTextNode(cursor.value.address);
            contactHeaderText = document.createTextNode('Contact Number: ');
            contactInfoText = document.createTextNode(cursor.value.contact);

            locationImage.setAttribute('src', cursor.value.image);
            locationImage.setAttribute('alt', cursor.value.name);

            name.appendChild(nameText);
            addressHeader.appendChild(addressHeaderText);
            addressInfo.appendChild(addressInfoText);
            contactHeader.appendChild(contactHeaderText);
            contactInfo.appendChild(contactInfoText);

            locationListItem.appendChild(name);
            locationListItem.appendChild(locationImage);
            locationListItem.appendChild(addressHeader);
            locationListItem.appendChild(addressInfo);
            locationListItem.appendChild(contactHeader);
            locationListItem.appendChild(contactInfo);

            document.getElementById('baguioLocationList').appendChild(locationListItem);

            cursor.continue();

        } else {
            console.log('[BAGUIO LOCATIONS] Data access completed.');
        };
    };
};

function getAllTrinidadLocations() {

    console.log('Reading location data in TRINIDAD...');

    var trinidadLocObjStore = database.transaction('trinidadLocations').objectStore('trinidadLocations');

    trinidadLocObjStore.openCursor().onsuccess = function(event) {

        var cursor = event.target.result;

        if (cursor) {

            var locationListItem;
            var name, locationImage, addressHeader, addressInfo, contactHeader, contactInfo;
            var nameText, addressHeaderText, addressInfoText, contactHeaderText, contactInfoText;

            locationListItem = document.createElement('li');
            name = document.createElement('h3');
            locationImage = document.createElement('img');
            addressHeader = document.createElement('h4');
            addressInfo = document.createElement('p');
            contactHeader = document.createElement('h4');
            contactInfo = document.createElement('p');

            nameText = document.createTextNode(cursor.value.name);
            addressHeaderText = document.createTextNode('Address: ');
            addressInfoText = document.createTextNode(cursor.value.address);
            contactHeaderText = document.createTextNode('Contact Number: ');
            contactInfoText = document.createTextNode(cursor.value.contact);

            locationImage.setAttribute('src', cursor.value.image);
            locationImage.setAttribute('alt', cursor.value.name);

            name.appendChild(nameText);
            addressHeader.appendChild(addressHeaderText);
            addressInfo.appendChild(addressInfoText);
            contactHeader.appendChild(contactHeaderText);
            contactInfo.appendChild(contactInfoText);

            locationListItem.appendChild(name);
            locationListItem.appendChild(locationImage);
            locationListItem.appendChild(addressHeader);
            locationListItem.appendChild(addressInfo);
            locationListItem.appendChild(contactHeader);
            locationListItem.appendChild(contactInfo);

            document.getElementById('trinidadLocationList').appendChild(locationListItem);
            
            cursor.continue();

        } else {
            console.log('[TRINIDAD LOCATIONS] Data access completed.');
        };
    };
};

/**
 * 
 * Unused functions.
 * 
function addLocationBaguio() {

    var dbAddRequest = database.transaction(['baguioLocations'], 'readwrite').objectStore('baguioLocations').add( { locationID: locationCount, name: 'Added Emergency Center, BAGUIO', address: 'Emergency Center Address', image: '', contact: '(074) 000-0000', x_coord: '16', y_coord: '120' } );

    dbAddRequest.onsuccess = function(event) {
        alert('Adding of location successful.');
    };

    dbAddRequest.onerror = function(event) {
        alert('Error adding location.');
    };
};

function addLocationTrinidad() {

    var dbAddRequest = database.transaction(['trinidadLocations'], 'readwrite').objectStore('trinidadLocations').add( { locationID: locationCount, name: 'Added Emergency Center, LA TRINIDAD', address: 'Emergency Center Address', image: '', contact: '(074) 111-1111', x_coord: '16', y_coord: '120' } );

    dbAddRequest.onsuccess = function(event) {
        alert('Adding of location successful.');
    };

    dbAddRequest.onerror = function(event) {
        alert('Error adding location.');
    };
};

function readBaguioLocation() {

    var input = document.getElementById('locationBaguioInput').value;

    var baguioLocObjStore = database.transaction('baguioLocations').objectStore('baguioLocations');
    var dbReadRequest = baguioLocObjStore.index('name').get(input);

    dbReadRequest.onerror = function(event) {
        alert('There was an error processing the request.');
    };

    dbReadRequest.onsuccess = function(event) {
        if (dbReadRequest.result) {
            alert(
                'Baguio Emergency Location: ' +
                '\nLocation ID: ' + dbReadRequest.result.locationID +
                '\nLocation Name: ' + dbReadRequest.result.name +
                '\nAddress: ' + dbReadRequest.result.address +
                '\nContact Number: ' + dbReadRequest.result.contact +
                '\nLongitude: ' + dbReadRequest.result.x_coord +
                '\nLatitude: ' + dbReadRequest.result.y_coord
            );
        } else {
            alert('Information not in database.');
        };

    };
};

function readTrinidadLocation() {

    var userInput = document.getElementById('locationTrinidadInput').value;

    var trinidadLocObjStore = database.transaction('trinidadLocations').objectStore('trinidadLocations');
    var dbReadRequest = trinidadLocObjStore.index('name').get(userInput);

    dbReadRequest.onerror = function(event) {
        alert('There was an error processing the request.');
    };

    dbReadRequest.onsuccess = function(event) {
        if (dbReadRequest.result) {
            alert(
                'La Trinidad Emergency Location: ' +
                '\nLocation ID: ' + dbReadRequest.result.locationID +
                '\nLocation Name: ' + dbReadRequest.result.name +
                '\nAddress: ' + dbReadRequest.result.address +
                '\nContact Number: ' + dbReadRequest.result.contact +
                '\nLongitude: ' + dbReadRequest.result.x_coord +
                '\nLatitude: ' + dbReadRequest.result.y_coord
            );
        } else {
            alert('Information not in database.');
        };

    };
}

function getDataBaguio() {

    var input = document.getElementById('locationBaguioInput').value;

    var baguioLocObjStore = database.transaction('baguioLocations').objectStore('baguioLocations');
    var dbGetRequest = baguioLocObjStore.index('name').get(input);

    dbGetRequest.onerror = function(event) {
        alert('There was an error processing the request.');
    };

    dbGetRequest.onsuccess = function(event) {
        if(dbGetRequest.result) {

            var locationListItem;
            var name, addressHeader, addressInfo, contactHeader, contactInfo;
            var nameText, addressHeaderText, addressInfoText, contactHeaderText, contactInfoText;

            locationListItem = document.createElement('li');
            name = document.createElement('h3');
            addressHeader = document.createElement('h4');
            addressInfo = document.createElement('p');
            contactHeader = document.createElement('h4');
            contactInfo = document.createElement('p');

            nameText = document.createTextNode(dbGetRequest.result.name);
            addressHeaderText = document.createTextNode('Address: ');
            addressInfoText = document.createTextNode(dbGetRequest.result.address);
            contactHeaderText = document.createTextNode('Contact Number: ');
            contactInfoText = document.createTextNode(dbGetRequest.result.contact);

            name.appendChild(nameText);
            addressHeader.appendChild(addressHeaderText);
            addressInfo.appendChild(addressInfoText);
            contactHeader.appendChild(contactHeaderText);
            contactInfo.appendChild(contactInfoText);

            locationListItem.appendChild(name);
            locationListItem.appendChild(addressHeader);
            locationListItem.appendChild(addressInfo);
            locationListItem.appendChild(contactHeader);
            locationListItem.appendChild(contactInfo);

            document.getElementById('baguioLocationList').appendChild(locationListItem);
        };
    };
};

function getDataTrinidad() {

    var input = document.getElementById('locationTrinidadInput').value;

    var trinidadLocObjStore = database.transaction('trinidadLocations').objectStore('trinidadLocations');
    var dbGetRequest = trinidadLocObjStore.index('name').get(input);

    dbGetRequest.error = function(event) {
        alert('There was an error processing the request.');
    };

    dbGetRequest.onsuccess = function(event) {
        if(dbGetRequest.result) {

            var locationListItem;
            var name, addressHeader, addressInfo, contactHeader, contactInfo;
            var nameText, addressHeaderText, addressInfoText, contactHeaderText, contactInfoText;

            locationListItem = document.createElement('li');
            name = document.createElement('h3');
            addressHeader = document.createElement('h4');
            addressInfo = document.createElement('p');
            contactHeader = document.createElement('h4');
            contactInfo = document.createElement('p');

            nameText = document.createTextNode(dbGetRequest.result.name);
            addressHeaderText = document.createTextNode('Address: ');
            addressInfoText = document.createTextNode(dbGetRequest.result.address);
            contactHeaderText = document.createTextNode('Contact Number: ');
            contactInfoText = document.createTextNode(dbGetRequest.result.contact);

            name.appendChild(nameText);
            addressHeader.appendChild(addressHeaderText);
            addressInfo.appendChild(addressInfoText);
            contactHeader.appendChild(contactHeaderText);
            contactInfo.appendChild(contactInfoText);

            locationListItem.appendChild(name);
            locationListItem.appendChild(addressHeader);
            locationListItem.appendChild(addressInfo);
            locationListItem.appendChild(contactHeader);
            locationListItem.appendChild(contactInfo);

            document.getElementById('trinidadLocationList').appendChild(locationListItem);
        };
    };

};
*/