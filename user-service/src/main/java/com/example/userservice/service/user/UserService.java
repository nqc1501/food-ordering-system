package com.example.userservice.service.user;

import com.example.userservice.dto.UserDto;
import com.example.userservice.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    UserDto findUserById(Long id);

    void updateUser(UserDto userDto);
}
