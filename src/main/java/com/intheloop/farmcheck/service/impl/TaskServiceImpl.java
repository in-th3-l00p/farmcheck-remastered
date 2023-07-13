package com.intheloop.farmcheck.service.impl;

import com.intheloop.farmcheck.domain.*;
import com.intheloop.farmcheck.repository.FarmUserRepository;
import com.intheloop.farmcheck.repository.TaskRepository;
import com.intheloop.farmcheck.repository.TaskUserRepository;
import com.intheloop.farmcheck.security.AuthenticationUtils;
import com.intheloop.farmcheck.service.TaskService;
import com.intheloop.farmcheck.utils.Pair;
import com.intheloop.farmcheck.utils.ResponseException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final TaskUserRepository taskUserRepository;
    private final FarmUserRepository farmUserRepository;
    private final AuthenticationUtils authenticationUtils;

    public TaskServiceImpl(
            TaskRepository taskRepository,
            TaskUserRepository taskUserRepository,
            FarmUserRepository farmUserRepository,
            AuthenticationUtils authenticationUtils
    ) {
        this.taskRepository = taskRepository;
        this.taskUserRepository = taskUserRepository;
        this.farmUserRepository = farmUserRepository;
        this.authenticationUtils = authenticationUtils;
    }

    @Override
    public void create(
            String name,
            String description,
            LocalDateTime deadline,
            Boolean important,
            Farm farm,
            List<User> users
    ) {
        if (name.isEmpty())
            throw new ResponseException("Name shouldn't be empty.");
        var currentUser = authenticationUtils.getAuthentication();
        var currentFarmUser = farmUserRepository.findByFarmAndUser(farm, currentUser);
        if (
                currentFarmUser.isEmpty() ||
                currentFarmUser.get().getUserRole() == FarmUser.UserRole.WORKER
        )
            throw FarmServiceImpl.UNAUTHORIZED;
        for (User user : users) {
            var farmUser = farmUserRepository.findByFarmAndUser(farm, user);
            if (farmUser.isEmpty())
                throw FarmServiceImpl.NOT_IN_FARM;
        }
        var task = new Task(
                name,
                description,
                deadline,
                important,
                currentUser,
                farm
        );
        taskRepository.save(task);
        taskUserRepository.saveAll(users.stream().map(user -> new TaskUser(user, task)).toList());
    }

    @Override
    public Task get(Long id) {
        var task = taskRepository.findById(id);
        if (task.isEmpty())
            throw new ResponseException("Task not found.", HttpStatus.NOT_FOUND);
        return task.get();
    }

    @Override
    public Collection<Pair<Task, Boolean>> getCurrentUserTasks(int page) {
        return taskUserRepository
                .findAllByUser(authenticationUtils.getAuthentication())
                .stream()
                .map(taskUser -> new Pair<>(taskUser.getTask(), taskUser.isCompleted()))
                .toList();
    }

    @Override
    public Collection<Pair<Task, Boolean>> getCurrentUserTasks(Farm farm, int page) {
        var currentFarmUser = farmUserRepository.findByFarmAndUser(
                farm, authenticationUtils.getAuthentication()
        );
        if (currentFarmUser.isEmpty())
            throw FarmServiceImpl.UNAUTHORIZED;
        return taskUserRepository
                .findAllByUserAndFarm(
                        authenticationUtils.getAuthentication().getId(),
                        farm.getId())
                .stream()
                .map(taskUser -> new Pair<>(taskUser.getTask(), taskUser.isCompleted()))
                .toList();
    }

    @Override
    public Collection<Task> getFarmTasks(Farm farm) {
        var currentFarmUser = farmUserRepository.findByFarmAndUser(
                farm, authenticationUtils.getAuthentication()
        );
        if (
                currentFarmUser.isEmpty() ||
                currentFarmUser.get().getUserRole() == FarmUser.UserRole.WORKER
        )
            throw FarmServiceImpl.UNAUTHORIZED;
        return taskRepository.findAllByFarm(farm);
    }

    @Override
    public Collection<TaskUser> getTaskUsers(Task task) {
        var currentFarmUser = farmUserRepository.findByFarmAndUser(
                task.getFarm(), authenticationUtils.getAuthentication()
        );
        if (currentFarmUser.isEmpty())
            throw FarmServiceImpl.UNAUTHORIZED;
        if (
                currentFarmUser.get().getUserRole() == FarmUser.UserRole.WORKER &&
                taskUserRepository
                        .findByUserAndTask(authenticationUtils.getAuthentication(), task)
                        .isEmpty()
        ) {
            throw new ResponseException(
                    "Unauthorized to the task.",
                    HttpStatus.UNAUTHORIZED
            );
        }
        return taskUserRepository.findAllByTask(task);
    }

    @Override
    public void finish(Task task) {
        var taskUser = taskUserRepository.findByUserAndTask(
                authenticationUtils.getAuthentication(), task);
        if (taskUser.isEmpty())
            throw new ResponseException(
                    "The given task isn't given to the current user.",
                    HttpStatus.UNAUTHORIZED
            );
        taskUser.get().setCompletedAt(LocalDateTime.now());
        taskUser.get().setCompleted(!taskUser.get().isCompleted());
        taskUserRepository.save(taskUser.get());
    }

    @Override
    public void update(Task task, String name, String description, LocalDateTime deadline, Boolean important) {
        var currentFarmUser = farmUserRepository.findByFarmAndUser(
                task.getFarm(), authenticationUtils.getAuthentication()
        );
        if (
                currentFarmUser.isEmpty() ||
                currentFarmUser.get().getUserRole() == FarmUser.UserRole.WORKER
        )
            throw FarmServiceImpl.UNAUTHORIZED;
        if (name.isEmpty())
            throw new ResponseException("Name shouldn't be empty.");
        task.setName(name);
        task.setDescription(description);
        task.setDeadline(deadline);
        task.setImportant(important);
        taskRepository.save(task);
    }

    @Override
    public void addUser(Task task, User user) {
        var currentTaskUser = taskUserRepository.findByUserAndTask(
                authenticationUtils.getAuthentication(), task);
        if (currentTaskUser.isEmpty())
            throw new ResponseException(
                    "Unauthorized to the task.",
                    HttpStatus.UNAUTHORIZED
            );
        var taskUser = new TaskUser();
        taskUser.setTask(task);
        taskUser.setUser(user);
        taskUserRepository.save(taskUser);
    }

    @Override
    public void removeUser(Task task, User user) {
        var currentTaskUser = taskUserRepository.findByUserAndTask(
                authenticationUtils.getAuthentication(), task);
        if (currentTaskUser.isEmpty())
            throw new ResponseException(
                    "Unauthorized to the task.",
                    HttpStatus.UNAUTHORIZED
            );
        var taskUser = taskUserRepository.findByUserAndTask(user, task);
        if (taskUser.isEmpty())
            throw new ResponseException(
                    "The given task isn't given to the current user.",
                    HttpStatus.UNAUTHORIZED
            );
        taskUserRepository.delete(taskUser.get());
    }

    @Override
    public void delete(Task task) {
        var currentTaskUser = taskUserRepository.findByUserAndTask(
                authenticationUtils.getAuthentication(), task);
        if (currentTaskUser.isEmpty())
            throw new ResponseException(
                    "Unauthorized to the task.",
                    HttpStatus.UNAUTHORIZED
            );
        taskUserRepository.deleteAllByTask(task);
        taskRepository.delete(task);
    }
}
