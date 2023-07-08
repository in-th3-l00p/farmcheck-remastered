package com.intheloop.farmcheck.repository;

import com.intheloop.farmcheck.domain.Farm;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface FarmRepository extends
        CrudRepository<Farm, Long>,
        PagingAndSortingRepository<Farm, Long> {
    Optional<Farm> findByName(String name);
}
