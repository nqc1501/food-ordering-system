package com.example.userservice.controller;

import com.example.userservice.dto.UserDto;
import com.example.userservice.service.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/post-user")
    public ResponseEntity<?> addUser(@RequestBody UserDto userDto) {
        UserDto dbResponse = adminService.addUser(userDto);
        if (dbResponse == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is used!");
        }
        return ResponseEntity.ok(dbResponse);
    }

    @GetMapping("/get-users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @PutMapping("/update-user")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto) {
        return ResponseEntity.ok(adminService.updateUser(userDto));
    }

    @DeleteMapping("/delete-user/{email}")
    public ResponseEntity<?> deleteUser(@PathVariable String email) {
        UserDto dbResponse = adminService.getUserByEmail(email);
        if (dbResponse == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't find this user. Please press F5.");
        }
        adminService.deleteUser(dbResponse);
        return ResponseEntity.ok("");
    }
}
