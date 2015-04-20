var net = require('net');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var queue = require('queue-async')(1);

app.use(bodyParser.urlencoded({
  extended: true
})); 

function queueCommand(command) {
  queue.defer(function (callback) {
    setTimeout(function () {
      console.log(command);
      client.write(command);
      callback(null, null);
    }, 250);
  });
}

var client = net.connect(1099, function(){
  app.post('/x10/power', function (req, res) {
    var location = req.param('house_code') + req.param('device_id');
    var method = req.param('protocol'); // rf or pl
    console.log('Queuing Power Event');
    var command = req.param('value') == 'true' ? 'on' : 'off';
    var ncCommand = method + ' ' + location + ' ' + command + '\n';
    queueCommand(ncCommand);
    res.send('OK');
  });

  app.post('/x10/brightness', function (req, res) {
    var location = req.param('house_code') + req.param('device_id');
    if (req.param('protocol') == "pl") {
      console.log('Queuing Brightness Event');
      var command = 'xdim';//req.param('value') == 'true' ? 'on' : 'off';
      var val = Math.round((parseInt(req.param('value')) / 100) * 70);
      var ncCommand = 'pl ' + location + ' ' + command + ' ' + val + '\n';
      queueCommand(ncCommand);
    }
    res.send('OK');
  });

  var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('rest-mochad listening at http://%s:%s', host, port);
  });
});