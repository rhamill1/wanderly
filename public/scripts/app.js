$(document).ready(function(){
  console.log('js is ready!');
  // google.maps.event.addDomListener(window, 'load', initialize);
  initialize();
  //preparing handlebar
  var source = $('#experience-handle-bar').html();
  var template = Handlebars.compile(source);
  var LatLng={lat:0,lng:0};

  $.ajax({
    type: 'GET',
    url: 'api/experiences',
    data: [],
    success: function(data) {
      console.log(data);
      var content = template({Experience : data});
      $('#main').append(content);
      for(var key in data){
            LatLng.lat = data[key].coordinates.lat;
            LatLng.lng = data[key].coordinates.lng;
            addMarker(LatLng, map)

         }
    }
  });

  $('#new-entry-btn').on('click', function() {
    $('#new-entry').slideToggle('slow');
  });


  $('#experience-form').on('submit', function(e) {
    e.preventDefault();
    // console.log($('#experience-form'));
    console.log($('#experience-form').serialize());
  });

});//ending ready

var map ;
function initialize(){
  var sf = { lat: 36.01553, lng: -6.567 };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: sf
  });
  // This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) {
    //console.log(event.latLng)
    addMarker(event.latLng, map);
    console.log(event.latLng.lat(),event.latLng.lng())
  });

}


var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;

function addMarker(location, map) {
  console.log("in lo: ",location.lat)

  var marker = new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    animation: google.maps.Animation.DROP,
    map: map
  });
  console.log(marker)
  marker.setMap(map);
}
