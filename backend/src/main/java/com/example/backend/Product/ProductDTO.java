package com.example.backend.Product;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class  ProductDTO {
    private Long id;
    private Long categoryId;
    private String name;
    private double price;
    private double rating;
}
