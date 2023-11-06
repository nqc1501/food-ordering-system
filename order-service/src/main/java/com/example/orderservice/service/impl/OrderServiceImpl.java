package com.example.orderservice.service.impl;

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
        orderRepository.save(order);
    }

    private OrderItem mapToOrderItem(OrderItemDto orderItemDto) {
        return OrderItem.builder()
                .name(orderItemDto.getName())
                .price(orderItemDto.getPrice())
                .quantity(orderItemDto.getQuantity())
                .build();
    }

    @Override
    public List<OrderRequest> getAllOrder() {
        List<Order> orderList = orderRepository.findAll();
        return orderList.stream().map(this::mapToOrderRequest).toList();
    }

    private OrderRequest mapToOrderRequest(Order order) {
        List<OrderItemDto> orderItemDtoList = order.getOrderItemList()
                .stream()
                .map(this::mapToOrderItemDto)
                .toList();
        
        return OrderRequest.builder()
                .orderNumber(order.getOrderNumber())
                .orderItemDtoList(orderItemDtoList)
                .build();
    }

    private OrderItemDto mapToOrderItemDto(OrderItem orderItem) {
        return OrderItemDto.builder()
                .name(orderItem.getName())
                .price(orderItem.getPrice())
                .quantity(orderItem.getQuantity())
                .build();
    }

}
