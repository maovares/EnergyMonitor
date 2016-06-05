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

exports.postEnergyData = function(id, number){

	console.log("DB insert "+id+" "+number);

  db.consumption.insert({
    "id":id,
    "number":number
  });
};
