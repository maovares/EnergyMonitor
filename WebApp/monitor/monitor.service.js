(function(){
  'use strict'

  angular.module('energyApp')
  .factory('MonitorService', function(httpService){
    function getMeasures(id, callback){
      httpService.getMeasures(id, function(response){
        callback(response);
      });
    };

    function getAverage(array, callback){
      if(array.length>0){
        var totalWatts = 0 ;
        var totalIrms = 0;
        var totalSupplyVoltage = 0;
        var totalRealPower = 0;
        var totalApparentPower = 0;
        var averageWatts, averageIrms, averageSupplyVoltage, averageRealPower, averageApparentPower, lenArray;

        for (var i = 0; i < array.length; i++){
          totalWatts = totalWatts + array[i].watts;
          totalIrms = totalIrms + array[i].irms;
          totalSupplyVoltage = totalSupplyVoltage + array[i].supplyVoltage;
          totalRealPower = totalRealPower + array[i].realPower;
          totalApparentPower = totalApparentPower + array[i].apparentPower;
        }
        lenArray = array.length;
        averageWatts = (totalWatts / lenArray);
        averageIrms = (totalIrms / lenArray);
        averageSupplyVoltage = (totalSupplyVoltage / lenArray);
        averageRealPower = (totalRealPower / lenArray);
        averageApparentPower = (totalApparentPower / lenArray);

        callback({
            status: true,
            averageWatts : averageWatts,
            averageIrms : averageIrms,
            averageSupplyVoltage : averageSupplyVoltage,
            averageRealPower : averageRealPower,
            averageApparentPower : averageApparentPower
            });
      }else{
        callback({status: false});
      }

    };
      
    function getChartInfo(callback) {
        getMeasures('p1', function (res) {
            if (res.status === 200){
                var array = res.data,
                    chartInfo = [];
                var lenArray = array.length;
                for (var i = 0; i < lenArray; i++){
                    chartInfo.push({
                        x: i + 1,
                        watts: parseFloat(array[i].watts),
                        irms: parseFloat(array[i].irms),
                        realPower: parseFloat(array[i].realPower),
                        apparentPower: parseFloat(array[i].apparentPower),
                        supplyVoltage: parseFloat(array[i].supplyVoltage)
                    });
                }
                callback({
                    status: true,
                    data: chartInfo
                })
            }else{
                callback({
                    status: false,
                    data: []
                });
            }
        })

    }
    return {
        getMeasures: function (id, callback) {
            getMeasures(id, callback);
        },
        getAverage: function (array, callback) {
            getAverage: getAverage(array, callback);
        },
        getChartInfo: function (callback) {
            getChartInfo(callback);
        }
    }
  });
})();
