package com.intheloop.farmcheck.web.rest.dto;

import com.intheloop.farmcheck.domain.Task;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class TaskDTO {
    private Long id;
    private String name;
    private String description;
    private String createdAt;
    private LocalDateTime deadline;
    private Boolean important;

    public TaskDTO(Task task) {
        this.id = task.getId();
        this.name = task.getName();
        this.description = task.getDescription();
        this.createdAt = task.getCreatedAt().toString();
        this.deadline = task.getDeadline();
        this.important = task.getImportant();
    }
}
