package com.intheloop.farmcheck.domain;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "sensors")
public class Sensor {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @ManyToOne
    private Farm farm;

    public Sensor() {
    }

    public Sensor(String name, String description, Farm farm) {
        this.name = name;
        this.description = description;
        this.farm = farm;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Farm getFarm() {
        return farm;
    }

    public void setFarm(Farm farm) {
        this.farm = farm;
    }
}
