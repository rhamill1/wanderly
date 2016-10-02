var db = require('./models');

var newUsers = [];

newUsers.push(
  {
  name: 'Ryan',
  image: '',
  marker: ''
}
);

newUsers.push(
  {
  name: 'Sherri',
  image: '',
  marker: ''
  }
);

newUsers.push(
  {
  name: 'Bob',
  image: '',
  marker: ''
  }
);


db.User.remove({}, function(err, users){

  db.User.create(newUsers, function(err, users){
    if (err) {console.log('Error ', err);}
    console.log('all users: ', users);
    process.exit();
  });
});
