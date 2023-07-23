#include <memory>
#include "controller.h"
#include "rf.h"

std::unique_ptr<com::Transmitter> transmitter;
std::unique_ptr<Control::Controller> controller;

void setup() {
  Serial.begin(115200);

  transmitter = std::unique_ptr<com::Transmitter>(new com::Transmitter(25));
  controller = std::unique_ptr<Control::Controller>(new Control::Controller(
    32, 27, 26, 2, 19, 23, 15
  ));

  delay(5000);
}

void loop() {
  controller->readData();
  delay(250);
  transmitter->send(controller->getData());
  delay(1000);
}