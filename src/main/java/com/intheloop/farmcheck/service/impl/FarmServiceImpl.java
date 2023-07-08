package com.intheloop.farmcheck.service.impl;

import com.intheloop.farmcheck.domain.Farm;
import com.intheloop.farmcheck.domain.FarmUser;
import com.intheloop.farmcheck.domain.User;
import com.intheloop.farmcheck.repository.FarmRepository;
import com.intheloop.farmcheck.repository.FarmUserRepository;
import com.intheloop.farmcheck.security.AuthenticationUtils;
import com.intheloop.farmcheck.service.FarmService;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class FarmServiceImpl implements FarmService {
    private static final IllegalAccessException UNAUTHORIZED =
            new IllegalAccessException("You are not authorized to this farm.");
    private static final IllegalArgumentException NOT_IN_FARM =
            new IllegalArgumentException("User is not in the farm.");
    private final FarmRepository farmRepository;
    private final FarmUserRepository farmUserRepository;
    private final AuthenticationUtils authenticationUtils;

    public FarmServiceImpl(
            FarmRepository farmRepository,
            FarmUserRepository farmUserRepository,
            AuthenticationUtils authenticationUtils
    ) {
        this.farmRepository = farmRepository;
        this.farmUserRepository = farmUserRepository;
        this.authenticationUtils = authenticationUtils;
    }

    @Override
    public void create(String name, String description) throws IllegalAccessException {
        if (name == null || description == null || name.length() == 0)
            throw new IllegalArgumentException("Invalid data.");
        if (farmRepository.findByName(name).isPresent())
            throw new IllegalArgumentException("Name is already used.");
        Farm farm = new Farm();
        farm.setName(name);
        farm.setDescription(description);
        farm = farmRepository.save(farm);
        var owner = authenticationUtils.getAuthentication();
        FarmUser farmUser = new FarmUser();
        farmUser.setUser(owner);
        farmUser.setFarm(farm);
        farmUser.setUserRole(FarmUser.UserRole.OWNER);
        farmUserRepository.save(farmUser);
    }

    @Override
    public void addUser(Farm farm, User worker) throws IllegalAccessException {
        if (farm
                .getUsers()
                .stream()
                .anyMatch(farmUser -> Objects.equals(farmUser.getUser().getId(), worker.getId()))
        )
            throw new IllegalArgumentException("User is already in the farm.");
        var currentFarmUser = farmUserRepository.findByFarmAndUser(
                farm, authenticationUtils.getAuthentication()
        );
        if (
                currentFarmUser.isEmpty() ||
                currentFarmUser.get().getUserRole() == FarmUser.UserRole.WORKER
        )
            throw UNAUTHORIZED;

        FarmUser farmUser = new FarmUser();
        farmUser.setUser(worker);
        farmUser.setFarm(farm);
        farmUserRepository.save(farmUser);
    }

    @Override
    public Farm get(Long id) throws IllegalAccessException {
        var farm = farmRepository.findById(id);
        if (farm.isEmpty())
            throw new IllegalArgumentException("Farm doesn't exist.");
        var currentFarmUser = farmUserRepository.findByFarmAndUser(
                farm.get(), authenticationUtils.getAuthentication()
        );
        if (currentFarmUser.isEmpty())
            throw UNAUTHORIZED;
        return farm.get();
    }

    @Override
    public void update(Farm farm, String name, String description) throws IllegalAccessException {
        if (name == null || description == null || name.length() == 0)
            throw new IllegalArgumentException("Invalid data.");
        if (farmRepository.findByName(name).isPresent())
            throw new IllegalArgumentException("Name is already used.");
        var currentFarmUser = farmUserRepository.findByFarmAndUser(
                farm, authenticationUtils.getAuthentication()
        );
        if (
                currentFarmUser.isEmpty() ||
                currentFarmUser.get().getUserRole() == FarmUser.UserRole.WORKER
        )
            throw UNAUTHORIZED;
        farm.setName(name);
        farm.setDescription(description);
        farmRepository.save(farm);
    }

    @Override
    public void updateUserRole(Farm farm, User user, FarmUser.UserRole role) throws IllegalAccessException {
        var authFarmUser = farmUserRepository.findByFarmAndUser(
                farm, authenticationUtils.getAuthentication()
        );
        if (
                authFarmUser.isEmpty() ||
                authFarmUser.get().getUserRole() == FarmUser.UserRole.WORKER ||
                role == FarmUser.UserRole.OWNER &&
                authFarmUser.get().getUserRole() != FarmUser.UserRole.OWNER
        )
            throw UNAUTHORIZED;
        if (role == FarmUser.UserRole.OWNER) {
            authFarmUser.get().setUserRole(FarmUser.UserRole.ADMIN);
            farmUserRepository.save(authFarmUser.get());
        }
        var farmUser = farmUserRepository.findByFarmAndUser(farm, user);
        if (farmUser.isEmpty())
            throw NOT_IN_FARM;
        farmUser.get().setUserRole(role);
        farmUserRepository.save(farmUser.get());
    }

    @Override
    public void removeUser(Farm farm, User user) throws IllegalAccessException {
        var authFarmUser = farmUserRepository.findByFarmAndUser(
                farm, authenticationUtils.getAuthentication()
        );
        if (authFarmUser.isEmpty())
            throw UNAUTHORIZED;
        var farmUser = farmUserRepository.findByFarmAndUser(farm, user);
        if (farmUser.isEmpty())
            throw NOT_IN_FARM;
        if (Objects.equals(authFarmUser.get().getId(), user.getId())) {
            farmUserRepository.delete(farmUser.get());
        }
        if (
                farmUser.get().getUserRole() == FarmUser.UserRole.OWNER ||
                authFarmUser.get().getUserRole() == FarmUser.UserRole.WORKER
        )
            throw UNAUTHORIZED;
        farmUserRepository.delete(farmUser.get());
    }

    @Override
    public void deleteFarm(Farm farm) throws IllegalAccessException {
        var authFarmUser = farmUserRepository.findByFarmAndUser(
                farm, authenticationUtils.getAuthentication()
        );
        if (
                authFarmUser.isEmpty() ||
                authFarmUser.get().getUserRole() != FarmUser.UserRole.OWNER
        )
            throw UNAUTHORIZED;
        farmRepository.delete(farm);
    }
}
