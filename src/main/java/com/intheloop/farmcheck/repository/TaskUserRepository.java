package com.intheloop.farmcheck.repository;

import com.intheloop.farmcheck.domain.Task;
import com.intheloop.farmcheck.domain.TaskUser;
import com.intheloop.farmcheck.domain.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.Optional;

public interface TaskUserRepository extends
        CrudRepository<TaskUser, Long>,
        PagingAndSortingRepository<TaskUser, Long> {
    Collection<TaskUser> findAllByUser(User user);

    Collection<TaskUser> findAllByTask(Task task);

    @Query("SELECT tu FROM TaskUser tu WHERE tu.user.id=:userId AND tu.task.farm.id=:farmId")
    Collection<TaskUser> findAllByUserAndFarm(@Param("userId") Long userId, @Param("farmId") Long farmId);

    Optional<TaskUser> findByUserAndTask(User user, Task task);

    void deleteAllByTask(Task task);
}
