'use strict'

//var host = "localhost";
//var port = 27017;
var dbName = "energy";

//
var mongojs = require("mongojs");
var db = mongojs(dbName,['consumption']);

exports.getEnergyData = function(id, callback){
  db.consumption.find({'id':id},function(error, docs){
    callback(error,docs);
  });
};

exports.postEnergyData = function(id, amps, watts){

	console.log(id+" "+amps + " " + watts);

  db.consumption.insert({
    "id":id,
    "amps":amps,
    "watts":watts
  });
};
