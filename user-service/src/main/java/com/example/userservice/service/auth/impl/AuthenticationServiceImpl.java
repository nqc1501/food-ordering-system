package com.example.userservice.service.auth.impl;

import com.example.userservice.dto.req.AuthenticationRequest;
import com.example.userservice.dto.req.RegisterRequest;
import com.example.userservice.dto.res.AuthenticationResponse;
import com.example.userservice.enums.UserRole;
import com.example.userservice.model.User;
import com.example.userservice.repository.UserRepository;
import com.example.userservice.service.auth.AuthenticationService;
import com.example.userservice.utils.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";

    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .userRole(UserRole.ADMIN)
                .build();
        userRepository.save(user);
        String jwtToken = jwtUtil.generateToken(user);
        return AuthenticationResponse.builder()
                .jwtToken(jwtToken)
                .build();
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        String jwtToken = jwtUtil.generateToken(user);

//        response.getWriter().write(new JSONObject()
//                .put("userId", user.getId())
//                .put("role", user.getUserRole())
//                .toString());
//
//        response.setHeader("Access-Control-Expose-Headers", "Authorization");
//        response.setHeadr("Access-Control-Allow-Headers",
//                "Authorization, X-Pingother, Origin,X-Requested-With, Content-Type, Accept, X-Custom-header");
//        response.setHeader("Authorization", "Bearer " + jwtToken);

        return AuthenticationResponse.builder()
                .userId(user.getId())
                .userRole(user.getUserRole())
                .jwtToken(jwtToken)
                .build();
    }
}
