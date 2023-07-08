package com.intheloop.farmcheck.web.rest;

import com.intheloop.farmcheck.domain.FarmUser;
import com.intheloop.farmcheck.service.FarmService;
import com.intheloop.farmcheck.service.UserService;
import com.intheloop.farmcheck.utils.ResponseException;
import com.intheloop.farmcheck.web.rest.dto.FarmDTO;
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
     * @return a {@link FarmDTO} with status {@code 200 (OK)}, or {@code 400 (BAD REQUEST)} if an error occurred
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
     * {@code POST /api/v1/farm} : Creates a farm
     * @param farmDTO : the farm's details
     * @return status {@code 200 (OK)} if the farm was created successfully, or {@code 400 (BAD REQUEST)} if an error occurred
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
     * @return status {@code 200 (OK)} if the user was added, or {@code 400 (BAD REQUEST)} if an error occurred
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
     * @return status {@code 200 (OK)} if the details were updated, or {@code 400 (BAD REQUEST)} if an error occurred
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
     * @return status {@code 200 (OK)} if the user's role was updated, or {@code 400 (BAD_REQUEST)} if the operation failed
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
     * @return status {@code 200 (OK)} if the farm was deleted, or status {@code 400 (BAD REQUEST)} if the operation failed
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
     * @return status {@code 200 (OK)} if the user was deleted, or status {@code 400 (BAD REQUEST)} if the operation failed
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
