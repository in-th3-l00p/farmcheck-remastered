package com.intheloop.farmcheck.service.impl;

import com.intheloop.farmcheck.domain.Authority;
import com.intheloop.farmcheck.domain.User;
import com.intheloop.farmcheck.repository.UserRepository;
import com.intheloop.farmcheck.security.PasswordEncoder;
import com.intheloop.farmcheck.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public User create(
            String username,
            String firstName,
            String lastName,
            String email,
            String password,
            Set<Authority> authorities
    ) {
        if (userRepository.existsByUsername(username))
            throw new IllegalArgumentException("Username is already used.");
        if (userRepository.existsByEmail(email))
            throw new IllegalArgumentException("Email address is already used.");
        if (password.length() < 8)
            throw new IllegalArgumentException("Password should be longer then 8 characters.");
        var encodedPassword = passwordEncoder.encode(password);
        var user = new User();
        user.setUsername(username);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPassword(encodedPassword);
        user.setAuthorities(authorities);
        return userRepository.save(user);
    }

    @Override
    public boolean exists(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public Optional<User> get(String username) {
        return userRepository.findByUsername(username);
    }
}
