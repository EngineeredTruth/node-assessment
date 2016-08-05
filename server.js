var express = require('express');
var bodyParser = require('body-parser');
var users = require('./users.json');
var port = 3000;
var ctrl = require('./ctrl.js');

var app = module.exports = express();
app.use(bodyParser.json());

app.get('/api/users/', ctrl.getUsers);
app.get('/api/users/:type', ctrl.getUsersType);

app.post('/api/users', ctrl.createUser);
app.post('/api/users/:type', ctrl.createUser);
app.post('/api/users/language/:userId', ctrl.changeLanguage);
app.post('/api/users/forums/:userId', ctrl.addForum);

app.put('/api/users/:userId', ctrl.updateUser);

app.delete('/api/users/forums/:userId', ctrl.deleteForum);
app.delete('/api/users/:userId', ctrl.deleteUser);

app.listen(port,function(){
  console.log("We're listening on: ", port);
});
