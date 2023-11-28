package com.example.orderservice.service;

import com.example.orderservice.dto.req.OrderRequest;
import com.example.orderservice.model.Order;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {
    void createOrder(OrderRequest orderRequest);

    List<OrderRequest> getAllOrder();
}
