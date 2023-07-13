package com.intheloop.farmcheck.web.rest.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class CreateTaskDTO {
    private String name;
    private String description;
    private LocalDateTime deadline;
    private Boolean important;
    List<Long> userIds;
}
