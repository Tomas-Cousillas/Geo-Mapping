// Map object
var map = L.map("map", {
  center: [ 39.8283, -98.5795],
  zoom: 3
});

// Tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: "pk.eyJ1IjoidG9tYXNjIiwiYSI6ImNrMmIzNzd3dDAwOWczbG51cGx5anU1MnEifQ.4bGD_OP_GkGtQ3YqypYrZw"
} ).addTo(map);


url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Grab GeoJSON data
d3.json(url, function(data) {
  
  var magnitude_list = [];
  for (var i = 0; i < data.features.length; i ++){
    var magnitude = +data.features[i].properties.mag;
    magnitude_list.push(magnitude);
  }  

  //loop and create markers
  for (var i = 0; i < 50; i++) {
    var color = "";
    if (magnitude_list[i] > 3) {
      color = "red";
    }
    else {
      color = "yellow";
    }

  // Circles 
  var geojsonMarkerOptions = {
    radius:  magnitude * 3,
    fillColor: color,
    color: "white",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };
  L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, geojsonMarkerOptions);
    }
}).addTo(map);
};
});





