(function(){
  'use strict'

  angular.module('energyApp')
    .controller('MonitorController',function(MonitorService){
      var th = this;

      th.measures = {};
      th.measuresNumber = 0;

      var getMeasures = function(id){
        MonitorService.getMeasures(id, function(response){
          if(response.status === 200){
            th.measures = response.data;
            th.measuresNumber = th.measures.length;
          }else {
            //Error
          }
        });
      };

      th.refresh = function(){
                  setInterval(function(){
                      getMeasures("p1");
                  },5000)
          };

      th.refresh();


    });

})();
