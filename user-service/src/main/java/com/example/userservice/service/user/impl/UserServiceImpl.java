package com.example.userservice.service.user.impl;

import com.example.userservice.dto.UserDto;
import com.example.userservice.model.User;
import com.example.userservice.repository.UserRepository;
import com.example.userservice.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

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
