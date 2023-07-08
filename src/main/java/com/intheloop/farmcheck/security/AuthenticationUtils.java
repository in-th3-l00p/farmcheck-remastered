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
        try {
            return userService.get(username);
        } catch (Exception ignored) {
            throw new IllegalAccessException("Unauthenticated");
        }
    }
}
