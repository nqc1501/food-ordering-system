package com.example.userservice.controller;

import com.example.userservice.dto.req.AuthenticationRequest;
import com.example.userservice.dto.req.RegisterRequest;
import com.example.userservice.dto.res.AuthenticationResponse;
import com.example.userservice.service.auth.AuthenticationService;
import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<String> createAuthenticationToken(
            @RequestBody AuthenticationRequest request) {
        AuthenticationResponse authResponse = authenticationService.authenticate(request);

        Map<String, Object> jsonData = new HashMap<>();
        jsonData.put("userID", authResponse.getUserId());
        jsonData.put("role", authResponse.getUserRole());

        Gson gson = new Gson();
        String jsonString = gson.toJson(jsonData);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Expose-Headers", "Authorization");
        headers.add("Access-Control-Allow-Headers",
                "Authorization, X-Pingother, Origin,X-Requested-With, Content-Type, Accept, X-Custom-header");
        headers.add("Authorization", "Bearer " + authResponse.getJwtToken());

        return ResponseEntity.ok().headers(headers).body(jsonString);
    }
}
