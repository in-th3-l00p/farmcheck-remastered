package com.intheloop.farmcheck.repository;

import com.intheloop.farmcheck.domain.Farm;
import com.intheloop.farmcheck.domain.Sensor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface SensorRepository extends CrudRepository<Sensor, UUID> {
    List<Sensor> findAllByFarm(Farm farm, Pageable pageable);
    int countAllByFarm(Farm farm);
}
