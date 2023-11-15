package com.example.backend.category;

import com.example.backend.auth.AuthService;
import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet(name = "category", value = "/category")
public class CategoryServlet extends HttpServlet {

    private CategoryDAOimpl categoryDAO = new CategoryDAOimpl();
    private Gson gson = new Gson();

    private AuthService service = new AuthService();

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        if(service.getUserFromToken(request.getHeader("Authentication")) == null)
            throw new RuntimeException("FORBIDDEN");
        String action = request.getParameter("action");

        if ("getCategoryById".equals(action)) {
            Long categoryId = Long.parseLong(request.getParameter("id"));
            CategoryDTO category = categoryDAO.getCategoryById(categoryId);
            response.getWriter().write(categoryToJson(category));
        } else {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (service.getUserFromToken(request.getHeader("Authentication")) == null)
            throw new RuntimeException("FORBIDDEN");

        String action = request.getParameter("action");

        if ("createCategory".equals(action)) {
            // Assuming you have the necessary parameters in the request
            Long categoryId = Long.parseLong(request.getParameter("id"));
            String categoryName = request.getParameter("name");

            CategoryDTO newCategory = new CategoryDTO(categoryId, categoryName);
            categoryDAO.createCategory(newCategory);
            response.getWriter().write("Category created successfully!");
        } else if ("updateCategory".equals(action)) {
            // Assuming you have the necessary parameters in the request
            Long categoryId = Long.parseLong(request.getParameter("id"));
            String categoryName = request.getParameter("name");

            CategoryDTO updatedCategory = new CategoryDTO(categoryId, categoryName);
            categoryDAO.updateCategory(updatedCategory);
            response.getWriter().write("Category updated successfully!");
        } else if ("deleteCategory".equals(action)) {
            Long categoryId = Long.parseLong(request.getParameter("id"));
            categoryDAO.deleteCategory(categoryId);
            response.getWriter().write("Category deleted successfully!");
        } else {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
    }

    private String categoryToJson(CategoryDTO category) {
        return gson.toJson(category);
    }
}
