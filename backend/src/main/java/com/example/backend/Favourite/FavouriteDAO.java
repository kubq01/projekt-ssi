package com.example.backend.Favourite;

public interface FavouriteDAO {
    FavouriteDTO getFavouriteById(Long id);
    void createFavourite(FavouriteDTO favourite);
    void updateFavourite(FavouriteDTO favourite);
    void deleteFavourite(Long id);
}
