package com.example.orderservice.service.impl;

import com.example.orderservice.dto.OrderDto;
import com.example.orderservice.dto.OrderItemDto;
import com.example.orderservice.dto.req.OrderRequest;
import com.example.orderservice.model.Order;
import com.example.orderservice.model.OrderItem;
import com.example.orderservice.repository.OrderRepository;
import com.example.orderservice.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    @Override
    public void createOrder(OrderRequest orderRequest) {
        Order order = new Order();
        order.setOrderNumber(UUID.randomUUID().toString());

        List<OrderItem> orderItemList = orderRequest.getOrderItemDtoList()
                .stream()
                .map(this::mapToOrderItem)
                .toList();
        order.setOrderItemList(orderItemList);
        order.setUserId(orderRequest.getUserId());
        orderRepository.save(order);
    }

    @Override
    public List<OrderDto> getAllOrder() {
        List<Order> orderList = orderRepository.findAll();
        return orderList.stream().map(this::mapToOrderDto).toList();
    }

    private OrderItem mapToOrderItem(OrderItemDto orderItemDto) {
        return OrderItem.builder()
                .productCode(orderItemDto.getProductCode())
                .price(orderItemDto.getPrice())
                .quantity(orderItemDto.getQuantity())
                .build();
    }

    private OrderDto mapToOrderDto(Order order) {
        List<OrderItemDto> orderItemDtoList = order.getOrderItemList()
                .stream()
                .map(this::mapToOrderItemDto)
                .toList();
        
        return OrderDto.builder()
                .orderNumber(order.getOrderNumber())
                .orderItemDtoList(orderItemDtoList)
                .userId(order.getUserId())
                .build();
    }

    private OrderItemDto mapToOrderItemDto(OrderItem orderItem) {
        return OrderItemDto.builder()
                .productCode(orderItem.getProductCode())
                .price(orderItem.getPrice())
                .quantity(orderItem.getQuantity())
                .build();
    }

}
