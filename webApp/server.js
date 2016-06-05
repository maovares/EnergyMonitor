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
  app.get('/getEnergyData/:id',db.getEnergyData);
  app.get('/postEnergyData/:id/:number', function(req, res){
    db.postEnergyData(req.params.id, req.params.number);
  });


  //

  app.listen(port);
  console.log('App listening on port ' + port);
