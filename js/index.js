/* Displaying position of ISS */

const myMap = L.map('ISSmap').setView([0, 0], 3);
const myMarker = L.marker([0, 0]).addTo(myMap);
const circle = L.circle([0, 0], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 200000
}).addTo(myMap);

function setup() {
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoic2lyZm91cmllciIsImEiOiJja2dheG93d28wYm0wMnpwZHd4eWc3MmFuIn0.zyjkFt9TN-jvU2isE28xrg'
    }).addTo(myMap);
}

async function getISS() {
    const ISS_API_URL = "https://api.wheretheiss.at/v1/satellites/25544"
    const response = await fetch(ISS_API_URL);
    return await response.json(); 
}

async function updateMarker() {
    const {latitude, longitude} = await getISS();
    myMarker.setLatLng([latitude, longitude]);
    myMarker.bindPopup(`<b>Hello, I am the ISS!</b><br>Latitude: ${latitude}<br>Longitude: ${longitude}`).openPopup();
    circle.setLatLng([latitude, longitude]);
    myMap.setView([latitude, longitude]);
}

setup();
updateMarker();
setInterval(updateMarker, 2000);