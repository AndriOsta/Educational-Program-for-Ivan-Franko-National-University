package com.curriculum.web.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.curriculum.dto.exception.ExceptionDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component("authenticationEntryPoint")
public class AuthenticationEntryPoint implements org.springframework.security.web.AuthenticationEntryPoint {
    private final Logger LOGGER = LoggerFactory.getLogger(AuthenticationEntryPoint.class);

    @Autowired
    private ObjectMapper jacksonObjectMapper;

    /**
     * Always returns a 401 error code to the client.
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException ae) throws IOException, ServletException {
        LOGGER.error("Pre-authenticated entry point called. Rejecting access to path={}", request.getRequestURI());
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        ExceptionDTO exceptionDTO = new ExceptionDTO(ae.getMessage() , HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write(jacksonObjectMapper.writeValueAsString(exceptionDTO));
    }

}