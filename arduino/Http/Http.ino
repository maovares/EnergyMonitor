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


byte mac[] = { 
  0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };

char server[] = "192.168.1.14";

IPAddress ip(192, 168, 1, 15);

EthernetClient client;

void setup() {
  Serial.begin(9600);
  while (!Serial) {
    ; 
  }

  // start the Ethernet connection:
  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP");
    // try to congifure using IP address instead of DHCP:
    Ethernet.begin(mac, ip);
  }
  delay(1000);
  
}

void resetEthernet() {
 client.stop();
 Ethernet.begin(mac);
}

void loop() {
  
  //Serial.println("connecting...");

  if (client.connect(server, 8080)) {
    //Serial.println("connected");    
    client.println("GET /postEnergyData/p1/1 HTTP/1.1");
    client.println("Connection: close");
    client.println();
    Serial.println("OK");
  } 
  else {
    Serial.println("connection failed");
  }
  
  resetEthernet();
  delay(1000);
}

