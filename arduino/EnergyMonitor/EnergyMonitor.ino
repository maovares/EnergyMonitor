

#include "EmonLib.h" // Incluye la libreria

EnergyMonitor emon1; // Crea una instancia 
void setup() 
{ 
  Serial.begin(9600); 
  emon1.voltage(2, 234.26, 1.7);
  emon1.current(1, 60.606); // Configuración: entrada Pin Analógico, calibracion. 
}


void loop() 
{ 
  double Irms = emon1.calcIrms(1480); 
  Serial.println(Irms); // Irms 
  
  //emon1.calcVI(20,2000);         // Calculate all. No.of wavelengths, time-out
  //emon1.serialprint(); 
  
}
