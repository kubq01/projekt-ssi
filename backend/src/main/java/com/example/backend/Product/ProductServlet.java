package com.example.backend.Product;
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

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String action = request.getParameter("action");

        if ("getProductById".equals(action)) {
            Long productId = Long.parseLong(request.getParameter("id"));
            ProductDTO product = productDAO.getProductById(productId);
            response.getWriter().write(productToJson(product));
        } else {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
    }
    private String productToJson(ProductDTO product) {
        return gson.toJson(product);
    }
}

