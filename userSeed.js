var db = require('./models');

var newUsers = [];

newUsers.push(
  {
  name: 'guest',
  image: '',
  marker: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
  }
);

newUsers.push(
  {
  name: 'Ryan',
  image: '',
  marker: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
  }
);

newUsers.push(
  {
  name: 'Sherri',
  image: '',
  marker: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
  }
);

newUsers.push(
  {
  name: 'Bob',
  image: '',
  marker: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png'
  }
);


db.User.remove({}, function(err, users){

  db.User.create(newUsers, function(err, users){
    if (err) {console.log('Error ', err);}
    console.log('all users: ', users);
    process.exit();
  });
});
