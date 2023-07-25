#ifndef _CONTROLLER_H_
#define _CONTROLLER_H_

#include "hardware.h"
#include "rf.h"

namespace Control {
  class Controller {
  private:
    std::unique_ptr<Hardware::MoistureSensor> moistureSensor;
    std::unique_ptr<Hardware::TemperatureSensor> temperatureSensor;
    std::unique_ptr<Hardware::HumiditySensor> humiditySensor;
    std::unique_ptr<Hardware::GPS> gps;

  public:
    std::unique_ptr<Hardware::RGB> rgb;

    Controller(
      int moisturePin,
      int temperaturePin,
      int humidityPin,
      int gpsSerial,
      int redPin,
      int greenPin,
      int bluePin
    ):
      moistureSensor(new Hardware::MoistureSensor(moisturePin)),
      temperatureSensor(new Hardware::TemperatureSensor(temperaturePin)),
      humiditySensor(new Hardware::HumiditySensor(humidityPin)),
      gps(new Hardware::GPS(gpsSerial)),
      rgb(new Hardware::RGB(redPin, greenPin, bluePin))
    { }

    void readData() {
      moistureSensor->read();
      temperatureSensor->read();
      humiditySensor->read();
      gps->read();

      // if ((moistureSensor->value() < 0 || moistureSensor->value() > 99)
      //   || temperatureSensor->value() < 0
      //   || (humiditySensor->value().first < 5)
      // )
      //   rgb->setColor(255, 0, 0);
      // else if (gps->value().first < 1)
      //   rgb->setColor(0, 0, 255);
      // else
      //   rgb->setColor(0, 255, 0);
    }

    com::Data getData() {
      com::Data data;
      data.moisture = moistureSensor->value();
      data.temperature = temperatureSensor->value();
      data.humidity = humiditySensor->value().first;
      data.temperatureAir = humiditySensor->value().second;
      data.longitude = gps->value().first;
      data.latitude = gps->value().second;
      return data;
    }
  };
}

#endif