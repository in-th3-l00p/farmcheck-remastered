package com.intheloop.farmcheck.web.rest;

import com.intheloop.farmcheck.security.JWTGenerator;
import com.intheloop.farmcheck.security.PasswordEncoder;
import com.intheloop.farmcheck.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private record LoginBody(String username, String password) {}
    private record RegisterBody(
            String username,
            String firstName, String lastName,
            String email,
            String password
    ) {}

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthenticationController(
            UserService userService,
            PasswordEncoder passwordEncoder
    ) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginBody credentials) {
        var user = userService.get(credentials.username);
        if (
                user.isEmpty() ||
                !passwordEncoder.matches(credentials.password, user.get().getPassword())
        )
            return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(JWTGenerator.encodeToken(user.get()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterBody registerBody) {
        try {
            userService.create(
                    registerBody.username,
                    registerBody.firstName,
                    registerBody.lastName,
                    registerBody.email,
                    registerBody.password,
                    Set.of(userService.getUserAuthority())
                    );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok("Account registered.");
    }
}
