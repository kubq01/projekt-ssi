package com.example.backend.Favourite;

import com.example.backend.auth.AuthService;
import com.example.backend.auth.TokenGenerator;
import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/favourite")
public class FavouriteServlet extends HttpServlet {
    private FavouriteDAO favouriteDAO;
    private final AuthService service = new AuthService();

    @Override
    public void init() throws ServletException {
        favouriteDAO = new FavouriteDAOimpl();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(service.getUserFromToken(request.getHeader("Authentication")) == null)
            throw new RuntimeException("FORBIDDEN");

        String action = request.getParameter("action");

        if ("get".equals(action)) {
            Long id = Long.parseLong(request.getParameter("id"));
            FavouriteDTO favourite = favouriteDAO.getFavouriteById(id);
            request.setAttribute("favourite", favourite);
            request.getRequestDispatcher("/favourite.jsp").forward(request, response);

            Gson gson = new Gson();
            String json = gson.toJson(favourite);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
        } else if ("create".equals(action)) {
            Long userId = Long.parseLong(request.getParameter("userId"));
            Long productId = Long.parseLong(request.getParameter("productId"));
            FavouriteDTO newFavourite = new FavouriteDTO(userId, productId);

            favouriteDAO.createFavourite(newFavourite);
            response.sendRedirect(request.getContextPath() + "/favourite?action=get&id=" + newFavourite.getId());

            Gson gson = new Gson();
            String json = gson.toJson(newFavourite);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
        } else if ("update".equals(action)) {
            Long id = Long.parseLong(request.getParameter("id"));
            Long userId = Long.parseLong(request.getParameter("userId"));
            Long productId = Long.parseLong(request.getParameter("productId"));
            FavouriteDTO updatedFavourite = new FavouriteDTO(id, userId, productId);

            favouriteDAO.updateFavourite(updatedFavourite);
            response.sendRedirect(request.getContextPath() + "/favourite?action=get&id=" + id);

            Gson gson = new Gson();
            String json = gson.toJson(updatedFavourite);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
        } else if ("delete".equals(action)) {
            Long id = Long.parseLong(request.getParameter("id"));

            favouriteDAO.deleteFavourite(id);
            response.sendRedirect(request.getContextPath() + "/favourite?action=list"); // Redirect to a list page or another appropriate location.

            Gson gson = new Gson();
            String message = "Favorite deleted successfully.";
            String json = gson.toJson(message);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
        } else {
            // Handle other actions or provide an error message.
        }
    }
}