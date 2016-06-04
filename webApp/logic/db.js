'use strict'

//var host = "localhost";
//var port = 27017;
var dbName = "energy";

//
var mongojs = require("mongojs");
var db = mongojs(dbName,['consumption']);

exports.getEnergyData = function(params, callback){
	var id = params.id;
  db.consumption.find({'id':id},function(error, docs){
    callback(docs);
  });
};

exports.postEnergyData = function(params, callback){
  var id = req.params.id ;
  var number = req.params.number ;
  db.consumption.insert({
    "id":id,
    "number":number
  },function(error, docs){
    callback(docs);
  });
};
