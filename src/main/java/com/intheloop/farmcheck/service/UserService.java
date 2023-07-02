package com.intheloop.farmcheck.service;

import com.intheloop.farmcheck.domain.Authority;
import com.intheloop.farmcheck.domain.User;

import java.util.Optional;
import java.util.Set;

public interface UserService {
    void create(
            String username,
            String firstName,
            String lastName,
            String email,
            String password,
            Set<Authority> authorities
            );

    boolean exists(String username);

    Optional<User> get(String username);

    Authority getUserAuthority();
}
