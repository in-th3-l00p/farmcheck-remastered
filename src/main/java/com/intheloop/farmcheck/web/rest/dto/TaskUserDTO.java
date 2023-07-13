package com.intheloop.farmcheck.web.rest.dto;

import com.intheloop.farmcheck.domain.TaskUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskUserDTO {
    private Long userId;
    private Long taskId;
    private boolean completed;
    private LocalDateTime completedAt;

    public TaskUserDTO(TaskUser taskUser) {
        this.userId = taskUser.getUser().getId();
        this.taskId = taskUser.getTask().getId();
        this.completed = taskUser.isCompleted();
        this.completedAt = taskUser.getCompletedAt();
    }
}
