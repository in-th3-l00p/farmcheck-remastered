package com.intheloop.farmcheck.web.rest.dto;

import com.intheloop.farmcheck.domain.Message;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link com.intheloop.farmcheck.domain.Message}
 */
@Value
public class MessageDTO implements Serializable {
    @NotNull
    Long id;
    @NotNull
    @NotEmpty
    String content;
    @NotNull
    LocalDateTime createdAt;
    @NotNull
    Long chatId;
    @NotNull
    String senderUsername;

    public MessageDTO(Message message) {
        this.id = message.getId();
        this.content = message.getContent();
        this.createdAt = message.getCreatedAt();
        this.chatId = message.getChatId();
        this.senderUsername = message.getSenderUsername();
    }
}