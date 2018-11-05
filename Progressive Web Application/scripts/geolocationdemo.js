var response = document.getElementById('geolocationModule');

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(userLocation);
    } else {
        response.innerHTML = '<p>There was an error processing the request.</p>';
    };
};

function userLocation(position) {
    nearestLocation(position.coords.latitude, position.coords.longitude);
    //response.innerHTML = 'Latitude: ' + position.coords.latitude + '<br>Longitude: ' + position.coords.longitude;
};

function DegToRad(deg) {
    return deg * Math.PI / 180;
};

function pythagorasEquirectangular(lat1, lon1, lat2, lon2) {
    lat1 = DegToRad(lat1);
    lat2 = DegToRad(lat2);
    lon1 = DegToRad(lon1);
    lon2 = DegToRad(lon2);
    var R = 6371;
    var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    var y = (lat2 - lat1);
    var d = Math.sqrt(x * x + y * y) * R;
    return d;
};

function nearestLocation(latitude, longitude) {
    var mindif = 99999;
    var closestLocation;
    //var closestName, closestAddress, closestContact;

    for (index = 0; index < locations.length; index++) {
        var dif = pythagorasEquirectangular(latitude, longitude, locations[index][4], locations[index][5]);
        if (dif < mindif) {
            //closestName = index[0];
            //closestAddress = index[1];
            //closestContact = index[2];
            closestLocation = locations[index];
            mindif = dif;
        };
    };

    var locName, locAddressHeader, locAddress, locContactHeader, locContact, locNameText, locAddressHeaderText, locAddressText, locContactHeaderText, locContactText;

    locName = document.createElement('h3');
    locAddressHeader = document.createElement('h4');
    locAddress = document.createElement('p');
    locContactHeader = document.createElement('h4');
    locContact = document.createElement('p');

    locNameText = document.createTextNode(closestLocation[0]);
    locAddressHeaderText = document.createTextNode('Address:');
    locAddressText = document.createTextNode(closestLocation[1]);
    locContactHeaderText = document.createTextNode('Contact Number:');
    locContactText = document.createTextNode(closestLocation[2]);

    locName.appendChild(locNameText);
    locAddressHeader.appendChild(locAddressHeaderText);
    locAddress.appendChild(locAddressText);
    locContactHeader.appendChild(locContactHeaderText);
    locContact.appendChild(locContactText);

    document.getElementById('geolocationModule').appendChild(locName);
    document.getElementById('geolocationModule').appendChild(locAddressHeader);
    document.getElementById('geolocationModule').appendChild(locAddress);
    document.getElementById('geolocationModule').appendChild(locContactHeader);
    document.getElementById('geolocationModule').appendChild(locContact);

    alert(
        'Nearest emergency center: ' +
        '\nLocation Name: ' + closestLocation[0] +
        '\nAddress: ' + closestLocation[1] +
        '\nContact Number: ' + closestLocation[2]
        );

};

var locations = [
    [ 'Hospital of the Sacred Heart', 'Assumption Road', '(074) 442-5701 to 02', 'images/locations/hospitalsample.jpg', 16.417309410344853, 120.59795916080475 ],
    [ 'Baguio City Police Station 1', 'Naguilian Road', '424-2697', 'images/locations/policestationsample.jpg', 16.412449, 120.579358 ],
    [ 'Baguio General Hospital', 'Baguio General Hospital Driveway', '(074) 661-7910', 'images/locations/baguiogeneralhospital.jpg', 16.40107403869452, 120.59601187705995 ],
    [ 'Benguet General Hospital', 'Halsema Highway, La Trinidad', '(074) 442-3165', 'images/locations/benguetgeneralhospital.jpg', 16.450765, 120.589133 ],
    [ 'La Trinidad Fire Station', 'Cabanao Road, La Trinidad', '(074) 422-4700', 'images/locations/firestationsample.jpg', 16.460805, 120.588766 ]
];