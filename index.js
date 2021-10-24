var gMap;

var favoritePlaces = 
[
{"content":"Canoe Bay, WI", "coordinates":{"lat":45.3306,"lng":-91.4918}, 
        "iconImagePath":"https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png"},

{"content":"Myrtle Beach, SC", "coordinates":{"lat":33.6891,"lng":-78.8867}, "iconImagePath":"flag.png"},

{"content":"Prague, Czechia", "coordinates":{"lat":50.0755,"lng":14.4378}, "iconImagePath":"flag.png"},

{"content":"Nelson, New Zealand", "coordinates":{"lat":-41.2706,"lng":173.2840}, "iconImagePath":"flag.png"},

{"content":"Krakow, Poland", "coordinates":{"lat":50.0647,"lng":19.9450}, "iconImagePath":"flag.png"},

{"content":"Zakopane, Poland", "coordinates":{"lat":49.2992,"lng":19.9496}, "iconImagePath":"flag.png"},

{"content":"Florence, Italy", "coordinates":{"lat":43.7696,"lng":11.2558}, "iconImagePath":"four.png"},

{"content":"King's Island, Ohio", "coordinates":{"lat":39.3837224936383, "lng":-84.26881692571592}, "iconImagePath":"three.png"},
{"content":"<strong>#2: Half Price Books !<strong>", "coordinates":{"lat":41.618528279518635, "lng":-87.85250890675368}, "iconImagePath":"two.png"},
{"content":"<strong>#1: Orland Park, IL !<strong>", "coordinates":{"lat":41.590808441443656, "lng":-87.88732785982376}, "iconImagePath":"one.png"}

];

var currentPlaceIndex = favoritePlaces.length-1;
var currentPlace = favoritePlaces[currentPlaceIndex];


function initMap() {

  gMap = new google.maps.Map(document.getElementById("myMapID"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });

  //requirement 2.5: interesting feature
//the part that uses the get element by id are based off of the tutorial mentioned in readme
  gMap.addListener('bounds_changed', () => {
    document.getElementById('panel').innerHTML = 'Bounds Changed';
    window.setTimeout(() => {
      document.getElementById('panel').innerHTML = ' ';
    }, 2000);
    console.log('bounds changed');
    console.log(gMap.getBounds());
  });

//requirement 2.1
  var loc = new google.maps.LatLng(41.6050, -88.0806);

  google.maps.event.addListener(gMap, 'idle', function() {
      updateGame()
  });

  function updateGame(){
    console.log('updateGame()');
    var zoomLevel = gMap.getZoom();
    console.log("Zoom Level: " + zoomLevel);

    var inBounds = false;
    console.log("coords:" + JSON.stringify(currentPlace.coordinates));

    if (gMap.getBounds().contains(currentPlace.coordinates))
    {
      inBounds = true;
      console.log("inbounds");
    }
    
    if ((zoomLevel > 7)&&(inBounds))
    {
      console.log("Location Found!");
      addMarker(currentPlace);
      nextPlace();
    }

  };

  function nextPlace() {
    currentPlaceIndex--;
    currentPlace = favoritePlaces[currentPlaceIndex];
  }

  function addMarker(markerContent) {
    var marker = new google.maps.Marker({position:markerContent.coordinates, map:gMap});
    if (markerContent.iconImagePath) {
        marker.setIcon(markerContent.iconImagePath);
    }

    if (markerContent.content) {
        var infoWindow = new google.maps.InfoWindow({"content":markerContent.content});
        marker.addListener("click", function() { infoWindow.open(gMap, marker) });
    }
}
//requirement 2.4
/*
  gMap.addListener('zoom_changed', () => {
    console.log('zoom changed');
    console.log(gMap.getZoom());
  });

  var myMarkerOptions = {
    position: loc,
    map: gMap
  };

  var myMarker = new google.maps.Marker(myMarkerOptions);
*/

}

//updating file 

//initApp
function initApplication(){
  console.log('Map Mania Lite - Starting!');
}
