(function(){
  'use strict'

  angular.module('energyApp')
  .service('MonitorService',function(httpService){
    var th = this;


    th.getMeasures = function(id, callback){
      httpService.getMeasures(id, function(response){
        callback(response);
      });
    };

    th.getAverage = function(array, callback){
      if(array.length>0){
        var totalWatts = 0 ;
        var totalIrms = 0;
        var totalSupplyVoltage = 0;
        var totalRealPower = 0;
        var totalApparentPower = 0;
        var averageWatts, averageIrms, averageSupplyVoltage, averageRealPower, averageApparentPower;

        for (var i = 0; i < array.length; i++){
          totalWatts = totalWatts + parseFloat(array[i].watts);
          totalIrms = totalIrms + parseFloat(array[i].irms);
          totalSupplyVoltage = totalSupplyVoltage + parseFloat(array[i].supplyVoltage);
          totalRealPower = totalRealPower + parseFloat(array[i].realPower);
          totalApparentPower = totalApparentPower + parseFloat(array[i].apparentPower);
        }

        averageWatts = (totalWatts / array.length);
        averageIrms = (totalIrms / array.length);
        averageSupplyVoltage = (totalSupplyVoltage / array.length);
        averageRealPower = (totalRealPower / array.length);
        averageApparentPower = (totalApparentPower / array.length);
        
        callback({status:true, averageWatts : averageWatts, averageIrms : averageIrms,
          averageSupplyVoltage : averageSupplyVoltage, averageRealPower : averageRealPower,
           averageApparentPower : averageApparentPower})
      }
      callback({status:false})


    };

  });
})();
