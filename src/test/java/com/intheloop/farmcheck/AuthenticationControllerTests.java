package com.intheloop.farmcheck;

import com.intheloop.farmcheck.domain.User;
import com.intheloop.farmcheck.repository.UserRepository;
import com.intheloop.farmcheck.security.JWTGenerator;
import com.intheloop.farmcheck.security.PasswordEncoder;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthenticationControllerTests {
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private MockMvc mvc;
    @MockBean private UserRepository userRepository;

    @Test
    void loginEndpoint() throws Exception {
        final var username = "user";
        final var password = "user";
        Mockito.when(userRepository.findByUsername(username)).thenReturn(Optional.empty());
        mvc.perform(MockMvcRequestBuilders
                        .post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(String.format("{\"username\": \"%s\", \"password\": \"%s\"}", username, "")))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
        var user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        Mockito.when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));
        mvc.perform(MockMvcRequestBuilders
                        .post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(String.format("{\"username\": \"%s\", \"password\": \"%s\"}", username, password)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(result -> {
                    var token = result.getResponse().getContentAsString();
                    assertEquals(username, JWTGenerator.decodeToken(token).getUsername());
                });
    }
}
