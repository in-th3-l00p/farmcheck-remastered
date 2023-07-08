package com.intheloop.farmcheck.repository;

import com.intheloop.farmcheck.domain.Task;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface TaskRepository extends
        CrudRepository<Task, Long>,
        PagingAndSortingRepository<Task, Long> {
}
