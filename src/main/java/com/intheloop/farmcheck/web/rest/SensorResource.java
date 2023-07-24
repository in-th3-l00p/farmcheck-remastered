package com.intheloop.farmcheck.web.rest;

import com.intheloop.farmcheck.service.FarmService;
import com.intheloop.farmcheck.service.SensorService;
import com.intheloop.farmcheck.utils.Constants;
import com.intheloop.farmcheck.utils.ResponseException;
import com.intheloop.farmcheck.web.rest.dto.SensorDTO;
import com.intheloop.farmcheck.web.rest.dto.SensorDataDTO;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/sensor")
public class SensorResource {
    private final SensorService sensorService;
    private final FarmService farmService;

    public SensorResource(
            SensorService sensorService,
            FarmService farmService
    ) {
        this.sensorService = sensorService;
        this.farmService = farmService;
    }

    /**
     * {@code GET /api/v1/sensor} : Get sensor info
     * @param sensorId : sensor id
     * @return status {@code 200 (OK)} and body {@link SensorDTO}
     */
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getSensorInfo(
            @RequestParam("sensorId") String sensorId
    ) {
        try {
            var uuid = UUID.fromString(sensorId);
            return ResponseEntity.ok(new SensorDTO(sensorService.get(uuid)));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid sensor id");
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code GET /api/v1/sensor/farm} : Get farm sensors
     * @param farmId : farm id
     * @param page : page number
     * @return status {@code 200 (OK)} and body {@link SensorDTO}
     */
    @GetMapping(
            value = "/farm",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getFarmSensors(
            @RequestParam("farmId") Long farmId,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "pageSize", defaultValue = Constants.PAGE_SIZE) int pageSize
    ) {
        try {
            return ResponseEntity.ok(sensorService
                    .getFarmSensors(farmService.get(farmId), page, pageSize)
                    .stream()
                    .map(SensorDTO::new)
                    .toList()
            );
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code GET /api/v1/sensor/farm/count} : Get farm sensors count
     * @param farmId : farm id
     * @return status {@code 200 (OK)} and body {@link SensorDTO}
     */
    @GetMapping("/farm/count")
    public ResponseEntity<?> countFarmSensors(
            @RequestParam("farmId") Long farmId
    ) {
        try {
            return ResponseEntity.ok(
                    sensorService.countFarmSensors(farmService.get(farmId))
            );
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code GET /api/v1/sensor/data} : Get sensor data
     * @param sensorId : sensor id
     * @param page : page number
     * @return status {@code 200 (OK)} and body {@link java.util.List<SensorDataDTO>}
     */
    @GetMapping(
            value = "/data",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getSensorData(
            @RequestParam("sensorId") String sensorId,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "pageSize", defaultValue = Constants.PAGE_SIZE) int pageSize
    ) {
        try {
            var uuid = UUID.fromString(sensorId);
            return ResponseEntity.ok(sensorService
                    .getSensorData(sensorService.get(uuid), page, pageSize)
                    .stream()
                    .map(SensorDataDTO::new)
                    .toList()
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid sensor id");
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    @GetMapping("/data/count")
    public ResponseEntity<?> countSensorData(
            @RequestParam("sensorId") String sensorId
    ) {
        try {
            var uuid = UUID.fromString(sensorId);
            return ResponseEntity.ok(sensorService.countSensorData(
                    sensorService.get(uuid)
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid sensor id");
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code POST /api/v1/sensor} : Create sensor
     * @param farmId : farm id
     * @param sensorDTO : sensor data
     * @return status {@code 200 (OK)}
     */
    @PostMapping(
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> create(
            @RequestParam("farmId") Long farmId,
            @RequestBody SensorDTO sensorDTO
    ) {
        try {
            var farm = farmService.get(farmId);
            sensorService.create(
                    sensorDTO.getName(),
                    sensorDTO.getDescription(),
                    farm
            );
            return ResponseEntity.ok().build();
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code POST /api/v1/sensor/data} : Submit sensor data
     * @param sensorId : sensor id
     * @param sensorDataDTO : sensor data
     * @return status {@code 200 (OK)}
     */
    @PostMapping(
            value = "/data",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @SendTo("/topic/sensorData/{sensorId}")
    public ResponseEntity<?> submitPostData(
            @RequestParam("sensorId") @DestinationVariable String sensorId,
            @RequestBody SensorDataDTO sensorDataDTO
    ) {
        try {
            var uuid = UUID.fromString(sensorId);
            return ResponseEntity.ok(new SensorDataDTO(
                    sensorService.addSensorData(
                            sensorService.get(uuid),
                            sensorDataDTO.getSoilMoisture(),
                            sensorDataDTO.getSoilTemperature(),
                            sensorDataDTO.getAirTemperature(),
                            sensorDataDTO.getAirHumidity(),
                            sensorDataDTO.getLongitude(),
                            sensorDataDTO.getLatitude()
                    )
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid sensor id");
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code PUT /api/v1/sensor} : Update sensor
     * @param sensorId : sensor id
     * @param sensorDTO : sensor data
     * @return status {@code 200 (OK)}
     */
    @PutMapping(
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> update(
            @RequestParam("sensorId") String sensorId,
            @RequestBody SensorDTO sensorDTO
    ) {
        try {
            var uuid = UUID.fromString(sensorId);
            sensorService.update(
                    sensorService.get(uuid),
                    sensorDTO.getName(),
                    sensorDTO.getDescription()
            );
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid sensor id");
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code DELETE /api/v1/sensor} : Delete sensor
     * @param sensorId : sensor id
     * @return status {@code 200 (OK)}
     */
    @DeleteMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> delete(
            @RequestParam("sensorId") String sensorId
    ) {
        try {
            var uuid = UUID.fromString(sensorId);
            sensorService.delete(sensorService.get(uuid));
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid sensor id");
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }
}
