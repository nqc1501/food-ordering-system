package com.example.userservice.service.admin;

import com.example.userservice.dto.UserDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AdminService {

    UserDto addUser(UserDto userDto);

    List<UserDto> getAllUsers();

    void deleteUser(UserDto userDto);

    UserDto updateUser(UserDto userDto);

    UserDto getUserByEmail(String email);
}
