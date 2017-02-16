var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
const uuidV4 = require('uuid/v4');
var iothub = require('azure-iothub');
var connectionString = 'HostName=agirIotHub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=3qWj7VSCbBDSZqJU4uiNz1xCcJL3kFaqtXxQeTq/uYQ=';

var registry = iothub.Registry.fromConnectionString(connectionString);
var client = iothub.Client.fromConnectionString(connectionString);


/* GET apiKey. */
router.get('/apiKey', function (req, res, next) {
  var device = new iothub.Device(null);
  device.deviceId = '';
  if (req.param.name != null) {
    device.deviceId = req.query.name += '-';
  }
  device.deviceId += uuidV4();


  registry.create(device, function (err, deviceInfo, response) {
    if (err) {
      registry.get(device.deviceId, returnDevieInfo);
    }
    if (deviceInfo) {
      res.json(deviceInfo);
    }
  });

});

function returnDevieInfo(err, deviceInfo, res) {
  res.json(deviceInfo);
}


router.get('/devices', function (req, res, next) {
  registry.list(function (err, devices) {
    res.json(devices);
  });
});
var jsonParser = bodyParser.json({ extended: false })

router.post('/interval', jsonParser, function (req, res, next) {
  console.log(req.body);
  client.open(function (err) {
    if (err) {
      console.error('Could not connect: ' + err.message);
    } else {
      console.log('Client connected');

      client.send(req.body.deviceId, "changeInterval;" + req.body.interval, function () {
        console.log("Changing interval on " + req.body.deviceId + " to " + req.body.interval);
        res.json('OK');
      });
    }
  });
});
module.exports = router;
