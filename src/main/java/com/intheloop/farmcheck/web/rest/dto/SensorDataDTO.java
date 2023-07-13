package com.intheloop.farmcheck.web.rest.dto;

import com.intheloop.farmcheck.domain.SensorData;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link com.intheloop.farmcheck.domain.SensorData}
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SensorDataDTO implements Serializable {
    private Double soilMoisture;
    private Double soilTemperature;
    private Double airHumidity;
    private Double airTemperature;
    private Double longitude;
    private Double latitude;
    private LocalDateTime createdAt;

    public SensorDataDTO(SensorData sensorData) {
        this.soilMoisture = sensorData.getSoilMoisture();
        this.soilTemperature = sensorData.getSoilTemperature();
        this.airHumidity = sensorData.getAirHumidity();
        this.airTemperature = sensorData.getAirTemperature();
        this.longitude = sensorData.getLongitude();
        this.latitude = sensorData.getLatitude();
        this.createdAt = sensorData.getCreatedAt();
    }
}