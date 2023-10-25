package com.example.backend.Favourite;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/favourite")
public class FavouriteServlet extends HttpServlet {
    private FavouriteDAO favouriteDAO;

    @Override
    public void init() throws ServletException {
        favouriteDAO = new FavouriteDAOimpl();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");

        if ("get".equals(action)) {
            Long id = Long.parseLong(request.getParameter("id"));
            FavouriteDTO favourite = favouriteDAO.getFavouriteById(id);
            request.setAttribute("favourite", favourite);
            request.getRequestDispatcher("/favourite.jsp").forward(request, response);
        } else if ("create".equals(action)) {
            Long userId = Long.parseLong(request.getParameter("userId"));
            Long productId = Long.parseLong(request.getParameter("productId"));
            FavouriteDTO newFavourite = new FavouriteDTO(userId, productId);

            favouriteDAO.createFavourite(newFavourite);
            response.sendRedirect(request.getContextPath() + "/favourite?action=get&id=" + newFavourite.getId());
        } else if ("update".equals(action)) {
            Long id = Long.parseLong(request.getParameter("id"));
            Long userId = Long.parseLong(request.getParameter("userId"));
            Long productId = Long.parseLong(request.getParameter("productId"));
            FavouriteDTO updatedFavourite = new FavouriteDTO(id, userId, productId);

            favouriteDAO.updateFavourite(updatedFavourite);
            response.sendRedirect(request.getContextPath() + "/favourite?action=get&id=" + id);
        } else if ("delete".equals(action)) {
            Long id = Long.parseLong(request.getParameter("id"));

            favouriteDAO.deleteFavourite(id);
            response.sendRedirect(request.getContextPath() + "/favourite?action=list"); // Redirect to a list page or another appropriate location.
        } else {
            // Handle other actions or provide an error message.
        }
    }
}