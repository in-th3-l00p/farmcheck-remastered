package com.intheloop.farmcheck.repository;

import com.intheloop.farmcheck.domain.TaskUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface TaskUserRepository extends
        CrudRepository<TaskUser, Long>,
        PagingAndSortingRepository<TaskUser, Long> {
}
