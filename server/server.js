var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var axios = require('axios')
var secrets = require('../src/SECRETS.js')
var qs = require('qs')

// start express
var app = express();

// use morgan middleware for logs
app.use(morgan('dev'));

// use bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// use express.static to serve client folder
app.use(express.static(path.join(__dirname, '../dist')));


/*
  routes can be factored out however due to scope will stay in one file
*/
// route to get token
app.get('/services/getAccessToken', function(req, res) {
  // code used to request access token
  var code = req.query.code
  var data = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: 'http://localhost:1337'
  }
  // convert data into json format
  data = qs.stringify(data)
  // send a post request to get access token
  axios.post('https://www.reddit.com/api/v1/access_token', data,
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      auth: {username: secrets.client_id, password: secrets.client_secret}
  })
  .then(function (response) {
    var data = response.data
    res.send(data);
  })
  .catch(function (error) {
    console.log(error);
  });
})


// route all unspecified paths to home
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// set port
var port = process.env.PORT || 1337;

// listen on port
app.listen(port);

console.log("Server is listening on port " + port);

