/*

*/

'use strict'

  //
  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');
  var port = 8080;
  //
  var db = require('./logic/db.js');
  //

  app.use(express.static(__dirname + '/public'));
  app.use('/styles', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
  app.use('/scripts',  express.static(__dirname + '/node_modules/bootstrap/dist/js/'));
  app.use('/scripts',  express.static(__dirname + '/node_modules/angular/'));
  app.use('/scripts',  express.static(__dirname + '/node_modules/angular-ui-bootstrap/dist/'));
  app.use('/scripts',  express.static(__dirname + '/node_modules/angular-ui-router/release/'));
  app.use(bodyParser.urlencoded({'extended':'true'}));
  app.use(bodyParser.json());
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

  //
  app.get('/getEnergyData/:id',function(req, res){
    var id = req.params.id;
    db.getEnergyData(id,function(err,docs){
      res.json(docs);
    });
  });
  app.get('/postEnergyData/:id/:watts/:irms/:supplyVoltage/:realPower/:apparentPower', function(req, res){
    var id = req.params.id;
    var watts = req.params.watts;
    var irms = req.params.irms;
    var supplyVoltage = req.params.supplyVoltage;
    var realPower = req.params.realPower;
    var apparentPower = req.params.apparentPower;
    db.postEnergyData(id, watts, irms,supplyVoltage,realPower,apparentPower);
  });


  //

  app.listen(port);
  console.log('App listening on port ' + port);
