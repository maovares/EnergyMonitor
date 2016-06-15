(function(){
  'use strict'

  angular.module('energyApp',
      ['ui.router', 'n3-line-chart']);

  angular.module('energyApp')
  .config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/monitor');
    $stateProvider
      .state('monitor',{
        url:'/monitor',
        templateUrl:'monitor/monitor.html',
        controller:'MonitorController',
        controllerAs:'monitor'
      });


  });

})();
