package com.intheloop.farmcheck.service.impl;

import com.intheloop.farmcheck.domain.Farm;
import com.intheloop.farmcheck.domain.FarmUser;
import com.intheloop.farmcheck.domain.Sensor;
import com.intheloop.farmcheck.domain.SensorData;
import com.intheloop.farmcheck.repository.FarmUserRepository;
import com.intheloop.farmcheck.repository.SensorDataRepository;
import com.intheloop.farmcheck.repository.SensorRepository;
import com.intheloop.farmcheck.security.AuthenticationUtils;
import com.intheloop.farmcheck.service.SensorService;
import com.intheloop.farmcheck.utils.ResponseException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.UUID;

@Service
public class SensorServiceImpl implements SensorService {
    private final SensorRepository sensorRepository;
    private final SensorDataRepository sensorDataRepository;
    private final FarmUserRepository farmUserRepository;
    private final AuthenticationUtils authenticationUtils;

    public SensorServiceImpl(
            SensorRepository sensorRepository,
            SensorDataRepository sensorDataRepository,
            FarmUserRepository farmUserRepository,
            AuthenticationUtils authenticationUtils
    ) {
        this.sensorRepository = sensorRepository;
        this.sensorDataRepository = sensorDataRepository;
        this.farmUserRepository = farmUserRepository;
        this.authenticationUtils = authenticationUtils;
    }

    @Override
    public void create(String name, String description, Farm farm) {
        if (name.length() == 0)
            throw new ResponseException("Sensor name cannot be empty.");
        var currentFarmUser = farmUserRepository.findByFarmAndUser(
                farm, authenticationUtils.getAuthentication()
        );
        if (
                currentFarmUser.isEmpty() ||
                currentFarmUser.get().getUserRole() == FarmUser.UserRole.WORKER
        )
            throw FarmServiceImpl.UNAUTHORIZED;
        var sensor = new Sensor(name, description, farm);
        sensorRepository.save(sensor);
    }

    @Override
    public Sensor get(UUID id) {
        var sensor = sensorRepository.findById(id);
        if (sensor.isEmpty())
            throw new ResponseException("Sensor not found.", HttpStatus.NOT_FOUND);
        return sensor.get();
    }

    @Override
    public Collection<Sensor> getFarmSensors(Farm farm, int page) {
        var currentFarmUser = farmUserRepository.findByFarmAndUser(
                farm, authenticationUtils.getAuthentication()
        );
        if (currentFarmUser.isEmpty())
            throw FarmServiceImpl.UNAUTHORIZED;
        return sensorRepository.findAllByFarm(farm);
    }

    @Override
    public Collection<SensorData> getSensorData(Sensor sensor, int page) {
        return sensorDataRepository.findAllBySensorId(sensor.getId());
    }

    @Override
    public void addSensorData(
            Sensor sensor,
            Double soilMoisture,
            Double soilTemperature,
            Double airTemperature,
            Double airHumidity,
            Double longitude,
            Double latitude
    ) {
        var sensorData = new SensorData(
                soilMoisture,
                soilTemperature,
                airTemperature,
                airHumidity,
                longitude,
                latitude,
                sensor
        );
        sensorDataRepository.save(sensorData);
    }

    @Override
    public void update(Sensor sensor, String name, String description) {
        if (name.length() == 0)
            throw new ResponseException("Sensor name cannot be empty.");
        var currentFarmUser = farmUserRepository.findByFarmAndUser(
                sensor.getFarm(), authenticationUtils.getAuthentication()
        );
        if (
                currentFarmUser.isEmpty() ||
                        currentFarmUser.get().getUserRole() == FarmUser.UserRole.WORKER
        )
            throw FarmServiceImpl.UNAUTHORIZED;
        sensor.setName(name);
        sensor.setDescription(description);
    }

    @Override
    public void delete(Sensor sensor) {
        var currentFarmUser = farmUserRepository.findByFarmAndUser(
                sensor.getFarm(), authenticationUtils.getAuthentication()
        );
        if (
                currentFarmUser.isEmpty() ||
                currentFarmUser.get().getUserRole() == FarmUser.UserRole.WORKER
        )
            throw FarmServiceImpl.UNAUTHORIZED;
        sensorDataRepository.deleteAll(sensorDataRepository
                .findAllBySensorId(sensor.getId())
        );
        sensorRepository.delete(sensor);
    }
}
