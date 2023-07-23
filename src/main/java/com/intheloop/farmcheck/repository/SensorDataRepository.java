package com.intheloop.farmcheck.repository;

import com.intheloop.farmcheck.domain.SensorData;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SensorDataRepository extends
        CrudRepository<SensorData, Long>,
        PagingAndSortingRepository<SensorData, Long> {
    List<SensorData> findAllBySensorId(String sensorId);
    List<SensorData> findAllBySensorId(String sensorId, Pageable pageable);
    int countAllBySensorId(String sensorId);
}
