package com.intheloop.farmcheck;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
public class UserResourceTests {
    @Autowired
    private MockMvc mvc;

    // authentication token
    private String token;

    @BeforeEach
    public void authenticate() throws Exception {
        token = mvc.perform(MockMvcRequestBuilders
                .post("/api/v1/auth/login")
                .contentType("application/json")
                .content("{\"username\":  \"user\", \"password\": \"user\"}"))
                .andReturn()
                .getResponse()
                .getContentAsString();

    }

    @Test
    public void getUserDetails() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                        .get("/api/v1/user")
                        .header("Authorization", "Bearer " + token)
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("{\"id\":1,\"username\":\"user\",\"firstName\":\"user\",\"lastName\":\"user\",\"email\":\"user@email.com\"}"));
    }

    // todo: create more tests
}
