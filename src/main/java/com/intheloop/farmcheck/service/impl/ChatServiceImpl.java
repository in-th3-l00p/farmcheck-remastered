package com.intheloop.farmcheck.service.impl;

import com.intheloop.farmcheck.domain.Chat;
import com.intheloop.farmcheck.domain.Farm;
import com.intheloop.farmcheck.domain.FarmUser;
import com.intheloop.farmcheck.domain.Message;
import com.intheloop.farmcheck.repository.ChatRepository;
import com.intheloop.farmcheck.repository.FarmUserRepository;
import com.intheloop.farmcheck.repository.MessageRepository;
import com.intheloop.farmcheck.security.AuthenticationUtils;
import com.intheloop.farmcheck.service.ChatService;
import com.intheloop.farmcheck.utils.ResponseException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatServiceImpl implements ChatService {
    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;
    private final AuthenticationUtils authenticationUtils;
    private final FarmUserRepository farmUserRepository;

    public ChatServiceImpl(
            ChatRepository chatRepository,
            MessageRepository messageRepository,
            AuthenticationUtils authenticationUtils,
            FarmUserRepository farmUserRepository) {
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
        this.authenticationUtils = authenticationUtils;
        this.farmUserRepository = farmUserRepository;
    }

    @Override
    public Chat create(String name, String description, Farm farm) {
        if (name.isEmpty())
            throw new ResponseException("Name is required");
        var currentFarmUser = farmUserRepository.findByFarmAndUser(
                farm, authenticationUtils.getAuthentication()
        );
        if (
                currentFarmUser.isEmpty() ||
                currentFarmUser.get().getUserRole() == FarmUser.UserRole.WORKER
        )
            throw FarmServiceImpl.UNAUTHORIZED;
        var chat = new Chat();
        chat.setName(name);
        chat.setDescription(description);
        chat.setFarm(farm);
        return chatRepository.save(chat);
    }

    @Override
    public List<Chat> getByFarm(Farm farm, int page, int pageSize) {
        var currentFarmUser = farmUserRepository.findByFarmAndUser(
                farm, authenticationUtils.getAuthentication()
        );
        if (currentFarmUser.isEmpty())
            throw FarmServiceImpl.NOT_IN_FARM;
        return chatRepository.findAllByFarm(farm, PageRequest.of(page, pageSize));
    }

    @Override
    public int countByFarm(Farm farm) {
        var currentFarmUser = farmUserRepository.findByFarmAndUser(
                farm, authenticationUtils.getAuthentication()
        );
        if (currentFarmUser.isEmpty())
            throw FarmServiceImpl.NOT_IN_FARM;
        return chatRepository.countAllByFarm(farm);
    }

    @Override
    public Chat get(Long id) {
        var chat = chatRepository.findById(id);
        if (chat.isEmpty())
            throw new ResponseException(
                    "Chat not found", HttpStatus.NOT_FOUND
            );
        var currentFarmUser = farmUserRepository.findByFarmAndUser(
                chat.get().getFarm(), authenticationUtils.getAuthentication()
        );
        if (currentFarmUser.isEmpty())
            throw FarmServiceImpl.NOT_IN_FARM;
        return chat.get();
    }

    @Override
    public Chat update(Long id, String name, String description) {
        if (name.isEmpty())
            throw new ResponseException("Name is required");
        var chat = get(id);
        var currentFarmUser = farmUserRepository.findByFarmAndUser(
                chat.getFarm(), authenticationUtils.getAuthentication()
        );
        if (
                currentFarmUser.isEmpty() ||
                currentFarmUser.get().getUserRole() == FarmUser.UserRole.WORKER
        )
            throw FarmServiceImpl.UNAUTHORIZED;
        chat.setName(name);
        chat.setDescription(description);
        return chatRepository.save(chat);
    }

    @Override
    public void delete(Long id) {
        var chat = get(id);
        var currentFarmUser = farmUserRepository.findByFarmAndUser(
                chat.getFarm(), authenticationUtils.getAuthentication()
        );
        if (
                currentFarmUser.isEmpty() ||
                currentFarmUser.get().getUserRole() == FarmUser.UserRole.WORKER
        )
            throw FarmServiceImpl.UNAUTHORIZED;
        messageRepository.deleteAll(messageRepository
                .findAllByChatId(chat.getId()));
        chatRepository.delete(chat);
    }

    @Override
    public List<Message> getChatMessages(Chat chat, int page, int pageSize) {
        var currentFarmUser = farmUserRepository.findByFarmAndUser(
                chat.getFarm(), authenticationUtils.getAuthentication()
        );
        if (currentFarmUser.isEmpty())
            throw FarmServiceImpl.NOT_IN_FARM;
        return messageRepository.findAllByChatId(
                chat.getId(),
                PageRequest.of(
                        page, pageSize,
                        Sort.by("createdAt").descending()
                )
        );
    }

    @Override
    public Message createMessage(Chat chat, String content) {
        var currentFarmUser = farmUserRepository.findByFarmAndUser(
                chat.getFarm(), authenticationUtils.getAuthentication()
        );
        if (currentFarmUser.isEmpty())
            throw FarmServiceImpl.NOT_IN_FARM;
        var message = new Message();
        message.setContent(content);
        message.setChatId(chat.getId());
        message.setSenderUsername(authenticationUtils
                .getAuthentication()
                .getUsername());
        return messageRepository.save(message);
    }
}
