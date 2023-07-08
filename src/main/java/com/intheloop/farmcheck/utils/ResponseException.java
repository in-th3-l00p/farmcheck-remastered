package com.intheloop.farmcheck.utils;

public class ResponseException {
    private String name;
    private String description;

    public ResponseException(Exception e) {
        this.name = e.toString();
        this.description = e.getMessage();
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

    @Override
    public String toString() {
        return "ResponseException{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
