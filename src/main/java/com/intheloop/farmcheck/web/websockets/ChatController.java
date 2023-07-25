package com.intheloop.farmcheck.web.websockets;

import com.intheloop.farmcheck.security.AuthenticationUtils;
import com.intheloop.farmcheck.security.JWTGenerator;
import com.intheloop.farmcheck.service.ChatService;
import com.intheloop.farmcheck.service.UserService;
import com.intheloop.farmcheck.service.impl.ChatServiceImpl;
import com.intheloop.farmcheck.web.rest.dto.MessageDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    private final ChatService chatService;
    private final UserService userService;
    private final AuthenticationUtils authenticationUtils;
    private final Logger logger = LoggerFactory.getLogger(ChatServiceImpl.class);

    public ChatController(ChatService chatService, UserService userService, AuthenticationUtils authenticationUtils) {
        this.chatService = chatService;
        this.userService = userService;
        this.authenticationUtils = authenticationUtils;
    }

    @MessageMapping("/api/v1/ws/chat/{chatId}")
    @SendTo("/topic/chat/{chatId}")
    public MessageDTO sendMessage(
            SimpMessageHeaderAccessor headerAccessor,
            @DestinationVariable Long chatId,
            String content
    ) {
        var token = headerAccessor.getNativeHeader("token").toString();
        if (token == null)
            return null;
        token = token.substring(1, token.length() - 2);
        var userDetails = JWTGenerator.decodeToken(token);
        if (!userService.exists(userDetails.getUsername()))
            return null;
        var user = userService.get(userDetails.getUsername());
        var message = chatService.createMessage(
                chatService.getAsAdmin(chatId), content, user
        );
        return new MessageDTO(message);
    }
}
