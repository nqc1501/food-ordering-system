package com.example.userservice.service;

import com.example.userservice.model.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    User createUser(User user);
}
