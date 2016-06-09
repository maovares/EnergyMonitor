'use strict'

//var host = "localhost";
//var port = 27017;
var dbName = "energy";

//
var mongojs = require("mongojs");
var db = mongojs(dbName,['consumption']);

exports.getEnergyData = function(id, callback){
  db.consumption.find({'id':id}).sort({_id:-1}).limit(20,function(error, docs){
    callback(error,docs);
  });
};

exports.postEnergyData = function(id, watts, irms,supplyVoltage,realPower,apparentPower){

	console.log(id+" "+watts+" "+irms+" "+supplyVoltage+" "+realPower+""+apparentPower);

  db.consumption.insert({
    id : id,
    watts : watts,
    irms : irms,
    supplyVoltage : supplyVoltage,
    realPower : realPower,
    apparentPower : apparentPower
  });
};
