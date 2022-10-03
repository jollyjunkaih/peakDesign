#include <Wire.h>
#include <ArduinoJson.h>

const int control1 = A1;
const int control2 = A2;
const int control3 = A3;
const int dig1 = 2;
const int dig2 = 3;
const int dig3 = 4;
const int dig4 = 5;
const int dig5 = 6;
const int dig6 = 7;
const int thres1 = 256;
const int thres2 = 512;
const int thres3 = 768;
const int thres4 = 1024;
const bool pushButton = true;
const int pushButtonPin = 11;
int controlOut(int controlpin, int control);
void setup() {
  // put your setup code for core 0 here, to run once:
  Wire.begin(8);                // join i2c bus with address #8
 Wire.onRequest(requestEvent); // register event
  pinMode(pushButtonPin, INPUT);
  pinMode(control1, INPUT);
  pinMode(control2, INPUT);
  pinMode(control3, INPUT);
  pinMode(dig1, OUTPUT);
  pinMode(dig2, OUTPUT);
  pinMode(dig3, OUTPUT);
  pinMode(dig4, OUTPUT);
  pinMode(dig5, OUTPUT);
  pinMode(dig6, OUTPUT);
  digitalWrite(SS, HIGH);
  Serial.begin(9600);
}

void requestEvent()
{
  int pushing = digitalRead(pushButtonPin);
  if (pushing){
  String number1 = getnum(control1,1);
  String number2 = getnum(control2,2);
  String totalnum = number1 + "|" + number2;
  Wire.write(totalnum.c_str());
  Serial.println(totalnum);
  }
}

String getnum(int controlpin, int num) {
  String number1 = "";
  int a = controlOut(controlpin, num);
  if (a < 10){
    number1 = "000" + String(a);
  } else if (a < 100) {
    number1 = "00" + String(a);
  } else if (a < 1000) {
    number1 = "0" +  String(a);
  } else {
    number1 = String(a);
   }
   return number1;
}

void loop() {
  // put your main code for core 0 here, to run repeatedly:
  int a = controlOut(control1, 1);
  if (a < thres1) {
    digitalWrite(dig1,LOW); digitalWrite(dig2,LOW);  digitalWrite(dig3,LOW);   
  } else if (a < thres2) {
    digitalWrite(dig1,HIGH); digitalWrite(dig2,LOW);  digitalWrite(dig3,LOW);  
  }else if (a < thres3) {
    digitalWrite(dig1,HIGH); digitalWrite(dig2,HIGH);  digitalWrite(dig3,LOW);  
  }else {
    digitalWrite(dig1,HIGH); digitalWrite(dig2,HIGH);  digitalWrite(dig3,HIGH);  
  }
  int b = controlOut(control2, 2);
  if (b < thres1) {
    
    digitalWrite(dig4,LOW); digitalWrite(dig5,LOW);  digitalWrite(dig6,LOW);   
  } else if (b < thres2) {
    digitalWrite(dig4,HIGH); digitalWrite(dig5,LOW);  digitalWrite(dig6,LOW);  
  }else if (b < thres3) {
    digitalWrite(dig4,HIGH); digitalWrite(dig5,HIGH);  digitalWrite(dig6,LOW);  
  }else {
    digitalWrite(dig4,HIGH); digitalWrite(dig5,HIGH);  digitalWrite(dig6,HIGH);  
  }
//  Serial.println(a);
//  Serial.println(b);
  
//  if (!pushing){
//    Serial.println("\"{\"energy1\":"+ String(a) + "}\"");
//  }
  
}

int controlOut(int controlpin, int control){
  int a = analogRead(controlpin);
//  Serial.print("Control Pin " + String(control) + " :");
//  Serial.println(a);
  a = 1024 - a;
  return a;
 }
