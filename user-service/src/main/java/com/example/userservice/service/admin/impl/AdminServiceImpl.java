package com.example.userservice.service.admin.impl;

import com.example.userservice.dto.UserDto;
import com.example.userservice.enums.UserRole;
import com.example.userservice.model.User;
import com.example.userservice.repository.UserRepository;
import com.example.userservice.service.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDto addUser(UserDto userDto) {
        Optional<User> optionalUser = userRepository.findByEmail(userDto.getEmail());
        if (optionalUser.isEmpty()) {
            var user = User.builder()
                    .name(userDto.getName())
                    .tel(userDto.getTel())
                    .address(userDto.getAddress())
                    .email(userDto.getEmail())
                    .password(passwordEncoder.encode(userDto.getPassword()))
                    .userRole(UserRole.USER)
                    .build();
            userRepository.save(user);
            return mapToUserDto(user);
        }
        return null;
    }

    @Override
    public UserDto getUserByEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        return userOptional.map(this::mapToUserDto).orElse(null);
    }

    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAllByUserRole(UserRole.USER)
                .stream()
                .map(this::mapToUserDto)
                .toList();
    }

    @Override
    public void deleteUser(UserDto userDto) {
        var user = userRepository.findByEmail(userDto.getEmail()).orElseThrow();
        userRepository.delete(user);
    }

    @Override
    public UserDto updateUser(UserDto userDto) {
        User user = userRepository.findByEmail(userDto.getEmail()).orElseThrow();
        user.setName(userDto.getName());
        user.setTel(userDto.getTel());
        user.setAddress(userDto.getAddress());
        if (!user.getPassword().equals(userDto.getPassword())) {
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        }
        return mapToUserDto((userRepository.save(user)));
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
