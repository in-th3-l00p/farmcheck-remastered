package com.intheloop.farmcheck.repository;

import com.intheloop.farmcheck.domain.Farm;
import com.intheloop.farmcheck.domain.Task;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface TaskRepository extends
        CrudRepository<Task, Long>,
        PagingAndSortingRepository<Task, Long> {
    List<Task> findAllByFarm(Farm farm, Pageable pageable);
}
