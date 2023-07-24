package com.intheloop.farmcheck.web.rest.dto;

import com.intheloop.farmcheck.domain.Chat;
import jakarta.validation.constraints.NotNull;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link com.intheloop.farmcheck.domain.Chat}
 */
@Value
public class ChatDTO implements Serializable {
    @NotNull
    Long id;
    @NotNull
    String name;
    String description;
    @NotNull
    LocalDateTime createdAt;

    public ChatDTO(Chat chat) {
        this.id = chat.getId();
        this.name = chat.getName();
        this.description = chat.getDescription();
        this.createdAt = chat.getCreatedAt();
    }
}