var experienceValidHandler;
$(function() {
  experienceValidHandler = $('#experience-form').validate({
    rules: {
      title: "required",
      image: {
        required: true,
        url: true
      },

      note: {
        required: true,
        maxlength: 300
      },

      lat: "required",
      lng: "required"
    },

    messages: {
      title: "Name your experience",
      image: "Please enter a url link to your image",
      note: {
        required: "Tell us about your experience",
        maxlength: "Just tell us the good stuff.  300 character limit"
      },

      lat: "Please click a location on the map"
    },
  });

  // $("#experience-form").on('submit', function(e){
  //   var isvalidate=$("#experience-form").valid();
  //   if(!isvalidate)
  //   {
  //     e.preventDefault();
  //     console.log('it was wrong')
  //   }
  // });

});
