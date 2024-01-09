package com.example.invetoryservice.service;

import org.springframework.stereotype.Service;

@Service
public interface InventoryService {
    Boolean isInStock(Long id);
}
