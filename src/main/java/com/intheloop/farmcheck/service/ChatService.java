package com.intheloop.farmcheck.service;

import com.intheloop.farmcheck.domain.Chat;
import com.intheloop.farmcheck.domain.Farm;
import com.intheloop.farmcheck.domain.Message;

import java.util.List;

public interface ChatService {
    Chat create(String name, String description, Farm farm);
    List<Chat> getByFarm(Farm farm, int page, int pageSize);
    Chat get(Long id);
    Chat update(Long id, String name, String description);
    void delete(Long id);
    List<Message> getChatMessages(Chat chat, int page, int pageSize);
    Message createMessage(Chat chat, String text);
}
