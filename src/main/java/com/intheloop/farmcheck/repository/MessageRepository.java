package com.intheloop.farmcheck.repository;

import com.intheloop.farmcheck.domain.Chat;
import com.intheloop.farmcheck.domain.Message;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface MessageRepository extends
        CrudRepository<Message, Long>,
        PagingAndSortingRepository<Message, Long> {
    List<Message> findAllByChatId(Long chatId);
    List<Message> findAllByChatId(Long chatId, Pageable pageable);
}
