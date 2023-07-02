package com.intheloop.farmcheck.security;

import com.intheloop.farmcheck.domain.User;
import com.intheloop.farmcheck.service.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationUtils {
    private final UserService userService;

    public AuthenticationUtils(UserService userService) {
        this.userService = userService;
    }

    public boolean isAuthenticated() {
        return SecurityContextHolder.getContext().getAuthentication().isAuthenticated();
    }

    public User getAuthentication() throws IllegalAccessException {
        final var username = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
        final var user = userService.get(username);
        if (user.isEmpty())
            throw new IllegalAccessException("Unauthenticated");
        return user.get();
    }
}
