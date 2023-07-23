#ifndef _HARDWARE_H_
#define _HARDWARE_H_

#include <OneWire.h>
#include <DallasTemperature.h>
#include <TinyGPS++.h>
#include <HardwareSerial.h>
#include "DHT.h"

namespace Hardware {
class MoistureSensor {
  double moisture;
  int pin;
public:
  MoistureSensor(int pin) {
    this->pin = pin;
  }

  void read() {
    moisture = analogRead(pin);
    moisture = (moisture / 3300) * 100;
    moisture = 100 - moisture;
  }

  double value() {
    return moisture;
  }
};

class TemperatureSensor {
  double temperature;
  OneWire *oneWire;
  DallasTemperature *sensor;
public:
  TemperatureSensor(int pin) {
    oneWire = new OneWire(pin);
    sensor = new DallasTemperature(oneWire);
  }

  void read() {
    temperature = sensor->getTempCByIndex(0);
  }

  double value() {
    return temperature;
  }
};

class HumiditySensor {
  double temperature;
  double humidity;
  DHT *dht;
public:
  HumiditySensor(int pin) {
    dht = new DHT(pin, DHT21);
    dht->begin();
  }

  void read() {
    temperature = dht->readTemperature();
    humidity = dht->readHumidity();
  }

  std::pair<double, double> value() {
    return { humidity, temperature };
  }
};

class GPS {
  double longitude;
  double latitude;
  TinyGPSPlus *gps;
  HardwareSerial *gpsSerial;
public:
  GPS(int serial) {
    gpsSerial = new HardwareSerial(serial);
    gpsSerial->begin(115200);
    gps = new TinyGPSPlus();
  }

  void read() {
    if (gpsSerial->available() > 0) {
      if (gps->encode(gpsSerial->read())) {
        delay(10);
        if (gps->location.isValid())
          longitude = gps->location.lng(), latitude = gps->location.lat();
      } else Serial.println("GPS not working");

      if (gps->charsProcessed() < 10) Serial.println("No GPS");
    } else Serial.println("Serial not working");
  }

  std::pair<double, double> value() {
    return { longitude, latitude };
  }
};

class RGB {
int redPin, greenPin, bluePin;
public:
  RGB(int redPin, int greenPin, int bluePin) {
    this->redPin = redPin;
    this->greenPin = greenPin;
    this->bluePin = bluePin;

    pinMode(redPin, OUTPUT);
    pinMode(greenPin, OUTPUT);
    pinMode(bluePin, OUTPUT);
  }

  void setColor(int redValue, int greenValue, int blueValue) {
    analogWrite(redPin, redValue);
    analogWrite(greenPin, greenValue);
    analogWrite(bluePin, blueValue);
  }
};
}

#endif