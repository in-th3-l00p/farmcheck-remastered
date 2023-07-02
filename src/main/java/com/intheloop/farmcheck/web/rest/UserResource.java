package com.intheloop.farmcheck.web.rest;

import com.intheloop.farmcheck.security.AuthenticationUtils;
import com.intheloop.farmcheck.service.UserService;
import com.intheloop.farmcheck.web.rest.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
public class UserResource {
    private final UserService userService;
    private final AuthenticationUtils authenticationUtils;

    @Autowired
    public UserResource(
            UserService userService,
            AuthenticationUtils authenticationUtils
    ) {
        this.userService = userService;
        this.authenticationUtils = authenticationUtils;
    }

    /**
     * {@code GET /api/v1/user} : Gets the user details of the current user
     * @return user's details with status {@code 200 (OK)}
     */
    @GetMapping
    public ResponseEntity<?> getUserDetails() {
        try {
            return ResponseEntity.ok(
                    new UserDTO(authenticationUtils.getAuthentication())
            );
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(e.getMessage());
        }
    }
}
