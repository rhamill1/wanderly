var template;
var content;
var allExperiences = [];

$(document).ready(function(){
  console.log('js is ready!');
  // google.maps.event.addDomListener(window, 'load', initialize);
  initialize();
  //preparing handlebar
  var source = $('#experience-handle-bar').html();
  template = Handlebars.compile(source);
  var LatLng={lat:0,lng:0};

  $.ajax({
    type: 'GET',
    url: 'api/experiences',
    data: [],
    success: function(data) {
      allExperiences = data;
      window.content = template({Experience : data});
      $('#main').append(content);
      for(var key in data){
        LatLng.lat = data[key].coordinates.lat;
        LatLng.lng = data[key].coordinates.lng;
        addMarker(LatLng, map)
      }
    }
  });

  var newLocation={lat:null,lng:null};

  $('#new-entry-btn').on('click', function() {
    $('#new-entry').slideToggle('slow');
      listenerHandle = map.addListener( 'click', function(event) {
      addMarker(event.latLng, map);
      newLocation.lat = event.latLng.lat();
      newLocation.lng = event.latLng.lng();
      $('#lat').val(newLocation.lat);
      $('#lng').val(newLocation.lng);
      console.log("picked: ",newLocation);
    });
  });


  $('#experience-form').on('submit', function(e) {
    e.preventDefault();
    // getFromData();
    var newExperience = getFormData(); //$('#experience-form').serialize();
    $.ajax({
      method: "POST",
      url: 'api/experiences',
      data: newExperience,
      success: function onCreateSuccess(json) {
        allExperiences.shift(json);
        console.log("all: ",allExperiences);
        render(allExperiences);
        $('#new-entry').slideToggle('slow');
        $('#experience-form')[0].reset();
        google.maps.event.removeListener(listenerHandle);
      }
    });
  });


  $('#main').on('click', '.deleteBtn', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'DELETE',
      url: '/api/experiences/' + $(this).closest('.row').attr('data-experience-id'),
      success: function (json) {
        var item = json;
        var itemId = item._id;
        var i;
        for (i = 0; i < allExperiences.length; i++) {
          if (allExperiences[i]._id === itemId) {
            allExperiences.splice(i, 1);
            break;
          }
        }
        render(allExperiences);
      }
    });
  });


  $('#main').on('click', '.editBtn', function(e) {
    e.preventDefault();
    // console.log('editing', $(this).closest('.row').attr('data-experience-id'));
    var editId = $(this).closest('.row').attr('data-experience-id');
    var editUrl = '/api/experiences/' + editId;
    var confEdit = document.createElement('button');
    confEdit.setAttribute('class', 'fa fa-floppy-o');
    $(this).parent().append(confEdit);
    $(this).toggle(false);

    $.ajax({
      method: 'GET',
      url: editUrl,
      success: function (json) {
        console.log(json);
        var source = $('#updateForm').html();
        var updateForm = Handlebars.compile(source);
        var form = updateForm(json);
        console.log(form);
        $('#main').toggle(false);



        // $('[data-experience-id='+editId+']').toggle();
         $('#editSpace').prepend(form);
        // $('#main').prepend(form);
        // render(allExperiences);
      }
    });
  });


});//ending ready


function render(data){
  var handleBarScripts = $('#experience-handle-bar');
  $('#main').empty();
  $('#main').append(handleBarScripts);
  window.content = template({Experience : data});
  $('#main').append(content);
}

function getFormData(){
  //validating data
  //making sure newLocation has value
  var userData = $('#experience-form').serialize();
  console.log(userData);
  return userData;
  //return userData;
  //reset the newLocation
}

var map ;
function initialize(){
  var sf = { lat: 36.01553, lng: -6.567 };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: sf
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
