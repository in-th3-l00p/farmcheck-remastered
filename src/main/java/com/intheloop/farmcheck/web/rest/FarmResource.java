package com.intheloop.farmcheck.web.rest;

import com.intheloop.farmcheck.domain.FarmUser;
import com.intheloop.farmcheck.service.FarmService;
import com.intheloop.farmcheck.service.UserService;
import com.intheloop.farmcheck.utils.Constants;
import com.intheloop.farmcheck.utils.ResponseException;
import com.intheloop.farmcheck.web.rest.dto.FarmDTO;
import com.intheloop.farmcheck.web.rest.dto.UserRoleDTO;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/farm")
public class FarmResource {
    private final FarmService farmService;
    private final UserService userService;

    public FarmResource(
            FarmService farmService,
            UserService userService
    ) {
        this.farmService = farmService;
        this.userService = userService;
    }

    /**
     * {@code GET /api/v1/farm} : Gets the details of a farm
     * @param farmId : the farm's id
     * @return a {@link FarmDTO} with status {@code 200 (OK)}
     */
    @GetMapping(
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getFarmDetails(@RequestParam("farmId") Long farmId) {
        try {
            return ResponseEntity.ok(new FarmDTO(farmService.get(farmId)));
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code GET /api/v1/farm/all} : Gets the current user's farms
     * @param page : used for pagination
     * @param pageSize : used for pagination
     * @return a {@link java.util.List<FarmDTO>} with status {@code 200 (OK)}
     */
    @GetMapping(
            path = "/all",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getFarms(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "pageSize", defaultValue = Constants.PAGE_SIZE) int pageSize
    ) {
        try {
            return ResponseEntity.ok(farmService
                    .getCurrentUserFarms(page, pageSize)
                    .stream()
                    .map(FarmDTO::new)
                    .toList());
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code GET /api/v1/farm/all/count} : Gets the number of farms of the current user
     * @return the number of farms of the current user with status {@code 200 (OK)}
     */
    @GetMapping("/all/count")
    public ResponseEntity<?> getFarmsCount() {
        try {
            return ResponseEntity.ok(farmService.getCurrentUserFarmsCount());
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code GET /api/v1/farm/users} : Gets farm's users
     * @param farmId : the id of the farm
     * @param page : used for pagination
     * @param pageSize : used for pagination
     * @return a {@link java.util.List<UserRoleDTO>} with status {@code 200 (OK)}
     */
    @GetMapping(
            path = "/users",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getFarmUsers(
            @RequestParam("farmId") Long farmId,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "pageSize", defaultValue = Constants.PAGE_SIZE) int pageSize
    ) {
        try {
            return ResponseEntity.ok(farmService
                    .getFarmUsers(farmService.get(farmId), page, pageSize)
                    .stream()
                    .map(farmUser -> new UserRoleDTO(farmUser.getUser(), farmUser.getUserRole()))
                    .toList());
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code GET /api/v1/farm/users/count} : Gets the number of users in a farm
     * @param farmId : the id of the farm
     * @return the number of users in the farm with status {@code 200 (OK)}
     */
    @GetMapping(path = "/users/count")
    public ResponseEntity<?> getFarmUsersCount(@RequestParam("farmId") Long farmId) {
        try {
            return ResponseEntity.ok(farmService.getFarmUsersCount(farmService.get(farmId)));
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code POST /api/v1/farm} : Creates a farm
     * @param farmDTO : the farm's details
     * @return status {@code 200 (OK)} if the farm was created successfully
     */
    @PostMapping(
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> createFarm(@RequestBody FarmDTO farmDTO) {
        try {
            farmService.create(farmDTO.getName(), farmDTO.getDescription());
            return ResponseEntity.ok().build();
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code POST /api/v1/farm/user} : Adds a user to a farm, with default WORKER role
     * @param farmId : the farm's id
     * @param userId : the user's id
     * @return status {@code 200 (OK)} if the user was added
     */
    @PostMapping(
            path = "/user",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> addUser(
            @RequestParam("farmId") Long farmId,
            @RequestParam("userId") Long userId
    ) {
        try {
            farmService.addUser(farmService.get(farmId), userService.get(userId));
            return ResponseEntity.ok().build();
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code PUT /api/v1/farm} : Updates farm's details
     * @param farmId : the farm's id
     * @param farmDTO : the farm's details
     * @return status {@code 200 (OK)} if the details were updated
     */
    @PutMapping(
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> updateFarm(
            @RequestParam("farmId") Long farmId,
            @RequestBody FarmDTO farmDTO
    ) {
        try {
            farmService.update(
                    farmService.get(farmId),
                    farmDTO.getName(),
                    farmDTO.getDescription()
            );
            return ResponseEntity.ok().build();
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code PUT /api/v1/farm/user} : Updates a farm user role
     * @param farmId : the farm's id
     * @param userId : the user's id
     * @param userRole : user's new role
     * @return status {@code 200 (OK)} if the user's role was updated
     */
    @PutMapping(
            path = "/user",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> updateUserRole(
            @RequestParam("farmId") Long farmId,
            @RequestParam("userId") Long userId,
            @RequestParam("userRole") FarmUser.UserRole userRole
    ) {
        try {
            farmService.updateUserRole(
                    farmService.get(farmId),
                    userService.get(userId),
                    userRole
            );
            return ResponseEntity.ok().build();
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code DELETE /api/v1/farm} : Deletes a farm
     * @param farmId : the farm's id
     * @return status {@code 200 (OK)} if the farm was deleted
     */
    @DeleteMapping(
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> deleteFarm(@RequestParam("farmId") Long farmId) {
        try {
            farmService.deleteFarm(farmService.get(farmId));
            return ResponseEntity.ok().build();
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }

    /**
     * {@code DELETE /api/v1/farm/user} : Deletes a farm user
     * @param farmId : the farm's id
     * @param userId : the user's id
     * @return status {@code 200 (OK)} if the user was deleted
     */
    @DeleteMapping(
            path = "/user",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> deleteFarmUser(
            @RequestParam("farmId") Long farmId,
            @RequestParam("userId") Long userId
    ) {
        try {
            farmService.removeUser(
                    farmService.get(farmId),
                    userService.get(userId)
            );
            return ResponseEntity.ok().build();
        } catch (ResponseException e) {
            return e.toResponseEntity();
        }
    }
}
