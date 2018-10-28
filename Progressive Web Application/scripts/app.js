if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./serviceworker.js')
             .then(function() {
                 console.log('Service Worker Registration Successful');
             });
}

function responsiveTopNav() {
    var x = document.getElementById("topnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}