(function(){
  'use strict'

  angular.module('energyApp')
    .controller('MonitorController',function(MonitorService){
      var th = this;

      th.measures = {};
      th.averageWatts = 0;
      th.averageIrms = 0;
      th.averageSupplyVoltage = 0;
      th.averageRealPower = 0;
      th.averageApparentPower = 0;

      var getMeasures = function(id, callback){
        MonitorService.getMeasures(id, function(response){
          if(response.status === 200){
            th.measures = response.data;
            th.measuresNumber = th.measures.length;
            callback();
          }else {
            callback();
          }
        });
      };

      var getAverage = function(array){
        MonitorService.getAverage(array,function(response){
          if(response.status){
            th.averageWatts = response.averageWatts;
            th.averageIrms = response.averageIrms;
            th.averageSupplyVoltage = response.averageSupplyVoltage;
            th.averageRealPower = response.averageRealPower;
            th.averageApparentPower = response.averageApparentPower;
          }else {

          }

        });
      };


      th.refresh = function(){
                  setInterval(function(){
                      getMeasures("p1",function(){
                        getAverage(th.measures);
                      });
                  },5000)
          };

      th.refresh();


    });

})();
