package com.intheloop.farmcheck.web.rest.dto;


import com.intheloop.farmcheck.domain.Sensor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

/**
 * DTO for {@link com.intheloop.farmcheck.domain.Sensor}
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SensorDTO implements Serializable {
    private UUID id;
    private String name;
    private String description;

    public SensorDTO(Sensor sensor) {
        this.id = sensor.getId();
        this.name = sensor.getName();
        this.description = sensor.getDescription();
    }
}