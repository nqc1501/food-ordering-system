package com.example.invetoryservice.controller;

import com.example.invetoryservice.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping("/id={}")
    public ResponseEntity<Boolean> isInStock(@PathVariable Long id) {
        return ResponseEntity.ok(inventoryService.isInStock(id));
    }
}
