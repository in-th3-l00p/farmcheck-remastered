package com.intheloop.farmcheck.web.websockets;

import com.intheloop.farmcheck.security.AuthenticationUtils;
import com.intheloop.farmcheck.service.ChatService;
import com.intheloop.farmcheck.service.impl.ChatServiceImpl;
import com.intheloop.farmcheck.web.rest.dto.MessageDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    private final ChatService chatService;
    private final AuthenticationUtils authenticationUtils;
    private final Logger logger = LoggerFactory.getLogger(ChatServiceImpl.class);

    public ChatController(ChatService chatService, AuthenticationUtils authenticationUtils) {
        this.chatService = chatService;
        this.authenticationUtils = authenticationUtils;
    }

    @MessageMapping("/api/v1/ws/chat/{chatId}")
    @SendTo("/topic/chat/{chatId}")
    public MessageDTO sendMessage(
            @DestinationVariable Long chatId,
            MessageDTO messageDTO
    ) {
        logger.debug(authenticationUtils.getAuthentication().getUsername());
        chatService.createMessage(
                chatService.get(chatId),
                messageDTO.getContent()
        );
        return messageDTO;
    }
}
