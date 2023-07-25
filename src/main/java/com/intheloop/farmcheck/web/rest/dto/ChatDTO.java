package com.intheloop.farmcheck.web.rest.dto;

import com.intheloop.farmcheck.domain.Chat;
import jakarta.validation.constraints.NotNull;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link com.intheloop.farmcheck.domain.Chat}
 */
public class ChatDTO implements Serializable {
    Long id;
    @NotNull
    String name;
    String description;
    LocalDateTime createdAt;

    public ChatDTO() {
    }

    public ChatDTO(Chat chat) {
        this.id = chat.getId();
        this.name = chat.getName();
        this.description = chat.getDescription();
        this.createdAt = chat.getCreatedAt();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}