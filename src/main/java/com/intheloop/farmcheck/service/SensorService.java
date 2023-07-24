package com.intheloop.farmcheck.service;

import com.intheloop.farmcheck.domain.Farm;
import com.intheloop.farmcheck.domain.Sensor;
import com.intheloop.farmcheck.domain.SensorData;

import java.util.Collection;
import java.util.UUID;

public interface SensorService {
    void create(String name, String description, Farm farm);
    Sensor get(UUID id);
    Collection<Sensor> getFarmSensors(Farm farm, int page, int pageSize);
    int countFarmSensors(Farm farm);
    Collection<SensorData> getSensorData(Sensor sensor, int page, int pageSize);
    int countSensorData(Sensor sensor);
    SensorData addSensorData(
            Sensor sensor,
            Double soilMoisture,
            Double soilTemperature,
            Double airTemperature,
            Double airHumidity,
            Double longitude,
            Double latitude
            );
    void update(Sensor sensor, String name, String description);
    void delete(Sensor sensor);
}
