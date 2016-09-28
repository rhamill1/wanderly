// var db = require('./models');

// var newExperiences = [];

// newExperiences.push(
//   {
//     title: 'The time I visited China',
//     date: '2009-10-01',
//     coordinates: {lat: 22.517, lng: -245.984},
//     image: 'https://www.google.com/imgres?imgurl=http%3A%2F%2Fassets.fodors.com%2Fdestinations%2F54468%2Fboat-harbor-hong-kong-china-1_main.jpg&imgrefurl=http%3A%2F%2Fwww.fodors.com%2Fworld%2Fasia%2Fchina%2Fhong-kong&docid=DYszg0r1rNzZIM&tbnid=bWRM9cypcxqfIM%3A&w=648&h=350&safe=off&bih=700&biw=640&ved=0ahUKEwjDv7TPgrPPAhVLzmMKHb2ZALgQMwhHKAMwAw&iact=mrc&uact=8',
//     author: 'me',
//     note: 'It was fun.  The food was nice.',
//     bucketList: false
//   }
// );

// newExperiences.push(
//   {
//     title: 'The time I visited Africa',
//     date: '2008-01-01',
//     coordinates: {lat: -33.138, lng: -338.467},
//     image: 'https://www.google.com/imgres?imgurl=http%3A%2F%2Fcountry.southafrica.net%2Fcountry%2Fcache%2Fce_img_cache%2Flocal%2Fcountry%2Fuploads%2Fimages%2Fbesttime_455_280_90_s_c1_.jpg&imgrefurl=http%3A%2F%2Fwww.southafrica.net%2F&docid=0UgBGds84vrolM&tbnid=h27fsEugULNCzM%3A&w=455&h=280&safe=off&bih=700&biw=640&ved=0ahUKEwjCi5iUg7PPAhVEy2MKHU19Bt8QMwhPKAkwCQ&iact=mrc&uact=8',
//     author: 'you',
//     note: 'It was fun.  The food was pretty goood nice. Bob was there',
//     bucketList: false
//   }
// );

// newExperiences.push(
//   {
//     title: 'Iceland is green!  huh?',
//     date: '2007-12-12',
//     coordinates: {lat: 64.321, lng: -380.347},
//     image: 'https://www.google.com/imgres?imgurl=http%3A%2F%2Fmedia.windstarcruises.com%2Fmedia%2Fdestinations%2Fnorthern_european%2Faround-iceland%2FHERO-around-iceland.jpg&imgrefurl=http%3A%2F%2Fwww.windstarcruises.com%2Fcruise%2Fnorthern-europe%2Faround-iceland%2F&docid=zLO9qa2bM2_u7M&tbnid=MN9fuz05rcr-lM%3A&w=860&h=380&safe=off&bih=700&biw=640&ved=0ahUKEwid4pvKg7PPAhVB0mMKHY7kCCwQMwhFKAcwBw&iact=mrc&uact=8',
//     author: 'Bob',
//     note: 'I met another Bob there. He was not my favorite Bob',
//     bucketList: false
//   }
// );


// db.Experience.remove({}, function(err, experiences){

//   db.Experience.create(newExperiences, function(err, experiences){
//     if (err) {console.log('Error ', err);}
//     console.log('all experiences: ', experiences);
//     process.exit();
//   });
// });
