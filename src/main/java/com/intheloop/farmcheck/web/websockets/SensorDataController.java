package com.intheloop.farmcheck.web.websockets;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
public class SensorDataController {
    @MessageMapping("/sensorData/{sensorId}")
    public void receiveSensorData(String sensorId) {

    }

}
