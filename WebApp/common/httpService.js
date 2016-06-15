(function(){
  'use strict'

  angular.module('energyApp')
  .service('httpService',function($http){
    var th = this;

    th.getMeasures = function (id,callback){
      $http({method: 'GET', url: '/getEnergyData/' + id}).
                then(
                        function (response) {
                            callback(response);
                        },
                        function (response) {
                          callback(response);
                        }
                );
    };



  });
})();
