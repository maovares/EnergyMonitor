(function(){
  'use strict'

  angular.module('energyApp')
    .controller('MonitorController',function(MonitorService){
      var th = this;
        th.data = {
            energyMonitor1: []
        };
        th.watts_options = {
            margin: {top: 5},
            series: [
                {
                    axis: "y",
                    dataset: "energyMonitor1",
                    key: "watts",
                    label: "Watts",
                    color: "#1f77b4",
                    type: ['line',  'area'],
                    id: 'watts'
                }
            ],
            axes: {x: {key: "x"}}
        };
        th.irms_options = {
            margin: {top: 5},
            series: [
                {
                    axis: "y",
                    dataset: "energyMonitor1",
                    key: "irms",
                    label: "Irms",
                    color: "green",
                    type: ['line', 'area'],
                    id: 'irms'
                }
            ],
            axes: {x: {key: "x"}}
        };

        th.power_comparison_options = {
            margin: {top: 5},
            series: [

                {
                    axis: "y",
                    dataset: "energyMonitor1",
                    key: "realPower",
                    label: "Real Power",
                    color: "green",
                    type: ['line', 'area'],
                    id: 'realPower'
                },
                {
                    axis: "y",
                    dataset: "energyMonitor1",
                    key: "apparentPower",
                    label: "Apparent Power",
                    color: "gray",
                    type: ['line', 'area'],
                    id: 'apparentPower'
                }
            ],
            axes: {x: {key: "x"}}
        };
        th.supplyVoltage_options = {
            margin: {top: 5},
            series: [
                {
                    axis: "y",
                    dataset: "energyMonitor1",
                    key: "supplyVoltage",
                    label: "Supply Voltage",
                    color: "brown",
                    type: ['line', 'area'],
                    id: 'supplyVoltage'
                }
            ],
            axes: {x: {key: "x"}}
        };
      th.measures = {};
      th.averageWatts = 0;
      th.averageIrms = 0;
      th.averageSupplyVoltage = 0;
      th.averageRealPower = 0;
      th.averageApparentPower = 0;
        /*
      var getMeasures = function(id, callback){
        MonitorService.getMeasures(id, function(response){
          if(response.status === 200){
            th.measures = response.data;
            console.log(th.measures);
            th.measuresNumber = th.measures.length;
            callback();
          }else {
            callback();
          }
        });
      };
        */
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
                      MonitorService.getChartInfo(function (res) {
                          if (res.status){
                              th.data.energyMonitor1 = res.data;

                              console.log(th.data.energyMonitor1);
                              getAverage( th.data.energyMonitor1);
                          }else{
                              th.data.energyMonitor1 = [];
                          }
                      });
                  }, 1000)
          };

      th.refresh();


    });

})();
