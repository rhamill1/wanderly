var db = require('./models');

var newExperiences = [];

newExperiences.push(
  {
    title: 'The time I visited China',
    date: '2009-10-01',
    coordinates: {lat: 22.517, lng: -245.984},
    image: 'http://assets.fodors.com/destinations/54468/boat-harbor-hong-kong-china-1_main.jpg',
    author: 'Ryan',
    note: 'It was fun.  The food was nice.',
    bucketList: '',
    createdAt: new Date().toDateString()
  }
);

newExperiences.push(
  {
    title: 'The time I visited Africa',
    date: '2008-01-01',
    coordinates: {lat: -33.138, lng: -338.467},
    image: 'http://www.lonelyplanet.com/travel-blog/tip-article/wordpress_uploads/2015/12/GettyImages-140893867_full.jpg',
    author: 'Sherri',
    note: 'It was fun.  The food was pretty goood nice. Bob was there',
    bucketList: '',
    createdAt: new Date().toDateString()
  }
);

newExperiences.push(
  {
    title: 'Iceland is green!  huh?',
    date: '2007-12-12',
    coordinates: {lat: 64.321, lng: -380.347},
    image: 'http://globalepix.com/wp-content/uploads/2013/10/WIEI-iceland-walking1.jpg',
    author: 'Bob',
    note: 'I met another Bob there. He was not my favorite Bob',
    bucketList: 'checked',
    createdAt: new Date().toDateString()
  }
);


db.Experience.remove({}, function(err, experiences){

  db.Experience.create(newExperiences, function(err, experiences){
    if (err) {console.log('Error ', err);}
    console.log('all experiences: ', experiences);
    process.exit();
  });
});
