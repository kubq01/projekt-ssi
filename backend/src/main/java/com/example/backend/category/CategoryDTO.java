package com.example.backend.category;

import lombok.Data;

@Data
public class CategoryDTO {
    private final Long id;
    private final String name;

    /*
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

     */
}
