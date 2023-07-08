package com.intheloop.farmcheck.web.rest.dto;

import com.intheloop.farmcheck.domain.Farm;
import lombok.*;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class FarmDTO {
    private Long id;
    private String name;
    private String description;
    private LocalDate createdAt;

    public FarmDTO(Farm farm) {
        this.id = farm.getId();
        this.name = farm.getName();
        this.description = farm.getDescription();
        this.createdAt = farm.getCreatedAt();
    }
}
