package com.intheloop.farmcheck.service;

import com.intheloop.farmcheck.domain.Farm;
import com.intheloop.farmcheck.domain.FarmUser;
import com.intheloop.farmcheck.domain.User;

import java.util.Collection;

public interface FarmService {
    void create(String name, String description);
    void addUser(Farm farm, User worker);
    Farm get(Long id);
    Collection<FarmUser> getFarmUsers(Farm farm, int page, int pageSize);
    int getFarmUsersCount(Farm farm);
    Collection<Farm> getCurrentUserFarms(int page, int pageSize);
    int getCurrentUserFarmsCount();
    void update(Farm farm, String name, String description);
    void updateUserRole(Farm farm, User user, FarmUser.UserRole role);
    void removeUser(Farm farm, User user);
    void deleteFarm(Farm farm);
}
