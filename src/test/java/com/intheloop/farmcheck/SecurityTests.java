package com.intheloop.farmcheck;

import com.intheloop.farmcheck.domain.Authority;
import com.intheloop.farmcheck.security.JWTGenerator;
import com.intheloop.farmcheck.security.PasswordEncoder;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class SecurityTests {
    private static final String testPassword = "test12345";

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void passwordEncoder() {
        var encoded = passwordEncoder.encode(testPassword);
        assertTrue(passwordEncoder.matches(testPassword, encoded));
    }

    @Test
    void JWTGenerator_methods() {
        final var testAuthorities = new Authority[] { new Authority("user") };
        final var testUser = new org.springframework.security.core.userdetails.User(
                "intheloop", "", List.of(testAuthorities)
        );

        var token = JWTGenerator.encodeToken(testUser);
        assertEquals(token, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImludGhlbG9vcCIsImF1dGhvcml0aWVzIjoidXNlciJ9.zrNh2BNqn4y9x_kpPxcDr3YeG2dL7zjmdtp5ePGCe64");

        var decoded = JWTGenerator.decodeToken(token);
        assertEquals(decoded.getUsername(), testUser.getUsername());
        assertEquals(decoded.getAuthorities().size(), testAuthorities.length);
        assertEquals(decoded.getAuthorities().toArray()[0], testAuthorities[0]);
    }
}
