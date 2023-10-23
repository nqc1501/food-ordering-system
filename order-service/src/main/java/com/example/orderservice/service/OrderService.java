package com.example.orderservice.service;

import com.example.orderservice.model.Order;
import org.springframework.stereotype.Service;

@Service
public interface OrderService {
    Order createOrder(Order order);
}
