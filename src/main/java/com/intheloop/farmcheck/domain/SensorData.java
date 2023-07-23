package com.intheloop.farmcheck.domain;

import jakarta.persistence.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.time.LocalDateTime;

@RedisHash("SensorData")
public class SensorData {
    @Id private Long id;
    private Double soilMoisture;
    private Double soilTemperature;
    private Double airHumidity;
    private Double airTemperature;
    private Double longitude;
    private Double latitude;
    private LocalDateTime createdAt = LocalDateTime.now();

    @Indexed
    private String sensorId;

    public SensorData() {
    }

    public SensorData(
            Double soilMoisture,
            Double soilTemperature,
            Double airHumidity,
            Double airTemperature,
            Double longitude,
            Double latitude,
            String sensorId
    ) {
        this.soilMoisture = soilMoisture;
        this.soilTemperature = soilTemperature;
        this.airHumidity = airHumidity;
        this.airTemperature = airTemperature;
        this.longitude = longitude;
        this.latitude = latitude;
        this.sensorId = sensorId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getSoilMoisture() {
        return soilMoisture;
    }

    public void setSoilMoisture(Double soilMoisture) {
        this.soilMoisture = soilMoisture;
    }

    public Double getSoilTemperature() {
        return soilTemperature;
    }

    public void setSoilTemperature(Double soilTemperature) {
        this.soilTemperature = soilTemperature;
    }

    public Double getAirHumidity() {
        return airHumidity;
    }

    public void setAirHumidity(Double airHumidity) {
        this.airHumidity = airHumidity;
    }

    public Double getAirTemperature() {
        return airTemperature;
    }

    public void setAirTemperature(Double airTemperature) {
        this.airTemperature = airTemperature;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getSensorId() {
        return sensorId;
    }

    public void setSensorId(String sensorId) {
        this.sensorId = sensorId;
    }
}
