package com.example.backend.Favourite;

import lombok.Data;
import lombok.Getter;

@Data
public class FavouriteDTO {
    @Getter
    private Long id;
    private Long userId;
    private Long productId;

    public FavouriteDTO(Long id, Long userId, Long productId) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
    }
}
