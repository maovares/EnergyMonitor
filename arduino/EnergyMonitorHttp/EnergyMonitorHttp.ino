/*
  Web client
 
 This sketch connects to a website (http://www.google.com)
 using an Arduino Wiznet Ethernet shield.
 
 Circuit:
 * Ethernet shield attached to pins 10, 11, 12, 13
 
 created 18 Dec 2009
 by David A. Mellis
 modified 9 Apr 2012
 by Tom Igoe, based on work by Adrian McEwen
 
 modified 4 June 2016
 by Marcos Rodrguez
 
 */

#include <SPI.h>
#include <Ethernet.h>
#include "EmonLib.h"


//////////////////////////////////  Ethernet
byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
char server[] = "172.24.2.95";
IPAddress ip(172, 24, 2, 250);
EthernetClient client;

///////////////////////////////// EnergyMonitor
EnergyMonitor emon1;
String idEmon1 = "p1";
/////////////////////////////////

void setup() {
  Serial.begin(9600);
  while (!Serial) {
    ; 
  }

  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP");
    Ethernet.begin(mac, ip);
  }
  
  ///////////////////////////////// EnergyMonitor
  Serial.begin(9600);
  
  //emon1.voltage(2, 234.26, 1.7);  // Voltage: input pin, calibration, phase_shift
  //emon1.current(1, 111.1);       // Current: input pin, calibration.
  
  emon1.voltage(4, 234.26, 1.7);
  emon1.current(5, 28);             // Current: input pin, calibration.
  delay(1000);
  
}

void resetEthernet() {
 client.stop();
 //Ethernet.begin(mac);
}


String toStr(double num){
  static char str[15];  
  dtostrf(num, 12,3, str);
  String text(str);
  text = text.substring(1,text.length()-1);
  text.replace(" ", "");
  return text;
}

String toStr(float num){
  static char str[15];  
  dtostrf(num, 12,3, str);
  String text(str);
  text = text.substring(1,text.length()-1);
  text.replace(" ", "");
  return text;
}

void loop() {
 
  double Irms = emon1.calcIrms(1480);  // Calculate Irms only 1480
  emon1.calcVI(20,2000); // Voltage
  
  float realPower       = emon1.realPower;        //extract Real Power into variable
  float apparentPower   = emon1.apparentPower;    //extract Apparent Power into variable
  float powerFactor     = emon1.powerFactor;      //extract Power Factor into Variable
  float supplyVoltage   = emon1.Vrms;             //extract Vrms into Variable
  double Watt = Irms*supplyVoltage;
  
  Serial.println("Watt: "+ toStr(Watt)+" Irms: "+toStr(Irms)+" supplyVoltage: "+toStr(supplyVoltage)+" realPower: "+toStr(realPower)+" apparentPower: "+toStr(apparentPower));
 

  if (client.connect(server, 8080)) {
    
      client.println("GET /postEnergyData/"+idEmon1+"/"+toStr(Watt)+"/"+toStr(Irms)+"/"+toStr(supplyVoltage)+"/"+toStr(realPower)+"/"+toStr(apparentPower)+" HTTP/1.1");
    client.println("Connection: close");
    client.println();
    
  } 
  else {
    Serial.println("connection failed");
  }

  Serial.println("------------------------ ");       // Printed all
  resetEthernet(); 
  // delay(3000);
}

