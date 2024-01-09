package com.example.userservice.service.user.impl;

import com.example.userservice.dto.UserDto;
import com.example.userservice.dto.req.DeliveryRequest;
import com.example.userservice.dto.req.PasswordRequest;
import com.example.userservice.dto.req.RegisterRequest;
import com.example.userservice.enums.UserRole;
import com.example.userservice.model.User;
import com.example.userservice.repository.UserRepository;
import com.example.userservice.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDto findUserById(Long id) {
        return mapToUserDto(userRepository.findById(id).orElseThrow());
    }

    @Override
    public void updateUser(UserDto userDto) {
        User user = userRepository.findByEmail(userDto.getEmail()).orElseThrow();
        user.setName(userDto.getName());
        user.setTel(userDto.getTel());
        user.setAddress(userDto.getAddress());
        if (!user.getPassword().equals(userDto.getPassword())) {
            user.setPassword(userDto.getPassword());
        }
        userRepository.save(user);
    }

    @Override
    public UserDto findUserByEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        return userOptional.map(this::mapToUserDto).orElse(null);
    }

    @Override
    public void registerUser(RegisterRequest request) {
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .userRole(UserRole.USER)
                .build();
        userRepository.save(user);
    }

    @Override
    public void updateDelivery(DeliveryRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        user.setName(request.getName());
        user.setTel(request.getTel());
        user.setAddress(request.getAddress());
        userRepository.save(user);
    }

    @Override
    public void updatePassword(PasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
    }


    private UserDto mapToUserDto(User user) {
        return UserDto.builder()
                .name(user.getName())
                .tel(user.getTel())
                .address(user.getAddress())
                .email(user.getEmail())
                .password(user.getPassword())
                .build();
    }
}
