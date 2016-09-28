$(document).ready(function(){
  console.log('js is ready!');
  google.maps.event.addDomListener(window, 'load', initialize);

  $.ajax({
    type: 'GET',
    url: 'api/experiences',
    data: [],
    success: function(data) {
      console.log(data);
    }
  })
});//ending ready


function initialize() {
  var bangalore = { lat: 37.7749, lng: -122.431297 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: bangalore
  });

  // This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) {
    //console.log(event.latLng)
    addMarker(event.latLng, map);
  });

  // Add a marker at the center of the map.
  addMarker(bangalore, map);
}


var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;

// Adds a marker to the map.
function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  //console.log(location)
  var marker = new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map
  });
}
