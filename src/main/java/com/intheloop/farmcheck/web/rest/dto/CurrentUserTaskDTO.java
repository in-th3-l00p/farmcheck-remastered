package com.intheloop.farmcheck.web.rest.dto;

import com.intheloop.farmcheck.domain.Task;
import com.intheloop.farmcheck.utils.Pair;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CurrentUserTaskDTO extends TaskDTO {
    private Boolean completed;

    public CurrentUserTaskDTO(Pair<Task, Boolean> task) {
        super(task.getFirst());
        this.completed = task.getSecond();
    }
}
