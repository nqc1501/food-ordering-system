package com.example.invetoryservice.service.impl;

import com.example.invetoryservice.repository.InventoryRepository;
import com.example.invetoryservice.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository inventoryRepository;

    @Override
    public Boolean isInStock(Long id) {
        return inventoryRepository.findById(id).isPresent();
    }
}
