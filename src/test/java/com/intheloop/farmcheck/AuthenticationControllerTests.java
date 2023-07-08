package com.intheloop.farmcheck;

import com.intheloop.farmcheck.domain.User;
import com.intheloop.farmcheck.security.JWTGenerator;
import com.intheloop.farmcheck.security.PasswordEncoder;
import com.intheloop.farmcheck.service.UserService;
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

import java.util.HashSet;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthenticationControllerTests {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MockMvc mvc;

    @MockBean
    private UserService userService;

    @Test
    void loginEndpoint() throws Exception {
        final var username = "user";
        final var password = "user";
        mvc.perform(MockMvcRequestBuilders
                        .post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(String.format("{\"username\": \"%s\", \"password\": \"%s\"}", username, password)))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
        mvc.perform(MockMvcRequestBuilders
                        .get("/api/v1/user")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isForbidden());
        var encodedUser = new User();
        encodedUser.setUsername(username);
        encodedUser.setPassword(passwordEncoder.encode(password));
        encodedUser.setAuthorities(new HashSet<>());
        Mockito.when(userService.get(username)).thenReturn(encodedUser);
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
