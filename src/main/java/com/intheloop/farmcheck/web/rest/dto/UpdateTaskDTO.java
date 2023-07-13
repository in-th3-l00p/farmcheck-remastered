package com.intheloop.farmcheck.web.rest.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class UpdateTaskDTO {
    private String name;
    private String description;
    private LocalDateTime deadline;
    private Boolean important;
}
