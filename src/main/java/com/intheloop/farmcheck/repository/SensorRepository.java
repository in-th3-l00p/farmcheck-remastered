package com.intheloop.farmcheck.repository;

import com.intheloop.farmcheck.domain.Farm;
import com.intheloop.farmcheck.domain.Sensor;
import org.springframework.data.repository.CrudRepository;

import java.util.Collection;
import java.util.UUID;

public interface SensorRepository extends CrudRepository<Sensor, UUID> {
    Collection<Sensor> findAllByFarm(Farm farm);
}
