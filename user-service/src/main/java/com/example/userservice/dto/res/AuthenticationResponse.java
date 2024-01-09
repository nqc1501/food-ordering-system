package com.example.userservice.dto.res;

import com.example.userservice.enums.UserRole;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    private Long userId;
    private UserRole userRole;
    private String jwtToken;
}
