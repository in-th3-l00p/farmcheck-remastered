package com.intheloop.farmcheck.repository;

import com.intheloop.farmcheck.domain.Chat;
import com.intheloop.farmcheck.domain.Farm;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ChatRepository extends CrudRepository<Chat, Long> {
    List<Chat> findAllByFarm(Farm farm, Pageable pageable);
}
