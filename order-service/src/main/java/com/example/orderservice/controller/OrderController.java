package com.example.orderservice.controller;

import com.example.orderservice.dto.req.OrderRequest;
import com.example.orderservice.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/post-order")
    public ResponseEntity<String> createOrder(@RequestBody OrderRequest orderRequest) {
        orderService.createOrder(orderRequest);
        return ResponseEntity.ok("");
    }

    @GetMapping("/get-orders")
    public ResponseEntity<?> getAllOrder() {
        return ResponseEntity.ok(orderService.getAllOrder());
    }

}
