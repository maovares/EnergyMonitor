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
char server[] = "192.168.1.14";
IPAddress ip(192, 168, 1, 15);
EthernetClient client;

///////////////////////////////// EnergyMonitor
EnergyMonitor emon1;
String idEmon1 = "p1";
String text = "";
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
  emon1.voltage(2, 234.26, 1.7);
  emon1.current(1, 60.606); // Configuración: entrada Pin Analógico, calibracion. 
  
  delay(1000);
  
}

void resetEthernet() {
 client.stop();
 //Ethernet.begin(mac);
}

void loop() {
  
  double Irms = emon1.calcIrms(1480); 
  //Serial.println(Irms); // Irms
  static char strIrms[15];  
  dtostrf(Irms, 7, 4, strIrms);
  String str(strIrms);
  text = str.substring(1,str.length()-1);
  Serial.println(str);
  

  if (client.connect(server, 8080)) {
    
    client.println("GET /postEnergyData/"+idEmon1+"/"+text+" HTTP/1.1");
    client.println("Connection: close");
    client.println();
    
    
    //Serial.println("GET /postEnergyData/"+idEmon1+"/"+text+" HTTP/1.1");
  } 
  else {
    Serial.println("connection failed");
  }
  
  resetEthernet();
  //delay(1000);
}

