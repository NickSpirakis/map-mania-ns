var gMap;


function openModal() {
  var modal = document.getElementById('myModal');
  modal.style.display = "block";
 }

 function closeModal() {
   var modal = document.getElementById('myModal');
   modal.style.display = "none";
 }
//learned from w3schools tutorial
 window.onclick = function(event) {
  var modal = document.getElementById('myModal');
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

var favoritePlaces = 
[
{"content":"Aconcagua Mountain, Argentina", "coordinates":{"lat":-32.65292526562615,
"lng":-70.01103919360321}, 
        "iconImagePath":"https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png"},
{"content":"Myrtle Beach, SC", "coordinates":{"lat":33.6891,"lng":-78.8867}, 
"iconImagePath":"flag.png"},
{"content":"Lake Geneva, WI", "coordinates":{"lat":42.593360396250326,"lng":-88.43899850648441}, 
"iconImagePath":"flag.png"},
{"content":"Walt Disney World Resort, Florida", 
"coordinates":{"lat":28.377365035376293,"lng":-81.57075073127668}, "iconImagePath":"flag.png"},
{"content":"Louvre Museum, France", 
"coordinates":{"lat":48.86078753956548,"lng":2.337590353875208}, "iconImagePath":"flag.png"},
{"content":"The Great Pyramid of Giza, Egypt", 
"coordinates":{"lat":29.979364589168743,"lng":31.13418043991689}, "iconImagePath":"flag.png"},
{"content":"Sydney Opera House, Australia", 
"coordinates":{"lat":-33.85657055045786,"lng":151.21529669789308}, "iconImagePath":"four.png"},
{"content":"King's Island, Ohio", 
"coordinates":{"lat":39.3837224936383, "lng":-84.26881692571592}, "iconImagePath":"three.png"},
{"content":"<strong>#2: Half Price Books !<strong>", 
"coordinates":{"lat":41.618528279518635, "lng":-87.85250890675368}, "iconImagePath":"two.png"},
{"content":"<strong>#1: Orland Park, IL !<strong>",
 "coordinates":{"lat":41.590808441443656, "lng":-87.88732785982376}, "iconImagePath":"one.png"}

];

var currentPlaceIndex = favoritePlaces.length-10;
var currentPlace = favoritePlaces[currentPlaceIndex];

function addMarker(markerContent) {
  var marker = new google.maps.Marker({position:markerContent.coordinates, map:gMap});
  if (markerContent.iconImagePath) {
      marker.setIcon(markerContent.iconImagePath);
  }

  if (markerContent.content) {
      var infoWindow = new google.maps.InfoWindow({"content":markerContent.content});
      marker.addListener("click", function() { infoWindow.open(gMap, marker); });
  }
}

function SetHint(hint) {
  document.getElementById("hint-id").value = hint;
}

function SetScore(){
  document.getElementById("score-id").value = score;
}

function printWin(){
  if (currentPlaceIndex == favoritePlaces.length +1 || score == 10){
    SetHint("Congragulations, You Win!");
  }
}

function winGame(){ 
  for (i=0;i<favoritePlaces.length;i++){
    addMarker(favoritePlaces[i]);
    score = 10;
    SetScore(score);
    SetHint("Congragulations, You Win!");
    console.log("score" + SetScore);
    console.log("hint" + SetHint);
  }
}

var score = 0;

function initMap() {

  gMap = new google.maps.Map(document.getElementById("myMapID"), {
    //center: { lat: -34.397, lng: 150.644 },
    //zoom: 8,
    center: { lat: 32.7502, lng: 174.7655 },
    zoom: 2,
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
      updateGame();
  });

  function updateGame(){
    console.log('updateGame()');
    var zoomLevel = gMap.getZoom();
    console.log("Zoom Level: " + zoomLevel);

    var inBounds = false;
    SetHint("Not In Bounds");
    
    if(inBounds == false && score > 10){
      SetHint("Not In Bounds");
    }
    if(score == 10){
      SetHint("Congragulations, You Win!");
    }
    
    console.log("coords:" + JSON.stringify(currentPlace.coordinates));

    if (gMap.getBounds().contains(currentPlace.coordinates))
    {
      inBounds = true;
      SetHint("In Bounds");
      console.log("inbounds");
    }
    
    if ((zoomLevel > 7)&&(inBounds))
    {
      console.log("Location Found!");
      addMarker(currentPlace);
      score += 1;
      SetScore(score);
      zoomLevel = 8;

      console.log("score is: " + score);
      gMap.setZoom(4);
      nextPlace();

      //printWin();
    }
    printWin(winGame);
    
  }

  function nextPlace() {
    currentPlaceIndex++;
    currentPlace = favoritePlaces[currentPlaceIndex];
  }

}

//initApp
function initApplication(){
  console.log('Map Mania Lite - Starting!');
}
