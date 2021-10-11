var gMap;

function initMap() {

  gMap = new google.maps.Map(document.getElementById("myMapID"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });

  //requirement 2.5 interesting feature
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

  //requirement 2.2, 2.3
  gMap.addListener('in_bounds', () => {
    if (gMap.getBounds().contains(loc)){
      console.log('in bounds');
    }
    //console.log('in_bounds');
    //console.log(gMap.getBounds().contains(loc));
  });
//requirement 2.4
  gMap.addListener('zoom_changed', () => {
    console.log('zoom changed');
    console.log(gMap.getZoom());
  });

  var myMarkerOptions = {
    position: loc,
    map: gMap
  };

  var myMarker = new google.maps.Marker(myMarkerOptions);
}

function initApplication(){
  console.log('Map Mania Lite - Starting!');
}
