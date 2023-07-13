package com.intheloop.farmcheck.repository;

import com.intheloop.farmcheck.domain.SensorData;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Collection;
import java.util.UUID;

public interface SensorDataRepository extends
        CrudRepository<SensorData, Long>,
        PagingAndSortingRepository<SensorData, Long> {
    Collection<SensorData> findAllBySensorId(UUID sensor_id);
}
