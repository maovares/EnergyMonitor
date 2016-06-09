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



  });
})();
