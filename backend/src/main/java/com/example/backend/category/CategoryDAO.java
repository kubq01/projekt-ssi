package org.example.category;


public interface CategoryDAO {
    CategoryDTO getCategoryById(Long id);
    void createCategory(CategoryDTO category);
    void updateCategory(CategoryDTO category);
    void deleteCategory(Long id);
}
