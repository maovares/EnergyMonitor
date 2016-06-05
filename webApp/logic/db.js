'use strict'

//var host = "localhost";
//var port = 27017;
var dbName = "energy";

//
var mongojs = require("mongojs");
var db = mongojs(dbName,['consumption']);

exports.getEnergyData = function(id){
	var id = params.id;
  db.consumption.find({'id':id},function(error, docs){
    return docs;
  });
};

exports.postEnergyData = function(id, number){

	console.log("DB insert "+id+" "+number);

  db.consumption.insert({
    "id":id,
    "number":number
  });
};
