var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var resourcejs = require('resourcejs');

var _ = require('lodash');

// Create the application.
var app = express();

// NOC: seed some data
var Customer = require('./models/customer');

// var d = new Date();
// var n = d.getTime();
// var seed_customer = new Customer({
// 	name: 'Peter',
// 	phone: '0412345678',
//   is_vip: true,
//   heads: 2,
//   started_waiting: n,
//   eta: 10,
//   finished_waiting: n
// });
// Customer.create(seed_customer);

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// CORS Support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/customer', function(req, res, next) {
  res.send('Hello World!');
  next();
});

app.use('/hello', function(req, res, next) {
  res.send('Hello World!');
  next();
});

// app.use('/', function(req, res) {
//   req.customer.find({});
//   res.send();
// });

// Connect to MongoDB
mongoose.connect('mongodb://localhost/waiting_list');
mongoose.connection.once('open', function() {

  // Load the models.
  app.models = require('./models/index');

  // Load the routes.
    var routes = require('./routes');
    _.each(routes, function(controller, route) {
      app.use(route, controller(app, route));
  });

console.log('Listening on port 3000...');
  app.listen(3000);
});
