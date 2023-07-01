package com.intheloop.farmcheck.repository;

import com.intheloop.farmcheck.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserRepository extends
        CrudRepository<User, Long>,
        PagingAndSortingRepository<User, Long>
{
}
