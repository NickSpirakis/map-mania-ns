var gMap;

function initMap() {
  gMap = new google.maps.Map(document.getElementById("myMapID"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
//the part that uses the get element by id are based off of the tutorial mentioned in readme
  gMap.addListener('bounds_changed', () => {
    document.getElementById('panel').innerHTML = 'Bounds Changed';
    window.setTimeout(() => {
      document.getElementById('panel').innerHTML = ' ';
    }, 2000);
    console.log('bounds changed');
  });
}

function initApplication(){
  console.log('Map Mania Lite - Starting!');
}
