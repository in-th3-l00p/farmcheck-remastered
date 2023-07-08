package com.intheloop.farmcheck;

import com.intheloop.farmcheck.domain.Farm;
import com.intheloop.farmcheck.domain.FarmUser;
import com.intheloop.farmcheck.domain.User;
import com.intheloop.farmcheck.repository.FarmRepository;
import com.intheloop.farmcheck.repository.FarmUserRepository;
import com.intheloop.farmcheck.security.AuthenticationUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Optional;

@SpringBootTest
@AutoConfigureMockMvc
public class FarmResourceTests {
    @Autowired MockMvc mvc;
    @MockBean private FarmRepository farmRepository;
    @MockBean private FarmUserRepository farmUserRepository;
    @MockBean private AuthenticationUtils authenticationUtils;

    // used to store user JWT
    private String userToken;

    @BeforeEach
    public void authenticate() throws Exception {
        userToken = mvc.perform(MockMvcRequestBuilders
                        .post("/api/v1/auth/login")
                        .contentType("application/json")
                        .content("{\"username\":  \"user\", \"password\": \"user\"}"))
                .andReturn()
                .getResponse()
                .getContentAsString();
        Mockito.when(authenticationUtils.getAuthentication())
                .thenReturn(new User(0L, "user", "user", "user", "user@email.com", ""));
    }

    @Test
    public void getFarmDetails() throws Exception {
        Mockito.when(farmRepository.findById(0L)).thenReturn(Optional.of(new Farm()));
        Mockito.when(farmUserRepository.findByFarmAndUser(ArgumentMatchers.any(), ArgumentMatchers.any()))
                        .thenReturn(Optional.of(new FarmUser()));
        mvc.perform(MockMvcRequestBuilders
                    .get("/api/v1/farm?farmId=0")
                    .header("Authorization", "Bearer " + userToken))
                .andExpect(MockMvcResultMatchers.status().isOk());
        Mockito.when(farmRepository.findById(1L)).thenReturn(Optional.empty());
        mvc.perform(MockMvcRequestBuilders
                        .get("/api/v1/farm?farmId=1")
                        .header("Authorization", "Bearer " + userToken))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    public void createFarm() throws Exception {
        var name = "Test";
        var description = "test";
        Mockito.when(farmRepository.findByName(name)).thenReturn(Optional.empty());
        mvc.perform(MockMvcRequestBuilders
                    .post("/api/v1/farm")
                    .contentType("application/json")
                    .header("Authorization", "Bearer " + userToken)
                    .content(String.format("{\"name\": \"%s\", \"description\": \"%s\"}", name, description)))
                .andExpect(MockMvcResultMatchers.status().isOk());
        Mockito.when(farmRepository.findByName(name)).thenReturn(Optional.of(new Farm()));
        mvc.perform(MockMvcRequestBuilders
                        .post("/api/v1/farm")
                        .contentType("application/json")
                        .header("Authorization", "Bearer " + userToken)
                        .content(String.format("{\"name\": \"%s\", \"description\": \"%s\"}", name, description)))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    // todo: test every endpoint
}
