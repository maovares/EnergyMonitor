(function(){
  'use strict'

  angular.module('energyApp',[
    'ui.router'
  ]);

  angular.module('energyApp')
  .config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/monitor');
    $stateProvider
      .state('monitor',{
        url:'/monitor',
        templateUrl:'app/monitor/monitor.html',
        controller:'MonitorController',
        controllerAs:'monitor'
      });


  });

})();
