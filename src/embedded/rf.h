#ifndef _RF_H_
#define _RF_H_

#include <cstring>
#include <RH_ASK.h>
#include <SPI.h>

namespace com {
  struct Data {
    double moisture, temperature, humidity, temperatureAir, longitude, latitude;

    static char* serialize(const Data& data) {
      char* buffer = new char[sizeof(double) * 6];

      memset(buffer, 0, sizeof(buffer));

      Serial.println(strlen(buffer));

      std::memcpy(buffer + (0 * sizeof(double)), &data.moisture, sizeof(double));
      std::memcpy(buffer + (1 * sizeof(double)), &data.temperature, sizeof(double));
      std::memcpy(buffer + (2 * sizeof(double)), &data.humidity, sizeof(double));
      std::memcpy(buffer + (3 * sizeof(double)), &data.temperatureAir, sizeof(double));
      std::memcpy(buffer + (4 * sizeof(double)), &data.longitude, sizeof(double));
      std::memcpy(buffer + (5 * sizeof(double)), &data.latitude, sizeof(double));

      Serial.println(buffer);
      Serial.println(strlen(buffer));

      return buffer;
    }
  };

  class Transmitter {
    RH_ASK* rfDriver;
  public:
    Transmitter(int pin) {
      rfDriver = new RH_ASK(2000, 25, 14);

      rfDriver->init();
    }

    void send(const Data& data) {
      char* buffer = Data::serialize(data);

      Serial.print("Moisture: ");
      Serial.println(data.moisture);
      Serial.print("Temperature: ");
      Serial.println(data.temperature);
      Serial.print("Humidity: ");
      Serial.println(data.humidity);
      Serial.print("Temperature air: ");
      Serial.println(data.temperatureAir);
      Serial.print("Longitude: ");
      Serial.println(data.longitude);
      Serial.print("Latitude: ");
      Serial.println(data.latitude);

      rfDriver->send((uint8_t *)buffer, strlen(buffer));
      rfDriver->waitPacketSent();
      Serial.print("Buffer: ");
      Serial.println(strlen(buffer));

      Serial.println();
    }
  };
}

#endif