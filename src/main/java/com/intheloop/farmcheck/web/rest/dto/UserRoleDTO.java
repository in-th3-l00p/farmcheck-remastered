package com.intheloop.farmcheck.web.rest.dto;

import com.intheloop.farmcheck.domain.FarmUser;
import com.intheloop.farmcheck.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRoleDTO extends UserDTO {
    private FarmUser.UserRole role;

    public UserRoleDTO(User user, FarmUser.UserRole role) {
        super(user);
        this.role = role;
    }
}
