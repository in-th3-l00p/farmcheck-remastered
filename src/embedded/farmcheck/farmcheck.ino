#include <memory>
#include <WiFiManager.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include "storage.h"
#include "controller.h"
#include "rf.h"

std::unique_ptr<com::Transmitter> transmitter;
std::unique_ptr<Control::Controller> controller;
std::unique_ptr<Memory::Storage> storage;

char jsonOutput[256];
bool sendData = false;
String url = "http://1e6c-37-251-220-191.ngrok-free.app";
WiFiManager wifiManager;

void setup() {
  Serial.begin(115200);

  transmitter = std::unique_ptr<com::Transmitter>(new com::Transmitter(25));
  controller = std::unique_ptr<Control::Controller>(new Control::Controller(
    32, 27, 26, 2, 19, 23, 15
  ));
  storage = std::unique_ptr<Memory::Storage>(new Memory::Storage());

  controller->rgb->setColor(255, 75, 0);

  storage->read();
  
  Serial.print("Token: ");
  Serial.println(storage->getToken());

  wifiManager.resetSettings();

  wifiManager.setConnectTimeout(240);
  WiFiManagerParameter tokenField("token", "Token", "", 50);
  wifiManager.addParameter(&tokenField);
  bool connection = wifiManager.autoConnect("FarmCheck Sensor");

  controller->rgb->setColor(0, 0, 255);

  if (!connection) {
    Serial.println("Failed to connect");
    controller->rgb->setColor(255, 0, 0);
    delay(1000);
    ESP.restart();
  } else {
    storage->setToken(tokenField.getValue());
    
    if (storage->getToken() == "")
      storage->read();
    else
      storage->write(tokenField.getValue());

    Serial.print("Token: ");
    Serial.println(storage->getToken());

    Serial.println("connected... :)");
  }
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {  
    controller->readData();
    controller->getData().print();
    delay(250);

    HTTPClient client;

    client.begin(url + "/api/v1/sensor/data?sensorId=" + storage->getToken());
    client.addHeader("Content-Type", "application/json");

    const size_t CAPACITY = JSON_OBJECT_SIZE(6);
    StaticJsonDocument<CAPACITY> doc;

    JsonObject object = doc.to<JsonObject>();
    object["soilMoisture"] = controller->getData().moisture;
    object["soilTemperature"] = controller->getData().temperature;
    object["airHumidity"] = controller->getData().humidity;
    object["airTemperature"] = controller->getData().temperatureAir;
    object["latitude"] = controller->getData().latitude;
    object["longitude"] = controller->getData().longitude;

    serializeJson(doc, jsonOutput);
    int httpCode = client.POST(String(jsonOutput));

    Serial.println(httpCode);
    if (httpCode == 404) {
      wifiManager.resetSettings();
      ESP.restart();
    }

    if (httpCode > 0) {
      controller->rgb->setColor(0, 255, 0);
      String payload = client.getString();
      Serial.println("\nStatus code: " + String(httpCode));
      Serial.println(payload);
      client.end();
    } else {
      Serial.println("Error on HTTP request");
      controller->rgb->setColor(255, 0, 255);
    }
  } else {
    Serial.println("Not connected");
  }
  delay(1000);
}