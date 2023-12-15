package com.example.orderservice.service;

import com.example.orderservice.dto.OrderDto;
import com.example.orderservice.dto.req.OrderRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {

    void createOrder(OrderRequest orderRequest);

    List<OrderDto> getAllOrder();
}
