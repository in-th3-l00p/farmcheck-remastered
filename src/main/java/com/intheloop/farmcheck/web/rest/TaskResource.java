package com.intheloop.farmcheck.web.rest;

import com.intheloop.farmcheck.service.FarmService;
import com.intheloop.farmcheck.service.TaskService;
import com.intheloop.farmcheck.service.UserService;
import com.intheloop.farmcheck.utils.ResponseException;
import com.intheloop.farmcheck.web.rest.dto.*;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/task")
public class TaskResource { // todo: unit test it
    TaskService taskService;
    FarmService farmService;
    UserService userService;

    public TaskResource(
            TaskService taskService,
            FarmService farmService,
            UserService userService) {
        this.taskService = taskService;
        this.farmService = farmService;
        this.userService = userService;
    }

    /**
     * {@code POST /api/v1/task} : Creates a new task
     * @param farmId : the task's farm id
     * @param createTaskDTO : the dto containing task information
     * @return status {@code 200 (OK)} if the task was created
     */
    @PostMapping(
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> createTask(
            @RequestParam("farmId") Long farmId,
            @RequestBody CreateTaskDTO createTaskDTO) {
        try {
            taskService.create(
                    createTaskDTO.getName(),
                    createTaskDTO.getDescription(),
                    createTaskDTO.getDeadline(),
                    createTaskDTO.getImportant(),
                    farmService.get(farmId),
                    createTaskDTO
                            .getUserIds()
                            .stream()
                            .map(userService::get)
                            .toList()
            );
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
        return ResponseEntity.ok().build();
    }

    /**
     * {@code GET /api/v1/task} : Gets the current user's tasks
     * @param farmId : the farm id, if -1, then all tasks are returned
     * @param page : the page number
     * @return status {@code 200 (OK)} and a list of tasks if the request was successful
     */
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getCurrentUserTasks(
            @RequestParam(value = "farmId", defaultValue = "-1") Long farmId,
            @RequestParam(name = "page", defaultValue = "0") int page) {
        if (farmId >= 0L) {
            try {
                return ResponseEntity.ok(taskService
                        .getCurrentUserTasks(farmService.get(farmId), page)
                        .stream()
                        .map(CurrentUserTaskDTO::new)
                        .toList());
            } catch (ResponseException e) {
                return e.toResponseEntity();
            }
        }
        try {
            return ResponseEntity.ok(taskService
                    .getCurrentUserTasks(page)
                    .stream()
                    .map(CurrentUserTaskDTO::new)
                    .toList());
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code GET /api/v1/task/count} : Gets the current user's tasks count
     * @param farmId : the farm id, if -1, then all tasks are returned
     * @return status {@code 200 (OK)} and a list of tasks if the request was successful
     */
    @GetMapping("/count")
    public ResponseEntity<?> countCurrentUserTasks(
            @RequestParam(value = "farmId", defaultValue = "-1") Long farmId) {
        if (farmId >= 0L) {
            try {
                return ResponseEntity.ok(taskService.countCurrentUserTasks(farmService.get(farmId)));
            } catch (ResponseException e) {
                return e.toResponseEntity();
            }
        }
        try {
            return ResponseEntity.ok(taskService.countCurrentUserTasks());
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code GET /api/v1/task/farm} : Gets the tasks for a farm
     * @param farmId : the farm id
     * @param page : the page number
     * @return status {@code 200 (OK)} and a list of tasks if the request was successful
     */
    @GetMapping(
            value = "/farm",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getTasksByFarm(
            @RequestParam("farmId") Long farmId,
            @RequestParam(value = "page", defaultValue = "0") int page
    ) {
        try {
            return ResponseEntity.ok(taskService
                    .getFarmTasks(farmService.get(farmId), page)
                    .stream()
                    .map(TaskDTO::new)
                    .toList());
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code GET /api/v1/task/users} : Gets the users for a task
     * @param taskId : the task id
     * @param page : the page number
     * @return status {@code 200 (OK)} and a list of users if the request was successful
     */
    @GetMapping(
            value = "/users",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getTaskUsers(
            @RequestParam("taskId") Long taskId,
            @RequestParam(value = "page", defaultValue = "0") int page
    ) {
        try {
            return ResponseEntity.ok(taskService
                    .getTaskUsers(taskService.get(taskId), page)
                    .stream()
                    .map(TaskUserDTO::new)
                    .toList());
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code POST /api/v1/task/finish} : Finishes a task
     * @param taskId : the task id
     * @return status {@code 200 (OK)}
     */
    @PutMapping(
            value = "/finish",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getTasksByFarm(
            @RequestParam("taskId") Long taskId
    ) {
        try {
            taskService.finish(taskService.get(taskId));
            return ResponseEntity.ok().build();
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code PUT /api/v1/task} : Updates a task
     * @param taskId : the task id
     * @param updateTaskDTO : the dto containing the updated task information
     * @return : status {@code 200 (OK)} if the task was updated
     */
    @PutMapping(
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> updateTask(
            @RequestParam("taskId") Long taskId,
            @RequestBody UpdateTaskDTO updateTaskDTO
            ) {
        try {
            taskService.update(
                    taskService.get(taskId),
                    updateTaskDTO.getName(),
                    updateTaskDTO.getDescription(),
                    updateTaskDTO.getDeadline(),
                    updateTaskDTO.getImportant()
            );
            return ResponseEntity.ok().build();
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code POST /api/v1/task/add} : Adds a user to a task
     * @param taskId : the task id
     * @param userId : the user id
     * @return status {@code 200 (OK)} if the user was added to the task
     */
    @PostMapping(
            value = "/add",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> addUserToTask(
            @RequestParam("taskId") Long taskId,
            @RequestParam("userId") Long userId
    ) {
        try {
            taskService.addUser(taskService.get(taskId), userService.get(userId));
            return ResponseEntity.ok().build();
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code DELETE /api/v1/task} : Deletes a task
     * @param taskId : the task id
     * @return status {@code 200 (OK)} if the task was deleted
     */
    @DeleteMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteTask(
            @RequestParam("taskId") Long taskId
    ) {
        try {
            taskService.delete(taskService.get(taskId));
            return ResponseEntity.ok().build();
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code DELETE /api/v1/task/remove} : Removes a user from a task
     * @param taskId : the task id
     * @param userId : the user id
     * @return status {@code 200 (OK)} if the user was removed from the task
     */
    @DeleteMapping(
            value = "/remove",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> removeUserFromTask(
            @RequestParam("taskId") Long taskId,
            @RequestParam("userId") Long userId
    ) {
        try {
            taskService.removeUser(taskService.get(taskId), userService.get(userId));
            return ResponseEntity.ok().build();
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }
}
