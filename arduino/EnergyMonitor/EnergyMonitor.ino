#include "EmonLib.h"             // Include Emon Library
EnergyMonitor emon1;             // Create an instance

void setup()
{  
  Serial.begin(9600);
  
  //emon1.voltage(2, 234.26, 1.7);  // Voltage: input pin, calibration, phase_shift
  //emon1.current(1, 111.1);       // Current: input pin, calibration.
  
  emon1.voltage(4, 234.26, 1.7);
  emon1.current(5, 28);             // Current: input pin, calibration.
}



void loop()
{
  double Irms = emon1.calcIrms(1480);  // Calculate Irms only 1480
  emon1.calcVI(20,2000); // Voltage
  
  float realPower       = emon1.realPower;        //extract Real Power into variable
  float apparentPower   = emon1.apparentPower;    //extract Apparent Power into variable
  float powerFactor     = emon1.powerFactor;      //extract Power Factor into Variable
  float supplyVoltage   = emon1.Vrms;             //extract Vrms into Variable
  //float Irms            = emon1.Irms;             //extract Irms into Variable
  
  //double Volt = emon1.readVcc();
  //emon1.serialprint();
  double Watt = Irms*supplyVoltage;
  Serial.print("Watt: ");           // Apparent power
  Serial.print(Watt);           // Apparent power
  Serial.print(" Irms: ");
  Serial.print(Irms);               // Irms
  Serial.print(" supplyVoltage: ");
  Serial.print(supplyVoltage);
  Serial.print(" realPower: ");
  Serial.print(realPower);
  Serial.print(" apparentPower: ");
  Serial.print(apparentPower);
  Serial.println();
  Serial.println("------------------------ ");       // Print out all variables
}
