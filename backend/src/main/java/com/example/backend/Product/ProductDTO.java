package org.example.Product;

import lombok.Data;

@Data
public class ProductDTO {
    private Long id;
    private Long categoryId;
    private String name;
    private double price;
    private double rating;
}
