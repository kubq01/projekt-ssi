package com.example.backend.User;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import com.example.backend.auth.AuthService;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.codehaus.jackson.map.ObjectMapper;

@WebServlet("/getNotAdmins")
public class UserNotAdminServlet extends HttpServlet {

    private UserDAOimpl userDAO = new UserDAOimpl();
    private AuthService service = new AuthService();

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (service.getUserFromToken(request.getHeader("Authentication")) == null)
            throw new RuntimeException("FORBIDDEN");

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        try {
            // Assuming your UserService has the getAllNotAdmins method
            List<UserDTO> notAdmins = userDAO.getAllNotAdmins();

            // Convert the list to JSON and send it as a response
            String jsonResponse = convertListToJson(notAdmins);
            out.println(jsonResponse);
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.println("{\"error\": \"Internal Server Error\"}");
            e.printStackTrace();
        }
    }

    private String convertListToJson(List<UserDTO> userList) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(userList);
    }
}
