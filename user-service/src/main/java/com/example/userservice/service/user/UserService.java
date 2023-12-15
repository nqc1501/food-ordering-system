package com.example.userservice.service.user;

import com.example.userservice.dto.UserDto;
import com.example.userservice.dto.req.DeliveryRequest;
import com.example.userservice.dto.req.PasswordRequest;
import com.example.userservice.dto.req.RegisterRequest;
import com.example.userservice.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    UserDto findUserById(Long id);

    void updateUser(UserDto userDto);

    UserDto findUserByEmail(String email);

    void registerUser(RegisterRequest request);

    void updateDelivery(DeliveryRequest request);

    void updatePassword(PasswordRequest request);
}
