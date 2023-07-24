package com.intheloop.farmcheck.web.rest;

import com.intheloop.farmcheck.service.ChatService;
import com.intheloop.farmcheck.service.FarmService;
import com.intheloop.farmcheck.utils.Constants;
import com.intheloop.farmcheck.utils.ResponseException;
import com.intheloop.farmcheck.web.rest.dto.ChatDTO;
import com.intheloop.farmcheck.web.rest.dto.MessageDTO;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/chat")
public class ChatResource {
    private final ChatService chatService;
    private final FarmService farmService;

    public ChatResource(
            ChatService chatService,
            FarmService farmService
    ) {
        this.chatService = chatService;
        this.farmService = farmService;
    }

    /**
     * {@code POST /api/v1/chat} : Create chat
     * @param farmId : farm id
     * @param chatDTO : chat dto
     * @return status {@code 200 (OK)} and body {@link ChatDTO}
     */
    @PostMapping(
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> createChat(
            @RequestParam("farmId") Long farmId,
            @RequestBody ChatDTO chatDTO
            ) {
        try {
            return ResponseEntity.ok(new ChatDTO(chatService.create(
                    chatDTO.getName(),
                    chatDTO.getDescription(),
                    farmService.get(farmId)
            )));
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code GET /api/v1/chat/{chatId}} : Get chat
     * @param chatId : chat id
     * @return status {@code 200 (OK)} and body {@link ChatDTO}
     */
    @GetMapping(
            value = "/{chatId}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getFarmChats(@PathVariable Long chatId) {
        try {
            return ResponseEntity.ok(new ChatDTO(chatService.get(chatId)));
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code GET /api/v1/chat/farm/{farmId}} : Get farm chats
     * @param farmId : farm id
     * @param page : page number
     * @param pageSize : page size
     * @return status {@code 200 (OK)} and body {@link java.util.List<ChatDTO>}
     */
    @GetMapping(
            value = "/farm/{farmId}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getFarmChats(
            @PathVariable Long farmId,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "pageSize", defaultValue = Constants.PAGE_SIZE) int pageSize
    ) {
        try {
            return ResponseEntity.ok(chatService
                    .getByFarm(farmService.get(farmId), page, pageSize)
                    .stream().map(ChatDTO::new).toList()
            );
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code GET /api/v1/chat/messages/{chatId}} : Get chat messages
     * @param chatId : chat id
     * @param page : page number
     * @param pageSize: page size
     * @return status {@code 200 (OK)} and body {@link java.util.List<MessageDTO>}
     */
    @GetMapping(
            value = "/messages/{chatId}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getChatMessages(
            @PathVariable Long chatId,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "pageSize", defaultValue = Constants.PAGE_SIZE) int pageSize
    ) {
        try {
            return ResponseEntity.ok(chatService
                    .getChatMessages(chatService.get(chatId), page, pageSize)
                    .stream()
                    .map(MessageDTO::new)
                    .toList());
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code PUT /api/v1/chat/{chatId}} : Update chat
     * @param chatId : chat id
     * @param chatDTO : chat dto
     * @return status {@code 200 (OK)} and body {@link ChatDTO}
     */
    @PutMapping(
            value = "/{chatId}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> updateChat(
            @PathVariable Long chatId,
            @RequestBody ChatDTO chatDTO
    ) {
        try {
            return ResponseEntity.ok(new ChatDTO(chatService.update(
                    chatId,
                    chatDTO.getName(),
                    chatDTO.getDescription()
            )));
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code DELETE /api/v1/chat/{chatId}} : Delete chat
     * @param chatId : chat id
     * @return status {@code 200 (OK)}
     */
    @DeleteMapping(
            value = "/{chatId}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> deleteChat(@PathVariable Long chatId) {
        try {
            chatService.delete(chatId);
            return ResponseEntity.ok().build();
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }
}
