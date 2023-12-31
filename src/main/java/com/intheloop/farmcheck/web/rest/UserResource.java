package com.intheloop.farmcheck.web.rest;

import com.intheloop.farmcheck.security.AuthenticationUtils;
import com.intheloop.farmcheck.service.UserService;
import com.intheloop.farmcheck.utils.ResponseException;
import com.intheloop.farmcheck.web.rest.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/v1/user")
public class UserResource {
    private record RegisterBody(
            String username,
            String firstName,
            String lastName,
            String email,
            String password
    ) {}
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
    @GetMapping(
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    public ResponseEntity<?> getUserDetails() {
        try {
            return ResponseEntity.ok(
                    new UserDTO(authenticationUtils.getAuthentication())
            );
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code GET /api/v1/user/{id}} : Gets the user details of the user with the given username
     * @param username : user's username
     * @return user's details with status {@code 200 (OK)}
     */
    @GetMapping(
            path = "/{username}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getUserDetails(@PathVariable String username) {
        try {
            return ResponseEntity.ok(new UserDTO(userService.get(username)));
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code PUT /api/v1/user} : Updates the user details of the current user
     * @param userDTO : the user's new details
     * @return status {@code 200 (OK)} if the details are updated, status {@code 400 (BAD REQUEST)} if the given data is bad
     */
    @PutMapping(
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    public ResponseEntity<?> updateUser(
            @RequestBody UserDTO userDTO
            ) {
        try {
            var currentUser = authenticationUtils.getAuthentication();
            currentUser.setUsername(userDTO.getUsername());
            currentUser.setFirstName(userDTO.getFirstName());
            currentUser.setLastName(userDTO.getLastName());
            userService.update(currentUser);
            return ResponseEntity.ok().build();
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code POST /api/v1/user/register} : Registers a new user
     * @param registerBody - the object containing user's data
     * @return {@code 200 (OK)} if the credentials are valid, else {@code 400 (BAD REQUEST)}
     */
    @PostMapping(
            path = "/register",
            consumes = { MediaType.APPLICATION_JSON_VALUE },
            produces = { MediaType.APPLICATION_JSON_VALUE }
    )
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
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
        return ResponseEntity.ok().build();
    }
}
