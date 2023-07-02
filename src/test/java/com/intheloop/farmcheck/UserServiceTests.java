package com.intheloop.farmcheck;

import com.intheloop.farmcheck.domain.Authority;
import com.intheloop.farmcheck.repository.UserRepository;
import com.intheloop.farmcheck.security.PasswordEncoder;
import com.intheloop.farmcheck.service.UserService;
import com.intheloop.farmcheck.service.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.HashSet;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UserServiceTests {
    private static final String testPassword = "test12345";

    @Autowired
    private PasswordEncoder passwordEncoder;

    @MockBean
    private UserRepository userRepository;

    private UserService userService;

    @BeforeEach
    void initializeUserService() {
        userService = new UserServiceImpl(userRepository, passwordEncoder);
    }

    @Test
    void userService_createUser() {
        var username = "test";
        var firstName = "test";
        var lastName = "test";
        var email = "test";
        var authorities = new HashSet<Authority>();

        assertThrows(
                IllegalArgumentException.class,
                () -> userService.create(username, firstName, lastName, email, "test", authorities)
        );

        Mockito.when(userRepository.existsByUsername(username)).thenReturn(true);
        assertThrows(
                IllegalArgumentException.class,
                () -> userService.create(username, firstName, lastName, email, testPassword, authorities)
        );

        Mockito.reset(userRepository);
        Mockito.when(userRepository.existsByEmail(email)).thenReturn(true);
        assertThrows(
                IllegalArgumentException.class,
                () -> userService.create(username, firstName, lastName, email, testPassword, authorities)
        );

        Mockito.reset(userRepository);
        assertDoesNotThrow(
                () -> userService.create(username, firstName, lastName, email, testPassword, authorities)
        );
    }

    @Test
    void userService_exists() {
        final var username = "test";
        assertFalse(userService.exists(username));
        Mockito.when(userRepository.existsByUsername(username)).thenReturn(true);
        assertTrue(userService.exists(username));
    }
}
