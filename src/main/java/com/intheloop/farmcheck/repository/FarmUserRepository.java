package com.intheloop.farmcheck.repository;

import com.intheloop.farmcheck.domain.Farm;
import com.intheloop.farmcheck.domain.FarmUser;
import com.intheloop.farmcheck.domain.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface FarmUserRepository extends CrudRepository<FarmUser, Long> {
    Optional<FarmUser> findByFarmAndUser(Farm farm, User user);
    List<FarmUser> findAllByFarm(Farm farm, Pageable pageable);
    List<FarmUser> findAllByUser(User user, Pageable pageable);
    int countAllByUser(User user);
    int countAllByFarm(Farm farm);
}
