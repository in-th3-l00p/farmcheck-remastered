package com.intheloop.farmcheck.service;

import com.intheloop.farmcheck.domain.Farm;
import com.intheloop.farmcheck.domain.FarmUser;
import com.intheloop.farmcheck.domain.User;

public interface FarmService {
    void create(String name, String description) throws IllegalAccessException;
    void addUser(Farm farm, User worker) throws IllegalAccessException;
    Farm get(Long id) throws IllegalAccessException;
    void update(Farm farm, String name, String description) throws IllegalAccessException;
    void updateUserRole(Farm farm, User user, FarmUser.UserRole role) throws IllegalAccessException;
    void removeUser(Farm farm, User user) throws IllegalAccessException;
    void deleteFarm(Farm farm) throws IllegalAccessException;
}
