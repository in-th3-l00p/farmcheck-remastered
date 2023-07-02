package com.intheloop.farmcheck.repository;

import com.intheloop.farmcheck.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface UserRepository extends
        CrudRepository<User, Long>,
        PagingAndSortingRepository<User, Long>
{
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    Optional<User> findByUsername(String username);
}
