var template;
var content;
var allExperiences = [];
var markers = [];
var currentUser;
var userGroup=[];

$(document).ready(function(){
  console.log('js is ready!');
  // $('#myModal').modal({show: false});
  initialize();
  getUsersGroup()
  var source = $('#experience-handle-bar').html();
  template = Handlebars.compile(source);
  var LatLng={lat:0,lng:0};


  $("#userList").on('change', function() {
    currentUser = $(this).val();
  });


  $.ajax({
    type: 'GET',
    url: 'api/experiences',
    data: [],
    success: function(data) {
      allExperiences = data;
      window.content = template({Experience : data});
      $('#main').append(content);
      var imgIcon;
      for(var key in data){
        // for(var i=0 ; i<userGroup.length ; i++){
        //   if(data[i].author === userGroup[i].name){
        //     console.log(data[i].author,userGroup[i].name)
        //     imgIcon = userGroup[i].marker;
        //     console.log(imgIcon)
        //     break;
        //   }
        // }
        LatLng.lat = data[key].coordinates.lat;
        LatLng.lng = data[key].coordinates.lng;
        addMarker(LatLng, map,imgIcon)
      }
    }
  });


  var newLocation={lat:null,lng:null};

  $('#new-entry-btn').on('click', function(){
    $('#new-entry').toggle(true);
      listenerHandle = map.addListener('click', function(event) {
      addMarker(event.latLng, map);
      newLocation.lat = event.latLng.lat();
      newLocation.lng = event.latLng.lng();
      $('.lat').val(newLocation.lat);
      $('.lng').val(newLocation.lng);
      console.log("picked: ",newLocation);
    });
  });


  $('#experience-form').on('submit', function(e) {
    e.preventDefault();

    var isvalidate=$("#experience-form").valid();
    if(!isvalidate) {
      e.preventDefault();
      console.log('it was wrong')
    }

    else {
      $('#experience-form').find('.userName').val(currentUser);
      console.log( $('#experience-form').find('.userName').val());
      var newExperience = getFormData(this);
      $.ajax({
        method: "POST",
        url: 'api/experiences',
        data: newExperience,
        success: function onCreateSuccess(json) {
          allExperiences.push(json);
          console.log("all: ",allExperiences);
          render(allExperiences);
          $('#new-entry').slideToggle('slow');
          $('#experience-form')[0].reset();
          listenerHandle.remove();
        }
      });
    };
  });

  //event listener for
  $('#new-entry').on('click','.cancel', function(e){
    $('#new-entry').toggle(false);
    $('#experience-form')[0].reset();
    experienceValidHandler.resetForm();
    listenerHandle.remove();
  });


  $('#editSpace').on('click','#submit-edits', function(e){
    e.preventDefault();
    var updateExperience = getFormData($('#update-experience-form'));
    console.log("edited info",updateExperience)
    var editId = $(this).closest('form#update-experience-form').attr('data-edit-id');
    $.ajax({
      method: 'PUT',
      url: '/api/experiences/' + editId,
      data: updateExperience,
      success: function(data) {
        $.ajax({
          type: 'GET',
          url: 'api/experiences',
          data: [],
          success: function(data) {
            allExperiences = data;
            render(data);
            setMapOnAll(null);
            for(var key in data){
              LatLng.lat = data[key].coordinates.lat;
              LatLng.lng = data[key].coordinates.lng;
              addMarker(LatLng, map)
            }
          }
        });
        $('#main').toggle(true);
        $('#editSpace').toggle(false);
        $('#new-entry-btn').toggle(true);
        listenerHandle.remove();
      }
    });
  });

  //event listener for closing the edit form
  $('#editSpace').on('click','.cancel', function(e){
    $('#editSpace').toggle(false);
    $('#main').toggle(true);
    $('#editSpace').toggle(false);
    $('#new-entry-btn').toggle(true);
    listenerHandle.remove();
    //put main back
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
        // $('#myModal').modal('show');
        alert('experience successfully removed');
        render(allExperiences);
      }
    });
  });


  $('#main').on('click', '.editBtn', function(e) {
    e.preventDefault();
    var editId = $(this).closest('.row').attr('data-experience-id');
    var editUrl = '/api/experiences/' + editId;
     listenerHandle = map.addListener( 'click', function(event) {
      addMarker(event.latLng, map);
      newLocation.lat = event.latLng.lat();
      newLocation.lng = event.latLng.lng();
      $('.lat').val(newLocation.lat);
      $('.lng').val(newLocation.lng);
      console.log("picked: ",newLocation);
    });
    $('#new-entry-btn').toggle(false);
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
        var formHandleBarScript = $('#updateForm');
        $('#editSpace').empty();
        $('#editSpace').append(formHandleBarScript);
        $('#editSpace').toggle(true);
        $('#editSpace').prepend(form);
      }
    });
  });


});//ending ready


function getUsersGroup(){

  $.ajax({
    method:"GET",
    url:"/api/users/",
    data:[],
    success: function (data){
      console.log(data);
      var source = $('#user-template').html();
      var template = Handlebars.compile(source);
      var userFormHtml = template({ User : data });
      $('#userList').append(userFormHtml);
      userGroup = data;
      currentUser = userGroup[0];
    }
  })


 //set up the template userForm

 //show users


}




function render(data){
  var handleBarScripts = $('#experience-handle-bar');
  $('#main').empty();
  $('#main').append(handleBarScripts);
  window.content = template({Experience : data});
  $('#main').append(content);
}


function getFormData(form){
  var serializedForm = $(form).serialize();
  var bucketStatus = ($(form).find('.bucketCheck').is(':checked'))? 'checked': '';
  console.log(bucketStatus);
  serializedForm += '&bucketList=' + bucketStatus;
  console.log(serializedForm);
  return serializedForm;
}


var map ;
function initialize(){
  var initLocation = { lat: 36.01553, lng: -6.567 };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: initLocation,
    mapTypeId:'satellite',
    scaleControl: true,
    scrollwheel: false
  });
}


var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// label: labels[labelIndex++ % labels.length],
var labelIndex = 0;

function addMarker(location, map,markerImg) {
  var marker = new google.maps.Marker({
    position: location,
    animation: google.maps.Animation.DROP,
    icon :markerImg,
    map: map
  });
  marker.setMap(map);
  markers.push(marker);
}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

