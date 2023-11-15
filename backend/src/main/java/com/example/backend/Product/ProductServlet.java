package com.example.backend.Product;
import com.example.backend.auth.AuthService;
import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "product", value = "/product")
public class ProductServlet extends HttpServlet {

    private ProductDAOimpl productDAO = new ProductDAOimpl();
    private Gson gson = new Gson();
    private AuthService service = new AuthService();

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        if(service.getUserFromToken(request.getHeader("Authentication")) == null)
            throw new RuntimeException("FORBIDDEN");

        String action = request.getParameter("action");

        if ("getProductById".equals(action)) {
            Long productId = Long.parseLong(request.getParameter("id"));
            ProductDTO product = productDAO.getProductById(productId);
            response.getWriter().write(productToJson(product));
        } else {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (service.getUserFromToken(request.getHeader("Authentication")) == null)
            throw new RuntimeException("FORBIDDEN");

        String action = request.getParameter("action");

        if ("createProduct".equals(action)) {
            // Assuming you have the necessary parameters in the request
            ProductDTO newProduct = extractProductFromRequest(request);
            productDAO.createProduct(newProduct);
            response.getWriter().write("Product created successfully!");
        } else if ("updateProduct".equals(action)) {
            // Assuming you have the necessary parameters in the request
            ProductDTO updatedProduct = extractProductFromRequest(request);
            productDAO.updateProduct(updatedProduct);
            response.getWriter().write("Product updated successfully!");
        } else if ("deleteProduct".equals(action)) {
            Long productId = Long.parseLong(request.getParameter("id"));
            productDAO.deleteProduct(productId);
            response.getWriter().write("Product deleted successfully!");
        } else {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
    }

    private ProductDTO extractProductFromRequest(HttpServletRequest request) {
        // Extract product data from the request parameters
        Long categoryId = Long.parseLong(request.getParameter("categoryId"));
        String productName = request.getParameter("name");
        double price = Double.parseDouble(request.getParameter("price"));
        double rating = Double.parseDouble(request.getParameter("rating"));

        // Use the builder to create a new ProductDTO object
        return ProductDTO.builder()
                .categoryId(categoryId)
                .name(productName)
                .price(price)
                .rating(rating)
                .build();
    }

    private String productToJson(ProductDTO product) {
        return gson.toJson(product);
    }
}

