const API_KEY = "pk.eyJ1IjoiYWpjYXNjZWxsYSIsImEiOiJjazJiMGhzb3IzNWF1M2htbHBzbjd1ZXZlIn0.e91Lsn8bXN612sA2KKbLbw";

// Creating map object
var map = L.map("map", {
  center: [39.8283, -98.5795],
  zoom: 5
});


// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

// Store GeoJSON API endpoint inside queryUrl

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grabbing our GeoJSON data..
d3.json(queryUrl, function(data) {
  for (var i = 0; i < data.features.length; i ++){
    var magnitude = +data.features[i].properties.mag;
      var geojsonMarkerOptions = {
        radius: magnitude* 5,
        fillColor: "ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
  };
L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, geojsonMarkerOptions);
    }
}).addTo(map);
});


