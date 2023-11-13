package com.example.userservice.service.auth;

import com.example.userservice.dto.req.AuthenticationRequest;
import com.example.userservice.dto.req.RegisterRequest;
import com.example.userservice.dto.res.AuthenticationResponse;
import org.springframework.stereotype.Service;

@Service
public interface AuthenticationService {

    public AuthenticationResponse register(RegisterRequest request);

    public AuthenticationResponse authenticate(AuthenticationRequest request);
}
