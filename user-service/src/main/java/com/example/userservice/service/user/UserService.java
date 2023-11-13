package com.example.userservice.service.user;

import com.example.userservice.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    User createUser(User user);

    List<User> findAllUser();

    boolean userExists(String email);

    User findUserById(Long id);
}
