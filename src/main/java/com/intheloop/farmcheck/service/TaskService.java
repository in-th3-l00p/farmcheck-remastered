package com.intheloop.farmcheck.service;

import com.intheloop.farmcheck.domain.Farm;
import com.intheloop.farmcheck.domain.Task;
import com.intheloop.farmcheck.domain.TaskUser;
import com.intheloop.farmcheck.domain.User;
import com.intheloop.farmcheck.utils.Pair;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

public interface TaskService {
    void create(
            String name,
            String description,
            LocalDateTime deadline,
            Boolean important,
            Farm farm,
            List<User> users
    );
    Task get(Long id);
    Collection<Pair<Task, Boolean>> getCurrentUserTasks(int page);
    int countCurrentUserTasks();
    Collection<Pair<Task, Boolean>> getCurrentUserTasks(Farm farm, int page);
    int countCurrentUserTasks(Farm farm);
    Collection<Task> getFarmTasks(Farm farm, int page);
    Collection<TaskUser> getTaskUsers(Task task, int page);
    void finish(Task task);
    void update(
            Task task,
            String name,
            String description,
            LocalDateTime deadline,
            Boolean important
    );
    void addUser(Task task, User user);
    void removeUser(Task task, User user);
    void delete(Task task);
}
