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
  app.put('/x10/:device/power/:command', function (req, res) {
    var method = req.query.protocol; // rf or pl
    console.log('Queuing Power Event');
    var ncCommand = method + ' ' + req.params.device + ' ' + req.params.command + '\n';
    queueCommand(ncCommand);
    res.send('OK');
  });

  app.put('/x10/:device/brightness', function (req, res) {
    if (req.query.protocol == "pl") {
      console.log('Queuing Brightness Event');
      var command = 'xdim';
      var val = Math.round((parseInt(req.query.value) / 100) * 70);
      var ncCommand = 'pl ' + req.params.device + ' ' + command + ' ' + val + '\n';
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