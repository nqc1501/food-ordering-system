package com.example.userservice.controller;

import com.example.userservice.dto.UserDto;
import com.example.userservice.dto.req.DeliveryRequest;
import com.example.userservice.dto.req.PasswordRequest;
import com.example.userservice.dto.req.RegisterRequest;
import com.example.userservice.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public  ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        if (userService.findUserByEmail(request.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists.");
        }
        userService.registerUser(request);
        return ResponseEntity.ok("");
    }

    @GetMapping("/get-user-info/{id}")
    public ResponseEntity<?> findUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findUserById(id));
    }

    @PutMapping("/update-user-info")
    public ResponseEntity<?> updateUser(@RequestBody UserDto userDto) {
        userService.updateUser(userDto);
        return ResponseEntity.ok("");
    }

    @PutMapping("/update-delivery")
    public ResponseEntity<?> updateDelivery(@RequestBody DeliveryRequest request) {
        userService.updateDelivery(request);
        return ResponseEntity.ok("");
    }

    @PutMapping("/update-password")
    public ResponseEntity<?> updatePassword(@RequestBody PasswordRequest request) {
        userService.updatePassword(request);
        return ResponseEntity.ok("");
    }

}
